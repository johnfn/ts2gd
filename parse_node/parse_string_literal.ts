import ts from "typescript";

import { combine, ParseNodeType, ParseState } from "../parse_node"

export const parseStringLiteral = (node: ts.StringLiteral, props: ParseState): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [],
    props,
    content: () =>
      `"${node.text}"`
  });
}
