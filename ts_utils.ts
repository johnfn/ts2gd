import ts, { ObjectFlags, SyntaxKind, TypeFlags } from "typescript"
import { ParseState } from "./parse_node"
import { ErrorName, TsGdReturn } from "./errors"
import fs from "fs"
import path from "path"

export const isNullable = (node: ts.Node, typechecker: ts.TypeChecker) => {
  const type = typechecker.getTypeAtLocation(node)

  return type.isUnion() &&
    type.types.find(
      (type) => type.flags & TypeFlags.Null || type.flags & TypeFlags.Undefined
    )
    ? true
    : false
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

// Location is either
// * The TS AST node that the error occured at (preferred), or
// * Some generic string (ideally a path to the file)
// export const logErrorAtNode = (
//   location: ts.Node | string,
//   error: ErrorName
// ): TsGdError => {
//   if (typeof location === "string") {
//     return {
//       error,
//       location,
//     }
//   } else {
//     const {
//       line,
//       character,
//     } = location
//       .getSourceFile()
//       ?.getLineAndCharacterOfPosition(location.getStart())
//     console.warn()
//     console.warn(
//       "Error at",
//       `${chalk.blueBright(location.getSourceFile().fileName)}:${chalk.yellow(
//         line + 1
//       )}:${chalk.yellow(character + 1)}`
//     )
//   }

//   console.warn(chalk.redBright(error))
// }

/**
 * Get the Godot type for a node. The more arguments that are passed in, the more precise
 * we can be about this type.
 *
 * Note we need actualType because if we have let x: float, TS will say the
 * type is number (not float!), which isn't very useful.
 *
 * @param typecheckerInferredType This is the type that getTypeAtLocation returns
 * @param actualType This is the actual type node in the program, if there is one
 */
export function getGodotType(
  node: ts.Node,
  props: ParseState,
  initializer?: ts.Expression,
  actualType?: ts.TypeNode
): TsGdReturn<string | null> {
  const typecheckerInferredType = props.program
    .getTypeChecker()
    .getTypeAtLocation(node)

  // If we have a precise initializer, use that first

  if (initializer) {
    let preciseInitializerType = getPreciseInitializerType(
      initializer,
      props.getNodeText(initializer)
    )

    if (preciseInitializerType) {
      return { result: preciseInitializerType }
    }
  }

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
    return {
      errors: [
        {
          description: `Please add either "int" or "float" here (not number)`,
          error: ErrorName.InvalidNumber,
          location: node,
        },
      ],

      result: "float",
    }
  }

  // TODO: Optionals make this nearly impossible

  if (tsTypeName === "string") {
    return { result: "String" }
  }

  if (tsTypeName === "boolean") {
    return { result: "bool" }
  }

  // if (tsTypeName.startsWith("{")) {
  //   return { result: "Dictionary" }
  // }

  if (tsTypeName.startsWith("IterableIterator")) {
    return { result: "Array" }
  }

  // if (tsTypeName.includes("[")) {
  //   return "Array"
  // }

  // if (tsTypeName.startsWith("PackedScene")) {
  // This is a generic type in TS, so just return the non-generic Godot type.
  //   return "PackedScene"
  // }

  // Enum type names are actually not imported!
  // TODO: They are now!

  // if (isEnumType(typecheckerInferredType)) {
  //   return tsTypeName;
  // }

  // TODO: Doing all these cases is subtle to get right and doesn't confer a lot
  // of benefit. In some cases (e.g. using user-defined types) it actually
  // causes errors due to cyclic dependencies, and those would be a huge pain to
  // resolve properly.

  return { result: null }
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
