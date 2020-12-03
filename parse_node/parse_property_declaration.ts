import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";
import { getGodotType } from "../ts_utils";

export function parsePropertyDeclaration(node: ts.PropertyDeclaration, props: ParseState) {
  const type = getGodotType(node, node.initializer, node.type);

  if (node.initializer) {
    if (type) {
      return `onready var ${node.name.getText()}: ${type} = ${parseNodeToString(node.initializer, props)}`;
    } else {
      return `onready var ${node.name.getText()} = ${parseNodeToString(node.initializer, props)}`;
    }
  } else {
    if (type) {
      return `var ${node.name}: ${parseNodeToString(node.type!, props)}`;
    } else {
      return `var ${node.name}`;
    }
  }
}