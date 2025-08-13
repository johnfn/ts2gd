import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"

export const parseNumericLiteral = (
  node: ts.NumericLiteral,
  props: ParseState
): ParseNodeType => {
  // node.text has some weird edge cases e.g. "6.1" gives "6"!

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => node.getText(),
  })
}
