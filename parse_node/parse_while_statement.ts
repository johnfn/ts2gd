import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState, parseNodeToString } from "../parse_node";
import { syntaxToKind } from "../ts_utils";

export function parseWhileStatement(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ts.WhileStatement;
  const newProps = { ...props, indent: props.indent + "  ", mostRecentControlStructureIsSwitch: false };

  let body: string;

  if (node.statement.kind === SyntaxKind.EmptyStatement) {
    body = `${props.indent}  pass`;
  } else {
    body = parseNodeToString(node.statement, newProps);
  }

  return `${props.indent}while ${parseNodeToString(node.expression, newProps)}:
${body}`;
}
