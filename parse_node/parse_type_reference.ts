import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseTypeReference = (
  node: ts.TypeReferenceNode,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => node.getText(),
  })
}
