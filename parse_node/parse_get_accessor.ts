import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseGetAccessor = (node: ts.GetAccessorDeclaration, props: ParseState): ParseNodeType => {
  // TODO: fix node.name.getText()

  return combine(node, [node.body, ...node.parameters], props, (body, ...params) =>
    `
func ${node.name.getText()}_get(${params}):
${body || "pass"}
    `);
}
