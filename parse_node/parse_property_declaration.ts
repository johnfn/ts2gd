import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";
import { generatePrecedingNewlines, getGodotType } from "../ts_utils";

export function parsePropertyDeclaration(node: ts.PropertyDeclaration, props: ParseState) {
  const type = getGodotType(node, node.initializer, node.type);

  let result = "";

  result += generatePrecedingNewlines(node);

  if (node.initializer) {
    if (type) {
      result += `onready var ${node.name.getText()}: ${type} = ${parseNodeToString(node.initializer, props)}`;
    } else {
      result += `onready var ${node.name.getText()} = ${parseNodeToString(node.initializer, props)}`;
    }
  } else {
    if (type) {
      result += `var ${node.name}: ${parseNodeToString(node.type!, props)}`;
    } else {
      result += `var ${node.name}`;
    }
  }

  return result;
}