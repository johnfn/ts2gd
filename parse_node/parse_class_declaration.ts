import ts, { SyntaxKind } from "typescript"
import { ErrorName } from "../errors"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"
import { getGodotType, isArrayType } from "../ts_utils"
import { isDecoratedAsExports } from "./parse_property_declaration"

const getSettersAndGetters = (
  members: readonly ts.ClassElement[],
  props: ParseState
) => {
  const setOrGetters = members.filter(
    (member) =>
      member.kind === SyntaxKind.SetAccessor ||
      member.kind === SyntaxKind.GetAccessor
  ) as (ts.SetAccessorDeclaration | ts.GetAccessorDeclaration)[]

  const pairings: {
    setter?: ts.SetAccessorDeclaration
    getter?: ts.GetAccessorDeclaration
    exportText: string | null
    name: string
  }[] = []

  for (const setGet of setOrGetters) {
    let exportText: string | null = null

    if (isDecoratedAsExports(setGet)) {
      const typeGodotName = getGodotType(
        setGet,
        props.program.getTypeChecker().getTypeAtLocation(setGet),
        props,
        true, // isExported
        undefined,
        setGet.type
      )

      exportText = `export(${typeGodotName.result ?? "null"}) `
    }

    if (setGet.kind === SyntaxKind.SetAccessor) {
      const setter = setGet as ts.SetAccessorDeclaration
      const name = setter.name.getText()
      const existingObj = pairings.find((pair) => pair.name === name)

      if (existingObj) {
        existingObj.setter = setter
        existingObj.exportText ??= exportText
      } else {
        pairings.push({ setter, name, exportText })
      }
    }

    if (setGet.kind === SyntaxKind.GetAccessor) {
      const getter = setGet as ts.GetAccessorDeclaration
      const name = getter.name.getText()
      const existingObj = pairings.find((pair) => pair.name === name)

      if (existingObj) {
        existingObj.getter = getter
        existingObj.exportText ??= exportText
      } else {
        pairings.push({ getter, name, exportText })
      }
    }
  }

  return pairings
}

export const parseClassDeclaration = (
  node: ts.ClassDeclaration | ts.ClassExpression,
  props: ParseState
): ParseNodeType => {
  const modifiers = node.modifiers?.map((x) => x.getText())

  // skip class declarations; there's no code to generate here
  if (modifiers?.includes("declare")) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  }

  const isAutoload = !!node.decorators?.find(
    (dec) => props.getNodeText(dec.expression) === "autoload"
  )

  if (!modifiers?.includes("export") && !isAutoload) {
    props.addError({
      description: "You must export this class.",
      error: ErrorName.ClassMustBeExported,
      location: node,
    })
  }

  // Preprocess set/get to make setget declarations
  const settersAndGetters = getSettersAndGetters(node.members, props)
  const parsedSetterGetters = settersAndGetters
    .map(({ setter, getter, name, exportText }) => {
      return `${exportText ?? ""}var ${name} setget ${
        setter ? name + "_set" : ""
      }, ${getter ? name + "_get" : ""}`
    })
    .join("\n")

  // NOTE: Since extends and class_name *must* come first in the file,
  // they are added ahead of time by parse_source_file.ts.

  return combine({
    parent: node,
    nodes: node.members,
    props,
    parsedStrings: (...members) => {
      return `
${parsedSetterGetters}
${members.join("")}
`
    },
  })
}

export const testRequireExportedClass: Test = {
  ts: `
class Foo {
  x = 1
}`,
  expected: { error: "You must export this class" },
}

export const testDontRequireExportingAutoloads: Test = {
  ts: `
@autoload
class Foo {
  x = 1
}`,
  expected: `
class_name Foo
var x: int = 1  
`,
}
