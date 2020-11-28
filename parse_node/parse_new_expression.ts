import ts from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseNewExpression(node: ts.NewExpression, props: ParseState): string {
  if (props.isAutoload) {
    return parseNodeToString(node.expression, props);
  } else {
    throw new Error("unhandled NewExpression");
  }
}
