import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseMethodDeclaration = (node: ts.MethodDeclaration, props: ParseState): ParseNodeType => {
  const funcName = node.name.getText();

  return combine({
    parent: node,
    nodes: [node.body, ...node.parameters],
    props: props,
    addIndent: true,
    content: (body, ...params) => {
      let joinedParams = params.join(', ');

      // TODO: handle other built-in functions in the same way
      if (funcName === '_process' && joinedParams.trim().length === 0) {
        joinedParams = "_delta: float";
      }

      return `
func ${funcName}(${joinedParams}):
  ${body || " pass"}
`;
    }
  });
}

export const testProcessGetsArgsAdded: Test = {
  ts: `
class Foo extends Node2D {
  _process() {}
}
  `,
  expected: `
extends Node2D
class_name Foo
func _process(_delta: float):
  pass
  `,
};