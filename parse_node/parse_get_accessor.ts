import ts from "typescript";
import { parseParameterList } from "./parse_parameter_list";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseGetAccessor(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ts.GetAccessorDeclaration;
  const newProps = { ...props, indent: props.indent + "  " };
  return `
func ${node.name.getText()}_get(${parseParameterList(node.parameters, props)}):
${parseNodeToString(node.body!, newProps)}
    `;
}
