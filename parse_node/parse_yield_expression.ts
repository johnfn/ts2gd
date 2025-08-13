import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"

export const parseYieldExpression = (
  node: ts.YieldExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => {
      if (expr.includes(".$")) {
        return "yield(" + expr.replace(".$", ', "') + '")'
      } else {
        return `yield ${expr}`
      }
    },
  })
}
