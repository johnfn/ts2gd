import ts from "typescript"
const { SyntaxKind } = ts
import { ParseState, parseNode, combine, ExtraLine } from "../parse_node"

import { ParseNodeType } from "../parse_node"
import { Test } from "../test"

export const parsePrefixUnaryExpression = (
  node: ts.PrefixUnaryExpression,
  props: ParseState
): ParseNodeType => {
  let newIncrements: ExtraLine | null = null

  const result = combine({
    parent: node,
    nodes: node.operand,
    props,
    content: (operand) => {
      switch (node.operator) {
        case SyntaxKind.PlusPlusToken: {
          newIncrements = {
            type: "before",
            line: `${operand} += 1`,
            isIncrement: true,
          }

          return `${operand}`
        }
        case SyntaxKind.MinusMinusToken: {
          newIncrements = {
            type: "before",
            line: `${operand} -= 1`,
            isDecrement: true,
          }

          return `${operand}`
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

export const testPreincrement1: Test = {
  ts: `
if (true) {
  ++x
  print(x)
}
  `,
  expected: `
if true:
  x += 1
  x
  print(x)
  `,
}

export const testPreincrement2: Test = {
  ts: `
if (true) {
  print(++x)
}
  `,
  expected: `
if true:
  x += 1
  print(x)
  `,
}

export const testPostincrement1: Test = {
  ts: `
if (true) {
  print(x++)
}
  `,
  expected: `
if true:
  print(x)
  x += 1
  `,
}
