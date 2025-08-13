import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"

export const parseContinueStatement = (
  node: ts.ContinueStatement,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => `
${props.mostRecentForStatement?.incrementor ?? ""}
continue
`,
  })
}
