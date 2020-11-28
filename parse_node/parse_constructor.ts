import ts, { ConstructorDeclaration } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseConstructor(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ConstructorDeclaration;

  return `func _ready(): \n` + parseNodeToString(node.body!, { ...props, isConstructor: true, indent: "  " + props.indent });
}
