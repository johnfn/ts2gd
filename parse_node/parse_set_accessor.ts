import ts from "typescript";
import { parseParameterList } from "./parse_parameter_list";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseSetAccessor(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ts.SetAccessorDeclaration;
  const newProps = { ...props, indent: props.indent + "  " };
  return `
func ${node.name.getText()}_set(${parseParameterList(node.parameters, props)}):
${parseNodeToString(node.body!, newProps)}
    `;
}
