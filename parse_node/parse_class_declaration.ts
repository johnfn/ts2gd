import ts, { SyntaxKind } from "typescript"

import { ErrorName } from "../project/errors"
import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { getGodotType } from "../ts_utils"

import {
  isDecoratedAsExportFlags,
  isDecoratedAsExports,
  parseExportFlags,
  parseExports,
} from "./parse_property_declaration"

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
      exportText = parseExports(setGet, props)
    }

    if (isDecoratedAsExportFlags(setGet)) {
      exportText = parseExportFlags(setGet, props)
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
    (dec) => dec.expression.getText() === "autoload"
  )

  if (!modifiers?.includes("export") && !isAutoload) {
    props.project.errors.add({
      description: "You must export this class.",
      error: ErrorName.ClassMustBeExported,
      location: node,
      stack: new Error().stack ?? "",
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
  expected: { error: "You must export this class", type: "error" },
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

export const testExportArgsSetGet: Test = {
  ts: `
@autoload
class Foo {
  @exports
  get nodes(): PackedScene<Node2D>[] {
      return [];
  }

  set nodes(v: PackedScene<Node2D>[]) {

  }
}`,
  expected: `
class_name Foo
export(Array, PackedScene) var nodes setget nodes_set, nodes_get
func nodes_get():
  return []
func nodes_set(_v):
  pass
`,
}
