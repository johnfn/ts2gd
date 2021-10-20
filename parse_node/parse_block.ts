import ts from "typescript"
import { combine, ParseState } from "../parse_node"
import { ParseNodeType } from "../parse_node"

export const parseBlock = (
  node: ts.Block,
  props: ParseState
): ParseNodeType => {
  if (node.statements.length !== 0) {
    return combine({
      parent: node,
      nodes: node.statements,
      props,
      parsedStrings: (...parsed) => {
        return parsed.join("")
      },
    })
  } else {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "pass\n",
    })
  }
}
