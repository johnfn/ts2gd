import fs from "fs"
import path from "path"

import chalk from "chalk"
import ts, { ObjectFlags, SyntaxKind, TypeFlags } from "typescript"

import { ParseState } from "./parse_node"
import { ErrorName } from "./project"

export const isNullableNode = (node: ts.Node, typechecker: ts.TypeChecker) => {
  const type = typechecker.getTypeAtLocation(node)

  return (
    type.isUnion() &&
    type.types.find(
      (type) => type.flags & TypeFlags.Null || type.flags & TypeFlags.Undefined
    )
  )
}

export const isNullableType = (type: ts.Type) => {
  return (
    type.isUnion() &&
    type.types.find(
      (type) => type.flags & TypeFlags.Null || type.flags & TypeFlags.Undefined
    )
  )
}

/**
 * Gets the inheritance tree of the provided type. E.g. if Foo extends Bar
 * extends Baz, and we pass in Foo, then this returns [Bar, Baz].
 */
export const getTypeHierarchy = (type: ts.Type): ts.Type[] => {
  if (type.isClass()) {
    const baseTypes = type.getBaseTypes() ?? []

    return [
      ...baseTypes,
      ...baseTypes.flatMap((type) => getTypeHierarchy(type)),
    ]
  }

  return []
}

// I can not for the life of me figure out a clear way to
// ask TS if a type is an object literal type.
export const isDictionary = (type: ts.Type): boolean => {
  if (type.getSymbol()?.name.startsWith("Dictionary")) {
    // Note: startsWith necessary because it could be
    // * Dictionary
    // * Dictionary<K, V>
    return true
  }

  if (type.flags & TypeFlags.Object) {
    const objectType = type as ts.ObjectType

    for (const decl of type.symbol?.declarations ?? []) {
      if (decl.kind === SyntaxKind.ClassDeclaration) {
        return false
      }

      if (decl.kind === SyntaxKind.EnumDeclaration) {
        return false
      }

      if (decl.kind === SyntaxKind.TypeLiteral) {
        // This is probably it!

        continue
      }
    }

    return (objectType.objectFlags & ObjectFlags.Anonymous) !== 0
  }

  return false
}

export const generatePrecedingNewlines = (
  node: ts.Node,
  fullText: string
): string => {
  let numNewlines = 0

  for (const ch of [...fullText]) {
    if (ch.trim() !== "") {
      break
    }

    if (ch === "\n") {
      numNewlines += 1
    }
  }

  let result = ""

  for (let i = 0; i < numNewlines - 1; i++) {
    result += "\n"
  }

  return result
}

export function isArrayType(type: ts.Type) {
  return type.symbol?.name === "Array"
}

export function isEnumType(type: ts.Type) {
  if (type.flags & ts.TypeFlags.Enum) {
    return true
  }

  // it's not an enum type if it's an enum literal type
  if (type.flags & ts.TypeFlags.EnumLiteral && !type.isUnion()) {
    return false
  }

  // get the symbol and check if its value declaration is an enum declaration
  const symbol = type.getSymbol()
  if (symbol == null) {
    return false
  }

  const { valueDeclaration } = symbol
  return (
    valueDeclaration != null &&
    valueDeclaration.kind === ts.SyntaxKind.EnumDeclaration
  )
}

export const syntaxKindToString = (kind: ts.Node["kind"]) => {
  return ts.SyntaxKind[kind]
}

/**
 * Get the Godot type for a node. The more arguments that are passed in, the more precise
 * we can be about this type.
 *
 * Note we need actualType because if we have let x: float, TS will say the
 * type is number (not float!), which isn't very useful.
 *
 * @param node This is the node we're producing a Godot type for. It is only
 * used for error display; it's typecheckerInferredType that we actually process
 * to produce a type for.
 * @param typecheckerInferredType This is the type that getTypeAtLocation returns
 * @param actualType This is the actual type node in the program, if there is one
 *
 * NOTE: Boy, this function is a mess. The logic is straightforward, though.
 */
