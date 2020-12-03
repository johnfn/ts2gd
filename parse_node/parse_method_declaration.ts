import ts, { MethodDeclaration } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";
import { parseParameterList } from "./parse_parameter_list";

export function parseMethodDeclaration(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as MethodDeclaration;
  const newProps = { ...props, indent: props.indent + "  " };

  return `func ${node.name.getText()}(${parseParameterList(node.parameters, props)}):\n${parseNodeToString(node.body!, newProps)}\n`;
}
