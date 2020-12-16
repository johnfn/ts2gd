import ts from "typescript";

import { combine, ParseNodeType, ParseState } from "../parse_node"

export const parseIdentifier = (node: ts.Identifier, props: ParseState): ParseNodeType => {
  const name = node.text;

  if (name === "undefined") {
    return combine(node, [], props, () => "null");
  } else {
    return combine(node, [], props, () => node.text);
  }
}
