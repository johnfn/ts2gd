import ts, { SyntaxKind } from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"

export const parseParenthesizedExpression = (
  node: ts.ParenthesizedExpression,
  props: ParseState
): ParseNodeType => {
  if (node.expression.kind === SyntaxKind.AsExpression) {
    return combine({
      parent: node,
      nodes: node.expression,
      props,
      parsedStrings: (expr) => `${expr}`,
    })
  }

  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => `(${expr})`,
  })
}
