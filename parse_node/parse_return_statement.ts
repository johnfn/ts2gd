import ts from "typescript"
import { combine, ParseState } from "../parse_node"
import { ParseNodeType } from "../parse_node"

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
