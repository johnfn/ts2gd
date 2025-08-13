import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseTypeofExpression = (
  node: ts.TypeOfExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => {
      return `${expr}.get_class()`
    },
  })
}
