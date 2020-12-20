import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseForStatement = (node: ts.ForStatement, props: ParseState): ParseNodeType => {
  props = { ...props, mostRecentControlStructureIsSwitch: false };

  return combine({
    parent: node,
    addIndent: true,
    nodes: ([node.initializer, node.condition, node.statement, node.incrementor] as (ts.Node | undefined)[]),
    props,
    content: (init, cond, statement, inc) => {
      let body = `${statement}\n  ${inc ? props.indent + inc : ""}`

      if (body.trim().length === 0) body = 'pass'

      return `
${init ? init : ""}
while ${cond || "true"}:
  ${body}`
    }
  });
}
