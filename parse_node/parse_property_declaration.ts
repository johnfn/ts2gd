import ts, { SyntaxKind } from "typescript"
import { combine, ParseState } from "../parse_node"
import { getGodotType, getTypeHierarchy, isEnumType } from "../ts_utils"
import { ParseNodeType } from "../parse_node"
import { addError, ErrorName } from "../errors"
import { Test } from "../tests/test"
import chalk from "chalk"

export const isDecoratedAsExports = (
  node:
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration
) => {
  return !!node.decorators?.find(
    (dec) =>
      dec.expression.getText() === "exports" ||
      (ts.isCallExpression(dec.expression) &&
        dec.expression.expression.getText() === "exports")
  )
}

export const parseExports = (
  node:
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration,
  props: ParseState
) => {
  const decoration = node.decorators?.find(
    (dec) =>
      dec.expression.getText() === "exports" ||
      (ts.isCallExpression(dec.expression) &&
        dec.expression.expression.getText() === "exports")
  )!

  const typeGodotName = getGodotType(
    node,
    props.program.getTypeChecker().getTypeAtLocation(node),
    props,
    true, // isExported
    undefined,
    node.type
  )

  const godotExportArgs: string[] = [typeGodotName ?? "null"]

  if (node.type && ts.isArrayTypeNode(node.type)) {
    // Handle infering Array type for exports
    let elementType = node.type.elementType

    // If elementType is generic we need to extract only type name and discard type arguments
    if (ts.isTypeReferenceNode(elementType)) {
      // TODO: to remove this 'as any' cast the 'getGodotType' function
      //       should be adjusted to allow other types of nodes than 'ts.TypeNode'
      //       for actualType argument
      elementType = elementType.typeName as any
    }

    // unknown and any keyword should not infer array type for export
    if (
      elementType.kind !== SyntaxKind.AnyKeyword &&
      elementType.kind !== SyntaxKind.UnknownKeyword
    ) {
      const typeGodotElement = getGodotType(
        elementType,
        props.program.getTypeChecker().getTypeAtLocation(elementType),
        props,
        true, // isExported
        undefined,
        elementType
      )

      if (typeGodotElement) {
        godotExportArgs.push(typeGodotElement)
      } else {
        addError({
          description: `
Cannot infer element type for array export.
`,
          error: ErrorName.ExportedVariableError,
          location: elementType,
          stack: new Error().stack ?? "",
        })

        return ""
      }
    }
  }

  if (decoration.expression.kind === SyntaxKind.CallExpression) {
    // Handle exports arguments
    const fn = decoration.expression as ts.CallExpression

    if (fn.arguments.length > 0) {
      const result = combine({
        parent: decoration,
        nodes: [...fn.arguments],
        props,
        parsedStrings: (...args) => args.join(", "),
      })

      godotExportArgs.push(result.content)
    }
  }

  return `export(${godotExportArgs.join(", ")}) `
}

export const isDecoratedAsExportFlags = (
  node:
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration
): boolean => {
  return !!node.decorators?.find((dec) =>
    dec.expression.getText().startsWith("export_flags")
  )
}

export const parseExportFlags = (
  node:
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration,
  props: ParseState
): string => {
  const decoration = node.decorators?.find((dec) =>
    dec.expression.getText().startsWith("export_flags")
  )!

  if (decoration.expression.kind !== SyntaxKind.CallExpression) {
    addError({
      description: `
I'm confused by export_flags here. It should be a function call.

For instance, ${chalk.green(`@export_flags("A", "B", "C")`)}`,
      error: ErrorName.ExportedVariableError,
      location: node,
      stack: new Error().stack ?? "",
    })

    return ""
  }

  const fn = decoration.expression as ts.CallExpression

  const result = combine({
    parent: decoration,
    nodes: [...fn.arguments],
    props,
    parsedStrings: (...args) => args.join(", "),
  })

  return `export(int, FLAGS, ${result.content}) `
}

