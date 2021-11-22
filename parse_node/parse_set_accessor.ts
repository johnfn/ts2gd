import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseSetAccessor = (
  node: ts.SetAccessorDeclaration,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.name, node.body, ...node.parameters],
    props,
    addIndent: true,
    parsedStrings: (name, body, ...params) =>
      `
func ${name}_set(${params.join(", ")}):
  ${body || "pass"}
`,
  })
}

export const testGet: Test = {
  ts: `
class Foo {
  _x: float;
  set x(value: float) { _x = value; }
}
  `,
  expected: `
class_name Foo
var x setget x_set,
var _x: float
func x_set(value: float):
  _x = value
  `,
}
