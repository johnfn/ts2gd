import ts from "typescript"
const { SyntaxKind } = ts
import { ParseState, combine } from "../parse_node"

import { ParseNodeType } from "../parse_node"

export const parsePostfixUnaryExpression = (
  node: ts.PostfixUnaryExpression,
  props: ParseState
): ParseNodeType => {
  let newIncrements: {
    type: "postincrement" | "postdecrement"
    variable: string
  } | null = null

  const result = combine({
    parent: node,
    nodes: node.operand,
    props,
    content: (operand) => {
      switch (node.operator) {
        case SyntaxKind.PlusPlusToken: {
          newIncrements = { type: "postincrement", variable: operand }

          return `${operand}`
        }
        case SyntaxKind.MinusMinusToken: {
          newIncrements = { type: "postdecrement", variable: operand }

          return `${operand}`
        }
      }
    },
  })

  result.incrementState = [
    ...(newIncrements ? [newIncrements] : []),
    ...(result.incrementState ?? []),
  ]

  return result
}
