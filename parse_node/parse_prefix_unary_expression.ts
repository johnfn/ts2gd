import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState, parseNode, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parsePrefixUnaryExpression = (node: ts.PrefixUnaryExpression, props: ParseState): ParseNodeType => {
  return combine({
    parent: node, nodes: node.operand, props, content: (operand) => {
      switch (node.operator) {
        case SyntaxKind.PlusPlusToken:
          return `++${operand}`;
        case SyntaxKind.MinusMinusToken:
          return `--${operand}`;
        case SyntaxKind.PlusToken:
          return `+${operand}`;
        case SyntaxKind.MinusToken:
          return `-${operand}`;
        case SyntaxKind.TildeToken:
          // TODO: Error?
          return `~${operand}`;
        case SyntaxKind.ExclamationToken:
          return `not ${operand}`;
      }
    }
  });
}
