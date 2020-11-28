import ts from "typescript";
import { ParseState } from "../parse_node";

export function parseBreakStatement(node: ts.BreakStatement, props: ParseState) {
  if (props.mostRecentControlStructureIsSwitch) {
    return '';
  } else {
    return `${props.indent}break`;
  }
}