export function getGodotType(
  node: ts.Node,
  typecheckerInferredType: ts.Type,
  props: ParseState,
  isExport: boolean,
  initializer?: ts.Expression,
  actualType?: ts.TypeNode
): string | null {
  // If we have a precise initializer, use that first

  // If we have an explicitly written type e.g. x: string, use that.
  // Otherwise, use the type that TS inferred.

  let tsTypeName: string | null = null

  if (actualType) {
    tsTypeName = actualType.getText()
  } else {
    tsTypeName = props.program
      .getTypeChecker()
      .typeToString(typecheckerInferredType)
  }

  if (tsTypeName === "number") {
    if (initializer) {
      let preciseInitializerType = getPreciseInitializerType(
        initializer,
        initializer.getText()
      )

      if (preciseInitializerType) {
        return preciseInitializerType
      }
    }

    let errorString = ""
    let nodeText = node.getText()

    if (nodeText.includes("\n")) {
      errorString = `Please annotate

${chalk.yellow(node.getText())} 

with either "int" or "float".`
    } else {
      errorString = `Please annotate ${chalk.yellow(
        node.getText()
      )} with either "int" or "float".`
    }

    props.project.errors.add({
      description: errorString,
      error: ErrorName.InvalidNumber,
      location: node,
      stack: new Error().stack ?? "",
    })

    return "float"
  }

  // TODO: Optionals make this nearly impossible

  if (tsTypeName === "string") {
    return "String"
  }

  if (tsTypeName === "int") {
    return "int"
  }

  if (tsTypeName === "float") {
    return "float"
  }

  if (tsTypeName === "boolean") {
    return "bool"
  }

  if (tsTypeName.startsWith("IterableIterator")) {
    return "Array"
  }

  // This ends the list of all the types we can say safely.

  // TODO: Doing all these cases for parameters and properties is subtle to get
  // right, and doesn't confer a lot of benefit. In some cases (e.g. using
  // user-defined types) it actually causes errors due to cyclic dependencies,
  // and those would be a huge pain to resolve properly.

  if (!isExport) {
    return null
  }

  // For exports, we really want to do a best effort to get *a* typename

  if (!actualType) {
    props.project.errors.add({
      description: `This exported variable needs a type declaration:

${chalk.yellow(node.getText())}          
          `,
      error: ErrorName.ExportedVariableError,
      location: node,
      stack: new Error().stack ?? "",
    })

    return null
  }

  if (isNullableType(typecheckerInferredType)) {
    // Remove the nullable parts of the type and try again

    let nonNullTypes: ts.Type[] = []
    let nonNullTypeNodes: ts.TypeNode[] = []

    if (typecheckerInferredType.isUnion()) {
      nonNullTypes = typecheckerInferredType.types.filter((type) => {
        return !(
          type.flags & TypeFlags.Null || type.flags & TypeFlags.Undefined
        )
      })

      if (actualType.kind === SyntaxKind.UnionType) {
        const unionTypeNode = actualType as ts.UnionTypeNode

        nonNullTypeNodes = unionTypeNode.types.filter((typeNode) => {
          if (typeNode.kind === SyntaxKind.LiteralType) {
            const litType = typeNode as ts.LiteralTypeNode

            return !(
              litType.literal.kind === SyntaxKind.NullKeyword ||
              litType.literal.kind === SyntaxKind.UndefinedKeyword
            )
          }

          // Apparently `undefined` is just a keyword, whereas null is a
          // literal??? I'm confused.
          if (typeNode.kind === SyntaxKind.UndefinedKeyword) {
            return false
          }

          return true
        })
      }

      if (nonNullTypes.length > 1 || nonNullTypeNodes.length > 1) {
        props.project.errors.add({
          description: `You can't export a union type:

${chalk.yellow(node.getText())}          
          `,
          error: ErrorName.ExportedVariableError,
          location: node,
          stack: new Error().stack ?? "",
        })

        return null
      }

      return getGodotType(
        node,
        nonNullTypes[0],
        props,
        isExport,
        initializer,
        nonNullTypeNodes[0]
      )
    }
  }

  if (isDictionary(typecheckerInferredType)) {
    return "Dictionary"
  }

  if (isArrayType(typecheckerInferredType)) {
    return "Array"
  }

  // if (tsTypeName.startsWith("PackedScene")) {
  // This is a generic type in TS, so just return the non-generic Godot type.
  //   return "PackedScene"
  // }

  if (isEnumType(typecheckerInferredType)) {
    return tsTypeName
  }

  return actualType.getText()
}

export function notEmpty<TValue>(
  value: (TValue | null | undefined)[]
): TValue[] {
  return value.filter((x) => x !== undefined && x !== null) as TValue[]
}

/**
 * In cases like
 *
 * var x = 1.5
 *
 * var x = 1
 *
 * TypeScript will infer both of those to be type "number", but we want to be able to say
 * that the first one is a "float" and the second one is an "int".
 */
export function getPreciseInitializerType(
  initializer: ts.Expression | undefined,
  initStr: string
): string | undefined {
  if (!initializer) {
    return ""
  }

  // attempt to figure out from the literal type whether this is a int or a float.
  let isInt = !!initStr.match(/^[0-9]+$/)
  let isFloat = !!initStr.match(/^([0-9]+)?\.([0-9]+)?$/) && initStr.length > 1

  if (isInt) {
    return "int"
  }

  if (isFloat) {
    return "float"
  }

  return undefined
}

function copyFileSync(source: string, target: string) {
  let targetFile = target

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

export function copyFolderRecursiveSync(source: string, target: string) {
  let files = []

  // Check if folder needs to be created or integrated
  let targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach((file) => {
      let curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

export const getCommonElements = <T>(
  lists: T[][],
  eq: (a: T, b: T) => boolean
) => {
  if (lists.length === 0) {
    return []
  }

  return lists[0].filter((elem) =>
    lists.every((list) => list.find((listElem) => eq(listElem, elem)))
  )
}

export const getTimestamp = () => {
  const now = new Date()

  const h = now
    .getHours()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
  const m = now
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
  const s = now
    .getSeconds()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })

  return `[${h}:${m}:${s}]`
}

export const findContainingClassDeclaration = (
  node: ts.Node
): ts.ClassDeclaration | null => {
  while (
    !ts.isClassDeclaration(node) &&
    !ts.isSourceFile(node) &&
    node.parent
  ) {
    node = node.parent
  }

  return ts.isClassDeclaration(node) ? node : null
}
