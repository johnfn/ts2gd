import ts, { SyntaxKind } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parsePostfixUnaryExpression(node: ts.PostfixUnaryExpression, props: ParseState): string {
  const operand = parseNodeToString(node.operand, props);

  switch (node.operator) {
    case SyntaxKind.PlusPlusToken:
      return `${operand}++`;
    case SyntaxKind.MinusMinusToken:
      return `${operand}--`;
  }
}
