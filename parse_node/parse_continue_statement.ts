import ts from "typescript";
import { combine, ParseState } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseContinueStatement = (node: ts.ContinueStatement, props: ParseState): ParseNodeType => {
  return combine(node, [], props, () => `continue`);
}