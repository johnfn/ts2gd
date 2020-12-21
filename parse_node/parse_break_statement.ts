import ts from "typescript";
import { combine, ParseState } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseBreakStatement = (node: ts.BreakStatement, props: ParseState): ParseNodeType => {
  if (props.mostRecentControlStructureIsSwitch) {
    return combine({
      parent: node,
      nodes: [],
      props,
      content: () => ""
    });
  } else {
    return combine({
      parent: node,
      nodes: [],
      props,
      content: () => `break`,
    });
  }
}