import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseVariableDeclarationList = (node: ts.VariableDeclarationList, props: ParseState): ParseNodeType => {
  if (node.declarations.length > 1) {
    console.error("Cant handle so many declarations!");
  }

  return combine({ parent: node, nodes: node.declarations, props, content: (...decls) => decls.join("") });
}
