import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseVariableDeclarationList = (
  node: ts.VariableDeclarationList,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.declarations,
    props,
    parsedStrings: (...decls) => decls.join("\n") + "\n",
  })
}
