import ts from "typescript"

import {
  ExtraLine,
  ExtraLineType,
  ParseState,
  combine,
  ParseNodeType,
} from "../parse_node"
import { syntaxKindToString } from "../ts_utils"
const { SyntaxKind } = ts

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
        case SyntaxKind.PlusPlusToken:
          newIncrements = {
            type: "after",
            line: `${operand} += 1`,
            lineType: ExtraLineType.Increment,
          }
          break

        case SyntaxKind.MinusMinusToken:
          newIncrements = {
            type: "after",
            line: `${operand} -= 1`,
            lineType: ExtraLineType.Decrement,
          }
          break
      }

      if (node.parent.kind === SyntaxKind.ExpressionStatement) {
        return ""
      } else {
        return `${operand}`
      }
    },
  })

  result.extraLines = [
    ...(newIncrements ? [newIncrements] : []),
    ...(result.extraLines ?? []),
  ]

  return result
}
