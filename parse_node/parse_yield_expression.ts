import ts from "typescript";
import { program } from "../main";
import { parseNodeToString, ParseState } from "../parse_node";
import { tsTypeToGodotType } from "../ts_utils";

export function parseYieldExpression(node: ts.YieldExpression, props: ParseState) {
  if (node.expression) {
    return `yield ${parseNodeToString(node.expression, props)}`;
  } else {
    // TODO: throw some sort of error - this is a syntax error!

    return 'yield';
  }
}