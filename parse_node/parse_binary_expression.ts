import ts, { SyntaxKind } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseBinaryExpression(node: ts.BinaryExpression, props: ParseState) {
  const needsLeftHandSpace = node.operatorToken.kind !== SyntaxKind.CommaToken;
  const left = parseNodeToString(node.left, props);
  const operatorToken = parseNodeToString(node.operatorToken, props);
  const right = parseNodeToString(node.right, props);

  return `${left}${needsLeftHandSpace ? ' ' : ''}${operatorToken} ${right}`;
}
