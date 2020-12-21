import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseSetAccessor = (node: ts.SetAccessorDeclaration, props: ParseState): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.name, node.body, ...node.parameters],
    props,
    addIndent: true,
    content: (name, body, ...params) =>
      `
func ${name}_set(${params.join(', ')}):
  ${body}
`});
}

export const testGet: Test = {
  ts: `
class Foo {
  _x: number;
  set x(value: number) { _x = value; }
}
  `,
  expected: `
class_name Foo
var x setget x_set,
var _x: float
func x_set(value: float):
  _x = value
  `,
};
