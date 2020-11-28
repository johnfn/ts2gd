import ts from "typescript";
import { ParseState, addIndent, parseNodeToString } from "../parse_node";

export function parseIfStatement(node: ts.IfStatement, props: ParseState): string {
  const newProps = addIndent(props);
  const expression = parseNodeToString(node.expression, props);
  const thenStatement = parseNodeToString(node.thenStatement, newProps);
  const elseStatement = node.elseStatement ? parseNodeToString(node.elseStatement, newProps) : undefined;

  return `${props.indent}if ${expression}:
${thenStatement}
${elseStatement ?
      `${props.indent}else:
${elseStatement}
  ` : ''}`;
}
