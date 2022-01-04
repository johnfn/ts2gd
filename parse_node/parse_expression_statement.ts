import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

export const parseExpressionStatement = (
  node: ts.ExpressionStatement,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => expr,
  })
}

export const testExpressionStatement: Test = {
  ts: `
1 + 1
  `,
  expected: `
1 + 1
  `,
}
