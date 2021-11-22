import ts from "typescript"
const { SyntaxKind } = ts
import { ParseState, combine, ExtraLine, ExtraLineType } from "../parse_node"

import { ParseNodeType } from "../parse_node"

export const parsePostfixUnaryExpression = (
  node: ts.PostfixUnaryExpression,
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
            type: "after",
            line: `${operand} += 1`,
            lineType: ExtraLineType.Increment,
          }

          return `${operand}`
        }
        case SyntaxKind.MinusMinusToken: {
          newIncrements = {
            type: "after",
            line: `${operand} -= 1`,
            lineType: ExtraLineType.Decrement,
          }

          return `${operand}`
        }
      }
    },
  })

  result.extraLines = [
    ...(newIncrements ? [newIncrements] : []),
    ...(result.extraLines ?? []),
  ]

  return result
}
