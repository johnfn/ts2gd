import ts from "typescript";
import { combine, ParseState } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseBreakStatement = (node: ts.BreakStatement, props: ParseState): ParseNodeType => {
  if (props.mostRecentControlStructureIsSwitch) {
    return combine(node, [], props, () => "");
  } else {
    return combine(node, [], props, () => `break`);
  }
}