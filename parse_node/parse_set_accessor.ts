import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseSetAccessor = (node: ts.SetAccessorDeclaration, props: ParseState): ParseNodeType => {
  return combine(node, [node.name, node.body, ...node.parameters], props, (name, body, ...params) =>
    `
func ${name}_set(${params.join(', ')}):
${body}`);
}
