import ts from "typescript";
import { ParseState } from "../parse_node";

export function parseContinueStatement(node: ts.ContinueStatement, props: ParseState) {
  return `${props.indent}continue`;
}