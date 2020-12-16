import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseGetAccessor = (node: ts.GetAccessorDeclaration, props: ParseState): ParseNodeType => {
  // TODO: fix node.name.getText()

  return combine({
    parent: node,
    nodes: [node.body, ...node.parameters],
    addIndent: true,
    props,
    content: (body, ...params) => `
func ${node.name.getText()}_get(${params}):
  ${body || "pass"}
`});
}
