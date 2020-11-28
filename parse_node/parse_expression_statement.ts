import ts, { ExpressionStatement } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseExpressionStatement(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ExpressionStatement;

  return props.indent + parseNodeToString(node.expression, props) + "\n";
}
