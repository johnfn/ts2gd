import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseVariableStatement = (
  node: ts.VariableStatement,
  props: ParseState
): ParseNodeType => {
  const modifiers = node.modifiers?.map((x) => x.getText())

  // skip variable declarations; there's no code to generate here
  if (modifiers?.includes("declare")) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  }

  return combine({
    parent: node,
    nodes: node.declarationList,
    props,
    parsedStrings: (list) => list,
  })
}
