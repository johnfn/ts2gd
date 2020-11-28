import ts from "typescript";
import { ParseState } from "../parse_node";

export function parseTypeReference(node: ts.TypeReferenceNode, props: ParseState) {
  return node.getText();
}
