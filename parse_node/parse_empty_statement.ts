import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseEmptyStatement = (
  node: ts.EmptyStatement,
  props: ParseState
): ParseNodeType => {
  if (
    node.parent.kind === SyntaxKind.WhileStatement ||
    node.parent.kind === SyntaxKind.ForInStatement ||
    node.parent.kind === SyntaxKind.ForOfStatement ||
    // Exclude for statement on purpose because we always add in the increment. Well, almost always...!
    // node.parent.kind === SyntaxKind.ForStatement ||
    node.parent.kind === SyntaxKind.DoStatement
  ) {
    return combine({
      parent: node,
      nodes: [],
      parsedStrings: () => "pass",
      props,
    })
  }

  return combine({
    parent: node,
    nodes: [],
    parsedStrings: () => "",
    props,
  })
}
