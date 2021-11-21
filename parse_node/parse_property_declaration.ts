import ts, { SyntaxKind } from "typescript"
import { combine, ParseState } from "../parse_node"
import { getGodotType, getTypeHierarchy, isEnumType } from "../ts_utils"
import { ParseNodeType } from "../parse_node"
import { ErrorName } from "../errors"
import { Test } from "../tests/test"
import chalk from "chalk"

export const isDecoratedAsExports = (
  node:
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration
) => {
  return !!node.decorators?.find(
    (dec) => dec.expression.getText() === "exports"
  )
}

const isDecoratedAsExportFlags = (node: ts.PropertyDeclaration): boolean => {
  return !!node.decorators?.find((dec) =>
    dec.expression.getText().startsWith("export_flags")
  )
}

const parseExportFlags = (
  node: ts.PropertyDeclaration,
  props: ParseState
): string => {
  const decoration = node.decorators?.find((dec) =>
    dec.expression.getText().startsWith("export_flags")
  )!

  if (decoration.expression.kind !== SyntaxKind.CallExpression) {
    props.addError({
      description: `
I'm confused by export_flags here. It should be a function call. 

For instance, ${chalk.green(`@export_flags("A", "B", "C")`)}`,
      error: ErrorName.ExportedVariableError,
      location: node,
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

  return `@export_flags(${result.content})\n`
}

const isOnReady = (node: ts.PropertyDeclaration, props: ParseState) => {
  if (node.initializer) {
    // I think there's some sort of race where we save .d.ts files too fast to
    // then have the type checker re-analyze them, so the get_node() calls have a habit
    // of coming back as 'any' when we use the typechecker on them.

    const initializerText = props.getNodeText(node.initializer)

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

  let nameOrError = getGodotType(
    node,
    props.program.getTypeChecker().getTypeAtLocation(node),
    props,
    false,
    node.initializer,
    node.type
  )

  if (nameOrError.errors) {
    for (const error of nameOrError.errors) {
      props.addError(error)
    }
  }

  let typeGodotName = getGodotType(
    node,
    props.program.getTypeChecker().getTypeAtLocation(node),
    props,
    false,
    node.initializer,
    node.type
  )
  let typeName = type.symbol?.getName() ?? ""
  let typeHintName = typeGodotName.result

  typeGodotName.errors?.forEach((error) => props.addError(error))

  if (isEnumType(type)) {
    typeGodotName.result = props.program.getTypeChecker().typeToString(type)
  }

  if (typeName === "Signal") {
    let signalName = node.name.getText()

    if (signalName.startsWith("$")) {
      signalName = signalName.slice(1)
    } else {
      props.addError({
        description: "Signals must be prefixed with $.",
        error: ErrorName.SignalsMustBePrefixedWith$,
        location: node,
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
    let typeGodotName = getGodotType(
      node,
      props.program.getTypeChecker().getTypeAtLocation(node),
      props,
      true, // isExported
      node.initializer,
      node.type
    )

    // TODO: Have a fallback

    exportText = isDecoratedAsExports(node)
      ? `export(${typeGodotName.result ?? "null"}) `
      : ""
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
export(Array) var foo
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
export(Array) var foo
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
  expected: `
class_name Test
const MyEnum = preload("_MyEnum.gd").MyEnum
export(MyEnum) var foo
`,
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
@export_flags("A", "B", "C") 
var exportFlagsTest
`,
}
