import ts from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseForStatement(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ts.ForStatement;
  const newProps = { ...props, indent: props.indent + "  ", mostRecentControlStructureIsSwitch: false };

  return `${node.initializer ? props.indent + parseNodeToString(node.initializer, props) : ""}
${props.indent}while ${node.condition ? parseNodeToString(node.condition, newProps) : "true"}:
${parseNodeToString(node.statement, newProps)}${node.incrementor ? newProps.indent + parseNodeToString(node.incrementor, props) : ""}`;
}
