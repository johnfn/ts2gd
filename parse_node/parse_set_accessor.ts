import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseSetAccessor = (
  node: ts.SetAccessorDeclaration,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.name, node.body, ...node.parameters],
    props,
    addIndent: true,
    parsedStrings: (name, body, ...params) =>
      `
func ${name}_set(${params.join(", ")}):
  ${body || "pass"}
`,
  })
}
