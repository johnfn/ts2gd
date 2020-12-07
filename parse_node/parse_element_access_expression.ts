import ts, { ElementAccessExpression } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseElementAccessExpression(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ElementAccessExpression;

  const lhs = parseNodeToString(node.expression, props);
  const rhs = parseNodeToString(node.argumentExpression, props);

  return `${lhs}[${rhs}]`;
}
