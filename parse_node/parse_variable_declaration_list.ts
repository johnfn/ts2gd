import ts, { VariableDeclarationList } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseVariableDeclarationList(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as VariableDeclarationList;

  if (node.declarations.length > 1) {
    console.error("Cant handle so many declarations!");
  }

  return parseNodeToString(node.declarations[0], props);
}
