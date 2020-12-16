import ts from "typescript";
import { ParseState, parseNodeToString, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseArrayLiteralExpression = (node: ts.ArrayLiteralExpression, props: ParseState): ParseNodeType => {
  return combine(node, node.elements, props, (...args) => `[${args.join(", ")}]`);
}
