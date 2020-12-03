import ts, { ParameterDeclaration } from "typescript";
import { getGodotType } from "../ts_utils";

export function parseParameter(genericNode: ts.Node) {
  const node = genericNode as ParameterDeclaration;
  const type = getGodotType(node, node.initializer, node.type);

  if (type) {
    return `${node.name.getText()}: ${type}`;
  } else {
    return `${node.name.getText()}`;
  }
}
