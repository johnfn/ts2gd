import ts from "typescript";
import { program } from "../main";
import { parseNodeToString, ParseState } from "../parse_node";
import { tsTypeToGodotType } from "../ts_utils";

export function parsePropertyDeclaration(node: ts.PropertyDeclaration, props: ParseState) {
  if (node.initializer) {
    let type = tsTypeToGodotType(program.getTypeChecker().getTypeAtLocation(node.name));
    const initStr = node.initializer.getText();

    // attempt to figure out from the literal type whether this is a int or a float.
    let isInt = !!initStr.match(/[0-9]+/);
    let isFloat = (!!initStr.match(/([0-9]+)?\.([0-9]+)?/)) && initStr.length > 1;

    if (isInt) {
      type = "int";
    }

    if (isFloat) {
      type = "float";
    }

    return `onready var ${node.name.getText()}: ${type} = ${parseNodeToString(node.initializer, props)}`;
  } else {
    return `var ${node.name}: ${parseNodeToString(node.type!, props)}`;
  }
}