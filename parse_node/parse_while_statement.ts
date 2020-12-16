import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseWhileStatement = (node: ts.WhileStatement, props: ParseState): ParseNodeType => {
  const newProps = { ...props, mostRecentControlStructureIsSwitch: false };

  return combine(node, [node.expression, node.statement], newProps, (expr, statement) =>
    `while ${expr}:
${statement}`
  );
}
