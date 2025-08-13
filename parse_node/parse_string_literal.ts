import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseStringLiteral = (
  node: ts.StringLiteral,
  props: ParseState
): ParseNodeType => {
  let text = node.text

  // TODO: I'm sure there's a better way to do this.
  text = text.replaceAll("\n", "\\n")

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => `"${text}"`,
  })
}
