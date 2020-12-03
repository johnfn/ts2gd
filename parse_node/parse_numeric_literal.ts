import ts from "typescript";
import { ParseState } from "../parse_node";

export function parseNumericLiteral(node: ts.NumericLiteral, props: ParseState) {
  // node.text has some weird edge cases e.g. "6.1" gives "6"!

  return node.getText();
}
