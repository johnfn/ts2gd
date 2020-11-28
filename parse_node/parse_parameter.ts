import ts, { ParameterDeclaration } from "typescript";
import { program } from "../main";
import { tsTypeToGodotType } from "../ts_utils";

export function parseParameter(genericNode: ts.Node) {
  const node = genericNode as ParameterDeclaration;
  const type = tsTypeToGodotType(program.getTypeChecker().getTypeAtLocation(node.name));

  return `${node.name.getText()}: ${type}`;
}