const isOnReady = (node: ts.PropertyDeclaration, props: ParseState) => {
  if (node.initializer) {
    // I think there's some sort of race where we save .d.ts files too fast to
    // then have the type checker re-analyze them, so the get_node() calls have a habit
    // of coming back as 'any' when we use the typechecker on them.

    const initializerText = node.initializer.getText()

    if (
      initializerText.includes("get_node(") ||
      initializerText.includes("get_node_unsafe")
    ) {
      return true
    }

    // TODO: This isn't quite so simple, because we could do something like node.value - where
    // node is Node but value is int - which we should mark as onready, but we aren't currently

    const initializerType = props.program
      .getTypeChecker()
      .getTypeAtLocation(node.initializer)
    const hierarchy = getTypeHierarchy(initializerType).map((x) =>
      props.program.getTypeChecker().typeToString(x)
    )

    return hierarchy.includes("Node2D") || hierarchy.includes("Node")
  }

  return false
}

const getSuperclassType = (classType: ts.Type) => {
  const baseTypes = classType.getBaseTypes() ?? []

  if (baseTypes.length === 0) {
    return null
  }

  if (baseTypes.length > 1) {
    throw new Error("> 1 base types; not sure which one to pick!")
  }

  return baseTypes[0]
}

export const parsePropertyDeclaration = (
  node: ts.PropertyDeclaration,
  props: ParseState
): ParseNodeType => {
  let klass = node.parent
  let classType = props.program.getTypeChecker().getTypeAtLocation(klass)
  let type = props.program.getTypeChecker().getTypeAtLocation(node)
  let superclassType = getSuperclassType(classType)

  let typeGodotName = getGodotType(
    node,
    props.program.getTypeChecker().getTypeAtLocation(node),
    props,
    false,
    node.initializer,
    node.type
  )
  let typeName = type.symbol?.getName() ?? ""
  let typeHintName = typeGodotName

  if (isEnumType(type)) {
    typeGodotName = props.program.getTypeChecker().typeToString(type)
  }

  if (typeName === "Signal") {
    let signalName = node.name.getText()

    if (signalName.startsWith("$")) {
      signalName = signalName.slice(1)
    } else {
      addError({
        description: "Signals must be prefixed with $.",
        error: ErrorName.SignalsMustBePrefixedWith$,
        location: node,
        stack: new Error().stack ?? "",
      })
    }

    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => `signal ${signalName}`,
    })
  }

  let exportText = ""

  if (isDecoratedAsExports(node)) {
    // TODO: Have a fallback

    exportText = isDecoratedAsExports(node) ? parseExports(node, props) : ""
  }

  if (isDecoratedAsExportFlags(node)) {
    exportText = parseExportFlags(node, props)
  }

  const onReady = isOnReady(node, props)

  return combine({
    parent: node,
    nodes: [node.initializer, node.name],
    props,
    parsedStrings: (initializer, name) => {
      // Don't redeclare properties defined in a superclass. This is useful in
      // TS (because you can define them w/ more precise types) but causes an
      // error in Godot.
      if (superclassType?.getProperties().find((prop) => prop.name === name)) {
        return ""
      }

      return `${exportText}${onReady ? "onready " : ""}var ${name}${
        typeHintName ? `: ${typeHintName}` : ""
      }${initializer && ` = ${initializer}`}`
    },
  })
}

export const testNormalExportedVariable: Test = {
  ts: `
export class Test {
  @exports
  foo: int
}
  `,
  expected: `
class_name Test
export(int) var foo: int
`,
}

export const testNormalExportedVariable2: Test = {
  ts: `
export class Test {
  @exports
  foo: float
}
  `,
  expected: `
class_name Test
export(float) var foo: float
`,
}

export const testNormalExportedVariable3: Test = {
  ts: `
export class Test {
  @exports
  foo: string
}
  `,
  expected: `
class_name Test
export(String) var foo: String
`,
}

export const testNormalExportedVariable4: Test = {
  ts: `
export class Test {
  @exports
  foo: { [key: string]: string }
}
  `,
  expected: `
class_name Test
export(Dictionary) var foo
`,
}

