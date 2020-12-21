import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseExpressionStatement = (node: ts.ExpressionStatement, props: ParseState): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.expression,
    props,
    content: expr => expr
  });
}

export const testExpressionStatement: Test = {
  ts: `
1 + 1
  `,
  expected: `
1 + 1
  `,
};