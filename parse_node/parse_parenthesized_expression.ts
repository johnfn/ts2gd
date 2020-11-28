import ts, { ParenthesizedExpression } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseParenthesizedExpression(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ParenthesizedExpression;

  return `(${parseNodeToString(node.expression, props)})`;
}
