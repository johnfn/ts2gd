import ts, { WhileStatement } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseWhileStatement(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as WhileStatement;
  const newProps = { ...props, indent: props.indent + "  ", mostRecentControlStructureIsSwitch: false };

  return `${props.indent}while ${parseNodeToString(node.expression, newProps)}:
${parseNodeToString(node.statement, newProps)}\n`;
}
