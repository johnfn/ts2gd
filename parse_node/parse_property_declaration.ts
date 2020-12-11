import ts from "typescript";
import { program } from "../main";
import { parseNodeToString, ParseState } from "../parse_node";
import { generatePrecedingNewlines, getGodotType, getTypeHierarchy } from "../ts_utils";

export function parsePropertyDeclaration(node: ts.PropertyDeclaration, props: ParseState) {
  const godotType = getGodotType(node, node.initializer, node.type);

  let result = "";

  result += generatePrecedingNewlines(node);

  if (node.initializer) {
    const initializerType = program.getTypeChecker().getTypeAtLocation(node.initializer);
    const hierarchy = getTypeHierarchy(initializerType).map(x => program.getTypeChecker().typeToString(x));
    let needsOnReady = hierarchy.includes('Node2D') || hierarchy.includes('Node');

    if (godotType) {
      result += `${needsOnReady ? 'onready ' : ''}var ${node.name.getText()}: ${godotType} = ${parseNodeToString(node.initializer, props)}`;
    } else {
      result += `${needsOnReady ? 'onready ' : ''}var ${node.name.getText()} = ${parseNodeToString(node.initializer, props)}`;
    }
  } else {
    if (godotType) {
      result += `var ${node.name}: ${parseNodeToString(node.type!, props)}`;
    } else {
      result += `var ${node.name}`;
    }
  }

  return result;
}