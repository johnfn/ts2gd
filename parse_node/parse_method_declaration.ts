import ts, { MethodDeclaration } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseMethodDeclaration(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as MethodDeclaration;
  const newProps = { ...props, indent: props.indent + "  " };

  return `func ${node.name.getText()}(${node.parameters.map(param => parseNodeToString(param, newProps)).join(', ')}):\n${parseNodeToString(node.body!, newProps)}\n`;
}
