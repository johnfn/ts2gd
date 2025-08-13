import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseConditionalExpression = (
  node: ts.ConditionalExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.condition, node.whenTrue, node.whenFalse],
    props,
    parsedStrings: (cond, true_, false_) => {
      return `${true_} if ${cond} else ${false_}`
    },
  })
}
