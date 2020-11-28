import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";

export function parseBlock(node: ts.Block, props: ParseState) {
  if (node.statements.length !== 0) {
    return node.statements.map(statement => parseNodeToString(statement, props)).filter(x => x.trim() !== "").join('');
  } else {
    return props.indent + "pass\n"
  }
}