import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseWhileStatement = (node: ts.WhileStatement, props: ParseState): ParseNodeType => {
  const newProps = { ...props, mostRecentControlStructureIsSwitch: false };

  return combine({
    parent: node,
    nodes: [node.expression, node.statement],
    props: newProps,
    addIndent: true,
    content: (expr, statement) => `
while ${expr}:
  ${statement}
` });
}
