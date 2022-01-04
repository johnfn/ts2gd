import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseSuperKeyword = (
  node: ts.SuperExpression,
  props: ParseState
): ParseNodeType => {
  return combine({ parent: node, nodes: [], props, parsedStrings: () => `` })
}
