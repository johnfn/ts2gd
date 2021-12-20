import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseBlock = (
  node: ts.Block,
  props: ParseState
): ParseNodeType => {
  /**
   * The reason we can't `pass` here if node.statements.length === 0 is because
   * a default parameter could add extraLines, which means that the function
   * would not actually have an empty body - but there's no easy way to konw
   * that from here.
   */

  return combine({
    parent: node,
    nodes: node.statements,
    props,
    parsedStrings: (...parsed) => {
      return parsed.join("")
    },
  })
}
