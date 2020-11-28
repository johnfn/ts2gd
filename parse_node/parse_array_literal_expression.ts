import ts from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseArrayLiteralExpression(node: ts.ArrayLiteralExpression, props: ParseState) {
  return `[${node.elements.map(e => parseNodeToString(e, props)).join(', ')}]`;
}
