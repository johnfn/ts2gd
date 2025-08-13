import ts from "typescript"

import {
  ExtraLine,
  ExtraLineType,
  ParseState,
  combine,
  parseNode,
  ParseNodeType,
} from "../parse_node"
const { SyntaxKind } = ts

export const parsePrefixUnaryExpression = (
  node: ts.PrefixUnaryExpression,
  props: ParseState
): ParseNodeType => {
  let newIncrements: ExtraLine | null = null

  const result = combine({
    parent: node,
    nodes: node.operand,
    props,
    parsedStrings: (operand) => {
      switch (node.operator) {
        case SyntaxKind.PlusPlusToken: {
          newIncrements = {
            type: "before",
            line: `${operand} += 1`,
            lineType: ExtraLineType.Increment,
          }

          return node.parent.kind === SyntaxKind.ExpressionStatement
            ? ""
            : operand
        }
        case SyntaxKind.MinusMinusToken: {
          newIncrements = {
            type: "before",
            line: `${operand} -= 1`,
            lineType: ExtraLineType.Decrement,
          }

          return node.parent.kind === SyntaxKind.ExpressionStatement
            ? ""
            : operand
        }
        case SyntaxKind.PlusToken:
          return `+${operand}`
        case SyntaxKind.MinusToken:
          return `-${operand}`
        case SyntaxKind.TildeToken:
          // TODO: Error?
          return `~${operand}`
        case SyntaxKind.ExclamationToken:
          return `not ${operand}`
      }
    },
  })

  result.extraLines = [
    ...(newIncrements ? [newIncrements] : []),
    ...(result.extraLines ?? []),
  ]

  return result
}

// TODO: for loops
// TODO: indents
