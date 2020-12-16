import ts from "typescript";
import { ParseState, parseNodeToString, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseElementAccessExpression = (node: ts.ElementAccessExpression, props: ParseState): ParseNodeType => {
  return combine(node, [node.expression, node.argumentExpression], props, (lhs, rhs) => `${lhs}[${rhs}]`)
}
