import ts from "typescript";
import { program } from "../main";
import { parseNodeToString, ParseState } from "../parse_node";
import { tsTypeToGodotType } from "../ts_utils";

export function parsePropertyDeclaration(node: ts.PropertyDeclaration, props: ParseState) {
  if (node.initializer) {
    const type = tsTypeToGodotType(program.getTypeChecker().getTypeAtLocation(node.name));

    return `onready var ${node.name.getText()}: ${type} = ${parseNodeToString(node.initializer, props)}`;
  } else {
    return `var ${node.name}: ${parseNodeToString(node.type!, props)}`;
  }
}