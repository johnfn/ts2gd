import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseIdentifier = (
  node: ts.Identifier,
  props: ParseState
): ParseNodeType => {
  const name = node.text

  if (name === "undefined") {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "null",
    })
  }

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => {
      const name = props.scope.getName(node)

      if (!name) {
        return node.text
      }

      return name
    },
  })
}
