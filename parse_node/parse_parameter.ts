import ts, { ParameterDeclaration } from "typescript";
import { program } from "../main";
import { getGodotType } from "../ts_utils";

export function parseParameter(genericNode: ts.Node) {
  const node = genericNode as ParameterDeclaration;
  const type = getGodotType(node, node.initializer, node.type);

  if (node.name.getText() === "value") {
    console.log(type);
  }

  return `${node.name.getText()}: ${type}`;
}
