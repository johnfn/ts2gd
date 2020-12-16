import ts from "typescript";
import { combine, parseNodeToString, ParseState } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseYieldExpression = (node: ts.YieldExpression, props: ParseState): ParseNodeType => {
  return combine(node, node.expression, props, (expr) => `yield ${expr}`)
}