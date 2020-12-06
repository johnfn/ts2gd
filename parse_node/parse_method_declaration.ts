import ts, { MethodDeclaration } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";
import { parseParameterList } from "./parse_parameter_list";

export function parseMethodDeclaration(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as MethodDeclaration;
  const newProps = { ...props, indent: props.indent + "  " };

  const funcName = node.name.getText();
  let params = parseParameterList(node.parameters, props);

  // TODO: handle other built-in functions in the same way
  if (funcName === '_process' && params.trim().length === 0) {
    params = '_delta: float';
  }

  return `func ${funcName}(${params}):\n${parseNodeToString(node.body!, newProps)}\n`;
}
