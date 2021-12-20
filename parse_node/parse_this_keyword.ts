import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseThisKeyword = (
  node: ts.ThisExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => `self`,
  })
}
