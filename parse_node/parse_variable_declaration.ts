import ts, { VariableDeclaration } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseVariableDeclaration(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as VariableDeclaration;

  // TODO: Destructuring
  return `var ${node.name.getText()}${node.initializer ? " = " + parseNodeToString(node.initializer, props) : ""}`;
}
