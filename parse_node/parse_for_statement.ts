import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseForStatement = (node: ts.ForStatement, props: ParseState): ParseNodeType => {
  props = { ...props, mostRecentControlStructureIsSwitch: false };

  // TODO: Does this even work? Lol
  return combine({
    parent: node,
    addIndent: true,
    nodes: ([node.initializer, node.condition, node.statement, node.incrementor] as (ts.Node | undefined)[]),
    props,
    content: (init, cond, statement, inc) => `
${init ? init : ""}
while ${cond || "true"}:
  ${statement}
  ${inc ? props.indent + inc : ""}`
  });
}
