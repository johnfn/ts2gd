import ts, { SyntaxKind } from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseEmptyStatement = (node: ts.EmptyStatement, props: ParseState): ParseNodeType => {
  // TODO - are there others?
  // TODO - this isn't accurate for things like for(;;) { stuff() } where no pass is necessary.
  if (
    node.parent.kind === SyntaxKind.WhileStatement ||
    node.parent.kind === SyntaxKind.ForInStatement ||
    node.parent.kind === SyntaxKind.ForOfStatement ||
    node.parent.kind === SyntaxKind.ForStatement ||
    node.parent.kind === SyntaxKind.DoStatement
  ) {
    return combine({
      parent: node,
      nodes: [],
      content: () => "pass",
      props,
    });
  } else {
    return combine({
      parent: node,
      nodes: [],
      content: () => "",
      props,
    });
  }
}
