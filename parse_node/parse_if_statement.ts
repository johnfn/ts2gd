import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseIfStatement = (node: ts.IfStatement, props: ParseState): ParseNodeType => {
  return combine({
    addIndent: true,
    parent: node, nodes: [node.expression, node.thenStatement, node.elseStatement],
    props,
    content: (expression, thenStatement, elseStatement) => `
if ${expression}: 
  ${thenStatement}${elseStatement ? `
else:
  ${elseStatement}` : ''}`
  });
}
