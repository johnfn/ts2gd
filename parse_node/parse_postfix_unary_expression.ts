import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState, parseNodeToString, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parsePostfixUnaryExpression = (node: ts.PostfixUnaryExpression, props: ParseState): ParseNodeType => {
  return combine(node, node.operand, props, (operand) => {
    switch (node.operator) {
      case SyntaxKind.PlusPlusToken:
        return `${operand}++`;
      case SyntaxKind.MinusMinusToken:
        return `${operand}--`;
    }
  })
}
