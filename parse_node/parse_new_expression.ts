import ts from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";
import { parseArgumentList } from "./parse_argument_list";

export function parseNewExpression(node: ts.NewExpression, props: ParseState): string {
  return (
    `${parseNodeToString(node.expression, props)}(${parseArgumentList(node.arguments, props)})`
  )
}
