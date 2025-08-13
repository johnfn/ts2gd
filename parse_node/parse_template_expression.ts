import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseTemplateExpression = (
  node: ts.TemplateExpression,
  props: ParseState
): ParseNodeType => {
  const sanitizeText = (text: string) => {
    return text.replaceAll("\n", "\\n")
  }

  return combine({
    parent: node,
    nodes: node.templateSpans.map((span) => span.expression),
    props,
    parsedStrings: (...exprs) => {
      let result = ""

      result += '"' + sanitizeText(node.head.text) + '"'

      for (let i = 0; i < exprs.length; i++) {
        result += ` + str(${exprs[i]})`
        result +=
          ' + "' + sanitizeText(node.templateSpans[i].literal.text) + '"'
      }

      return result
    },
  })
}
