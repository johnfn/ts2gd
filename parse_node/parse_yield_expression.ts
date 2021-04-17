import ts from "typescript"
import { combine, parseNode, ParseState } from "../parse_node"

import { ParseNodeType } from "../parse_node"

export const parseYieldExpression = (
  node: ts.YieldExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => `yield ${expr}`,
  })
}
