import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseBreakStatement = (
  node: ts.BreakStatement,
  props: ParseState
): ParseNodeType => {
  if (props.mostRecentControlStructureIsSwitch) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  } else {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => `
${props.mostRecentForStatement?.incrementor ?? ""}
break
`,
    })
  }
}
