import ts, { SyntaxKind } from "typescript"
import { ParseState, combine } from "../parse_node"

import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseParenthesizedExpression = (
  node: ts.ParenthesizedExpression,
  props: ParseState
): ParseNodeType => {
  if (node.expression.kind === SyntaxKind.AsExpression) {
    return combine({
      parent: node,
      nodes: node.expression,
      props,
      content: (expr) => `${expr}`,
    })
  }

  return combine({
    parent: node,
    nodes: node.expression,
    props,
    content: (expr) => `(${expr})`,
  })
}

// Specifically, (my_function)() is invalid Godot syntax.
export const testNoParensThisCausesAGodotBug: Test = {
  ts: `
(foo as any)()
  `,
  expected: `
foo()
  `,
}
