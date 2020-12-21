import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseGetAccessor = (node: ts.GetAccessorDeclaration, props: ParseState): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.name, node.body, ...node.parameters],
    addIndent: true,
    props,
    content: (name, body, ...params) => `
func ${name}_get(${params}):
  ${body || "pass"}
`});
}

export const testGet: Test = {
  ts: `
class Foo {
  _x: number;
  get x(): number { return this._x; }
}
  `,
  expected: `
class_name Foo
var x setget , x_get
var _x: float
func x_get():
  return _x
  `,
};
