import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseYieldExpression = (
  node: ts.YieldExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => {
      if (expr.includes(".$")) {
        return "yield(" + expr.replace(".$", ', "') + '")'
      } else {
        return `yield ${expr}`
      }
    },
  })
}

export const testYieldSignal: Test = {
  ts: `
export default class Test {
  *test(): void {
    yield this.get_tree().$idle_frame
  }
}
  `,
  expected: `
class_name Test
func test():
  yield(self.get_tree(), "idle_frame")
`,
}

export const testYieldSignal2: Test = {
  ts: `
export default class Test {
  $mysignal: Signal
  *test(): void {
    yield this.$mysignal
  }
}
  `,
  expected: `
class_name Test
signal mysignal
func test():
  yield(self, "mysignal")
`,
}
