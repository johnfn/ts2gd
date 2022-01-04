import ts from "typescript"

import { ParseNodeType, ParseState, combine, parseNode } from "../parse_node"
import { Test } from "../tests/test"

export const parseArrayLiteralExpression = (
  node: ts.ArrayLiteralExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.elements,
    props,
    parsedStrings: (...args) => `[${args.join(", ")}]`,
  })
}

// Tests

export const testArrayLiteral: Test = {
  ts: "[1, 2, 3]",
  expected: "[1, 2, 3]",
}

export const testEmptyArrayLiteral: Test = {
  ts: "[]",
  expected: "[]",
}
