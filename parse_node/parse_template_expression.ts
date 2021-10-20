import ts from "typescript"

import { combine, ParseNodeType, ParseState } from "../parse_node"
import { Test } from "../tests/test"

export const parseTemplateExpression = (
  node: ts.TemplateExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.templateSpans.map((span) => span.expression),
    props,
    parsedStrings: (...exprs) => {
      let result = ""

      result += '"' + node.head.text + '"'

      for (let i = 0; i < exprs.length; i++) {
        result += ` + str(${exprs[i]})`
        result += ' + "' + node.templateSpans[i].literal.text + '"'
      }

      return result
    },
  })
}

export const testStringInterpolation: Test = {
  ts: `
let foo = \`blah \${ 10 }  \${ 20 }\`
  `,
  expected: `
var _foo = "blah " + str(10) + "  " + str(20) + ""
`,
}
