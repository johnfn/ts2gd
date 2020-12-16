import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseForStatement = (node: ts.ForStatement, props: ParseState): ParseNodeType => {
  props = { ...props, mostRecentControlStructureIsSwitch: false };

  return combine(node, [node.initializer, node.condition, node.statement, node.incrementor] as (ts.Node | undefined)[], props, (init, cond, statement, inc) =>
    `${init ? init : ""}
while ${cond || "true"}:
${statement}${inc ? props.indent + inc : ""}`
  );
}
