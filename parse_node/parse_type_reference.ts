import ts from "typescript";
import { combine, ParseState } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseTypeReference = (node: ts.TypeReferenceNode, props: ParseState): ParseNodeType => {
  return combine({ parent: node, nodes: [], props, content: () => node.getText() });
}
