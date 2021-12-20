import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

export const parseTypeofExpression = (
  node: ts.TypeOfExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => {
      return `${expr}.get_class()`
    },
  })
}

export const testTypeofExpression: Test = {
  ts: `
let x = new Vector2(1, 1);
print(typeof x);
  `,
  expected: `
var x = Vector2(1, 1)
print(x.get_class())
  `,
}
