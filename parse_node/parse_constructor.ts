import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseConstructor = (node: ts.ConstructorDeclaration, props: ParseState): ParseNodeType => {
  if (node.body) {
    // The trim() is for a constructor with only one element: a super() call

    return combine({
      parent: node,
      nodes: node.body,
      props,
      addIndent: true,
      content: body => `
func _ready(): 
  ${body.trim().length > 0 ? body : 'pass'}
` });
  } else {
    return combine({
      parent: node,
      nodes: [],
      props,
      content: () => `func _ready():\n pass`
    });
  }
}
