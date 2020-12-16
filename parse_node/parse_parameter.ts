import ts from "typescript";
import { combine, ParseState } from "../parse_node";
import { getGodotType } from "../ts_utils";
import { ParseNodeType } from "../parse_node"

export const parseParameter = (node: ts.ParameterDeclaration, props: ParseState): ParseNodeType => {
  const type = getGodotType(node, node.initializer, node.type);
  const usages = props.usages.get(node.name as ts.Identifier);
  const unusedPrefix = usages?.uses.length === 0 ? '_' : '';
  const typeString = type ? `: ${type}` : '';

  return combine({ parent: node, nodes: node.initializer, props, content: initializer => `${unusedPrefix}${node.name.getText()}${typeString}${initializer && `= ${initializer}`}` });
}
