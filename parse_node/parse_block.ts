import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";
import { generatePrecedingNewlines } from "../ts_utils";

export function parseBlock(node: ts.Block, props: ParseState) {
  let result = "";

  if (node.statements.length !== 0) {
    for (const statement of node.statements) {
      result += generatePrecedingNewlines(statement);
      result += parseNodeToString(statement, props);
    }
  } else {
    result = props.indent + "pass\n"
  }

  return result;
}