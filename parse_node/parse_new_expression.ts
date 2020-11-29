import ts from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseNewExpression(node: ts.NewExpression, props: ParseState): string {
  return parseNodeToString(node.expression, props);
}
