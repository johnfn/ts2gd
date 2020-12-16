import ts from "typescript";
import { combine, ParseState } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseNumericLiteral = (node: ts.NumericLiteral, props: ParseState): ParseNodeType => {
  // node.text has some weird edge cases e.g. "6.1" gives "6"!

  return combine({ parent: node, nodes: [], props, content: () => node.getText() });
}
