import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState, parseNodeToString } from "../parse_node";

export function parsePrefixUnaryExpression(node: ts.PrefixUnaryExpression, props: ParseState): string {
  const operand = parseNodeToString(node.operand, props);

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
