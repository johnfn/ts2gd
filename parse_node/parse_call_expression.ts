import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";

export function parseCallExpression(node: ts.CallExpression, props: ParseState) {
  // TODO: Work out a better way to determine if something is a call expression
  if (node.expression.getText() === "super") {
    return "";
  }

  return `${parseNodeToString(node.expression, props)}(${node.arguments.map(arg => parseNodeToString(arg, props)).join(", ")})`
}