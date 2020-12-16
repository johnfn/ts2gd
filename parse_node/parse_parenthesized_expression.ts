import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseParenthesizedExpression = (node: ts.ParenthesizedExpression, props: ParseState): ParseNodeType => {
  return combine({ parent: node, nodes: node.expression, props, content: expr => `(${expr})` });
}
