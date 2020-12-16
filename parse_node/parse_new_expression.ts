import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseNewExpression = (node: ts.NewExpression, props: ParseState): ParseNodeType => {
  return combine(node, [node.expression, ...(node.arguments ?? [])], props, (expr, ...args) =>
    `${expr}(${args.join(', ')})`
  );
}
