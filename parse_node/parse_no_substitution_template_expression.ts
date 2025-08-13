import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

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
