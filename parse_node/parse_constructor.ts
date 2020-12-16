import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseConstructor = (node: ts.ConstructorDeclaration, props: ParseState): ParseNodeType => {
  if (node.body) {
    return combine({
      parent: node,
      nodes: node.body,
      props,
      addIndent: true,
      content: body => `
func _ready(): 
  ${body}
` });
  } else {
    return combine({ parent: node, nodes: [], props, content: () => `func _ready():\n pass` });
  }
}
