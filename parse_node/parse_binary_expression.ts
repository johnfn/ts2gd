import ts, { SyntaxKind } from "typescript";
import { program } from "../main";
import { ParseState, parseNodeToString } from "../parse_node";
import { isDictionary } from "../ts_utils";

export function parseBinaryExpression(node: ts.BinaryExpression, props: ParseState) {
  const needsLeftHandSpace = node.operatorToken.kind !== SyntaxKind.CommaToken;
  const left = parseNodeToString(node.left, props);
  const operatorToken = parseNodeToString(node.operatorToken, props);
  const right = parseNodeToString(node.right, props);

  // We need to rewrite things like dict.a = foo into dict['a'] = foo
  if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
    if (node.left.kind === ts.SyntaxKind.PropertyAccessExpression) {
      const leftPropAccess = node.left as ts.PropertyAccessExpression;
      const dictNode = leftPropAccess.expression;
      const dictNodeType = program.getTypeChecker().getTypeAtLocation(dictNode);
      const keyNode = leftPropAccess.name;

      if (isDictionary(dictNodeType)) {
        return `${parseNodeToString(dictNode, props)}["${keyNode.text}"] = ${right}`;
      }
    }
  }

  return `${left}${needsLeftHandSpace ? ' ' : ''}${operatorToken} ${right}`;
}
