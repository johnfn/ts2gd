import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";

export function parseReturnStatement(node: ts.ReturnStatement, props: ParseState) {
  if (node.expression) {
    return `${props.indent}return ${parseNodeToString(node.expression, props)}`;
  } else {
    return `${props.indent}return`;
  }
}