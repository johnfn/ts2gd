import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

export const parseNoSubstitutionTemplateLiteral = (
  node: ts.NoSubstitutionTemplateLiteral,
  props: ParseState
): ParseNodeType => {
  const sanitizeText = (text: string) => {
    return text.replaceAll("\n", "\\n")
  }

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => `"${sanitizeText(node.text)}"`,
  })
}

export const testSanitizeText: Test = {
  ts: `
let foo = \`
woo
\`
  `,
  expected: `
var _foo = "\\nwoo\\n"
`,
}
