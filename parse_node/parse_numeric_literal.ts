import ts from "typescript";
import { ParseState } from "../parse_node";

export function parseNumericLiteral(node: ts.NumericLiteral, props: ParseState) {
  return node.text;
}
