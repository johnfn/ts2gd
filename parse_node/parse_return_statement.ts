import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseReturnStatement = (
  node: ts.ReturnStatement,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => `return ${expr}`,
  })
}
