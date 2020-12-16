import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseIfStatement = (node: ts.IfStatement, props: ParseState): ParseNodeType => {
  return combine(node, [node.expression, node.thenStatement, node.elseStatement], props, (expression, thenStatement, elseStatement) =>
    `if ${expression}: ${thenStatement}${elseStatement ? `${props.indent}else: ${elseStatement}` : ''}`
  );
}
