import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";
import { getGodotType } from "../ts_utils";

export function parsePropertyDeclaration(node: ts.PropertyDeclaration, props: ParseState) {
  if (node.initializer) {
    const type = getGodotType(node, node.initializer, node.type);

    return `onready var ${node.name.getText()}: ${type} = ${parseNodeToString(node.initializer, props)}`;
  } else {
    return `var ${node.name}: ${parseNodeToString(node.type!, props)}`;
  }
}