import ts from "typescript"
const { SyntaxKind } = ts
import { ParseState, parseNode, combine } from "../parse_node"

import { ParseNodeType } from "../parse_node"
import { Test } from "../test"

export const parsePrefixUnaryExpression = (
  node: ts.PrefixUnaryExpression,
  props: ParseState
): ParseNodeType => {
  let newIncrements: {
    type: "preincrement" | "predecrement"
    variable: string
  } | null = null

  const result = combine({
    parent: node,
    nodes: node.operand,
    props,
    content: (operand) => {
      switch (node.operator) {
        case SyntaxKind.PlusPlusToken: {
          newIncrements = { type: "preincrement", variable: operand }

          return `${operand}`
        }
        case SyntaxKind.MinusMinusToken: {
          newIncrements = { type: "predecrement", variable: operand }

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

  result.incrementState = [
    ...(newIncrements ? [newIncrements] : []),
    ...(result.incrementState ?? []),
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
