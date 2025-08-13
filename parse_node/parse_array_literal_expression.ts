import ts from "typescript"

import { ParseNodeType, ParseState, combine, parseNode } from "../parse_node"

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
