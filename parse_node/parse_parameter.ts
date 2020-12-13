import ts from "typescript";
import { ParseState } from "../parse_node";
import { getGodotType } from "../ts_utils";

export function parseParameter(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ts.ParameterDeclaration;
  const type = getGodotType(node, node.initializer, node.type);
  const usages = props.usages.get(node.name as ts.Identifier);
  const isUnused = usages?.uses.length === 0;

  if (type) {
    return `${isUnused ? '_' : ''}${node.name.getText()}: ${type}`;
  } else {
    return `${isUnused ? '_' : ''}${node.name.getText()}`;
  }
}
