import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"
import { getPreciseInitializerType } from "../ts_utils";

export const parseVariableDeclaration = (node: ts.VariableDeclaration, props: ParseState): ParseNodeType => {
  const type = getPreciseInitializerType(node.initializer);
  const usages = props.usages.get(node.name as ts.Identifier);
  const unused = (usages?.uses.length === 0) ? '_' : '';
  const typeString = type ? `: ${type}` : '';

  return combine({
    parent: node,
    nodes: [node.name, node.initializer],
    props,
    content: (nodeName, init) => `var ${unused}${nodeName}${typeString}${init ? " = " + init : ""}`
  });
}
