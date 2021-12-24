import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

// This is something like "type Blah = ...". There is nothing to do here.
export const parseTypeAliasDeclaration = (
  node: ts.TypeAliasDeclaration,
  props: ParseState
): ParseNodeType => {
  return combine({ parent: node, nodes: [], props, parsedStrings: () => "" })
}
