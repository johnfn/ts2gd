import ts from "typescript";
import { ParseState, parseNodeToString, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseArrayLiteralExpression = (node: ts.ArrayLiteralExpression, props: ParseState): ParseNodeType => {
  return combine({ parent: node, nodes: node.elements, props, content: (...args) => `[${args.join(", ")}]` });
}
