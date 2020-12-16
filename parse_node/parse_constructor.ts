import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseConstructor = (node: ts.ConstructorDeclaration, props: ParseState): ParseNodeType => {
  if (node.body) {
    return combine(node, node.body, props, body => `func _ready(): ${body}`);
  } else {
    return combine(node, [], props, () => `func _ready():\n pass`);
  }
}