export const testNormalExportedVariable5: Test = {
  ts: `
export class Test {
  @exports
  foo: number[]
}
  `,
  expected: `
class_name Test
export(Array, float) var foo
`,
}

export const testNotSoNormalExportedVariable6: Test = {
  ts: `
export class Test {
  @exports
  foo: { [key: string]: string }[]
}
  `,
  expected: `
class_name Test
export(Array, Dictionary) var foo
`,
}

export const testNotSoNormalExportedVariable7: Test = {
  ts: `
export class Test {
  @exports
  foo: int | null
}
  `,
  expected: `
class_name Test
export(int) var foo
`,
}

export const testNotSoNormalExportedVariable8: Test = {
  ts: `
export class Test {
  @exports
  foo: int | null | undefined
}
  `,
  expected: `
class_name Test
export(int) var foo
`,
}

export const testNotSoNormalExportedVariable9: Test = {
  ts: `
export class Test {
  @exports
  foo: { [key: string]: string } | null | undefined
}
  `,
  expected: `
class_name Test
export(Dictionary) var foo
`,
}

export const testNotSoNormalExportedVariable10: Test = {
  ts: `
export enum MyEnum {

}

export class Test {
  @exports
  foo: MyEnum
}
  `,
  fileName: "Test.ts",
  expected: {
    type: "multiple-files",
    files: [
      {
        fileName: "/Users/johnfn/MyGame/compiled/Test.gd",
        expected: `
class_name Test
const MyEnum = preload("res://compiled/Test_MyEnum.gd").MyEnum
export(MyEnum) var foo
      `,
      },

      {
        fileName: "/Users/johnfn/MyGame/compiled/Test_MyEnum.gd",
        expected: `
const MyEnum = {
}`,
      },
    ],
  },
}

export const testExportObj: Test = {
  ts: `
export class Test {
  @exports
  foo: Vector2
}
  `,
  expected: `
class_name Test
export(Vector2) var foo
`,
}

export const testExportObj2: Test = {
  ts: `
export class Test {
  @exports
  foo: Vector2 | null
}
  `,
  expected: `
class_name Test
export(Vector2) var foo
`,
}

export const testNumberTypeByAnnotation: Test = {
  ts: `
export class Test {
  x: int = 1
}
  `,
  expected: `
class_name Test
var x: int = 1
`,
}

export const testNumberTypeByAnnotation2: Test = {
  ts: `
export class Test {
  x: float = 1
}
  `,
  expected: `
class_name Test
var x: float = 1
`,
}

export const testNumberTypeByNoAnnotation: Test = {
  ts: `
export class Test {
  x = 1
}
  `,
  expected: `
class_name Test
var x: int = 1
`,
}

export const testNumberTypeByNoAnnotation2: Test = {
  ts: `
export class Test {
  x = 1.0
}
  `,
  expected: `
class_name Test
var x: float = 1.0
`,
}

export const testExportFlags: Test = {
  ts: `
export class Test {
  @export_flags("A", "B", "C")
  exportFlagsTest
}
  `,
  expected: `
class_name Test
export(int, FLAGS, "A", "B", "C") var exportFlagsTest
`,
}

export const testExportInferArrayTypeFromNonGenericElement: Test = {
  ts: `
export class Test {
  @exports
  exportFlagsTest: float[];
}
  `,
  expected: `
class_name Test
export(Array, float) var exportFlagsTest
`,
}

export const testExportInferArrayTypeFromGenericElement: Test = {
  ts: `
export class Test {
  @exports
  exportFlagsTest: PackedScene<Node2D>[];
}
  `,
  expected: `
class_name Test
export(Array, PackedScene) var exportFlagsTest
`,
}

export const testExportInferAnyOrUnknownArray: Test = {
  ts: `
export class Test {
  @exports
  exportFlagsTest: any[];

  @exports
  exportFlagsTest2: unknown[];
}
  `,
  expected: `
class_name Test
export(Array) var exportFlagsTest
export(Array) var exportFlagsTest2
`,
}
