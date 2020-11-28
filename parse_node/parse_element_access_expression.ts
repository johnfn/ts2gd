import ts, { ElementAccessExpression } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseElementAccessExpression(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ElementAccessExpression;

  return `${parseNodeToString(node.expression, props)}[${parseNodeToString(node.expression, props)}]`;
}
