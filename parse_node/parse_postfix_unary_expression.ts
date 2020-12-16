import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parsePostfixUnaryExpression = (node: ts.PostfixUnaryExpression, props: ParseState): ParseNodeType => {
  return combine({
    parent: node, nodes: node.operand, props, content: (operand) => {
      switch (node.operator) {
        case SyntaxKind.PlusPlusToken:
          return `${operand}++`;
        case SyntaxKind.MinusMinusToken:
          return `${operand}--`;
      }
    }
  })
}
