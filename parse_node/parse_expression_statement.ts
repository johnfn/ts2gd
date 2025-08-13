import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

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
