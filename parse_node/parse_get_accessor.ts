import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"

export const parseGetAccessor = (
  node: ts.GetAccessorDeclaration,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.name, node.body, ...node.parameters],
    addIndent: true,
    props,
    parsedStrings: (name, body, ...params) => `
func ${name}_get(${params.join(", ")}):
  ${body || "pass"}
`,
  })
}
