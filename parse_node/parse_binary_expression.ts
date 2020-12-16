import ts from "typescript";
const { SyntaxKind } = ts;
import { program } from "../main";
import { ParseState, combine } from "../parse_node";
import { isDictionary } from "../ts_utils";

import { ParseNodeType } from "../parse_node"

export const parseBinaryExpression = (node: ts.BinaryExpression, props: ParseState): ParseNodeType => {
  const needsLeftHandSpace = node.operatorToken.kind !== SyntaxKind.CommaToken;

  // We need to rewrite things like dict.a = foo into dict['a'] = foo
  if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
    if (node.left.kind === ts.SyntaxKind.PropertyAccessExpression) {
      const leftPropAccess = node.left as ts.PropertyAccessExpression;
      const dictNode = leftPropAccess.expression;
      const dictNodeType = program.getTypeChecker().getTypeAtLocation(dictNode);
      const keyNode = leftPropAccess.name;

      if (isDictionary(dictNodeType)) {
        return combine(node, [dictNode, node.right], props, (dictNode, right) => `${dictNode}["${keyNode.text}"] = ${right}`)
      }
    }
  }

  return combine(node, [node.left, node.operatorToken, node.right], props, (left, operatorToken, right) =>
    `${left}${needsLeftHandSpace ? ' ' : ''}${operatorToken} ${right}`
  );
}
