import ts from "typescript"
import { combine, ParseState } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseConditionalExpression = (
  node: ts.ConditionalExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.condition, node.whenTrue, node.whenFalse],
    props,
    parsedStrings: (cond, true_, false_) => {
      return `${true_} if ${cond} else ${false_}`
    },
  })
}

export const testConditionalExpression: Test = {
  expectFail: true,
  ts: `const x = true ? 1 : 2`,
  expected: `var _x = 1 if true else 2`,
}
