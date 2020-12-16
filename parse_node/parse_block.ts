import ts from "typescript";
import { combine, ParseState } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseBlock = (node: ts.Block, props: ParseState): ParseNodeType => {
  if (node.statements.length !== 0) {
    return combine(node, node.statements, props, (...parsed) => parsed.join(""));
  } else {
    return combine(node, [], props, () => "pass\n");
  }
}