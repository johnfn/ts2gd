import ts from "typescript"

import { combine, ParseNodeType, ParseState } from "../parse_node"
import { Test } from "../tests/test"

export const parseStringLiteral = (
  node: ts.StringLiteral,
  props: ParseState
): ParseNodeType => {
  let text = node.text

  // TODO: I'm sure there's a better way to do this.
  text = text.replaceAll("\n", "\\n")

  return combine({
    parent: node,
    nodes: [],
    props,
    content: () => `"${text}"`,
  })
}

export const testNewlineLiteral: Test = {
  ts: `
let d = "\\n"
  `,
  expected: `
var _d = "\\n"
`,
}
