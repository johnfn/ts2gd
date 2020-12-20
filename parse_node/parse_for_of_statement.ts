import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseForOfStatement = (node: ts.ForOfStatement, props: ParseState): ParseNodeType => {
  const initializer = node.initializer;

  if (initializer.kind === SyntaxKind.VariableDeclarationList) {
    const initializerNode = initializer as ts.VariableDeclarationList;
    const decl = initializerNode.declarations[0];

    if (initializerNode.declarations.length > 1) {
      // TODO: Handle this case... and clean up the other code
      throw new Error("Uh oh! For...of with > 1 declaration");
    }

    const usages = props.usages.get(decl.name as ts.Identifier);
    const isUnused = usages?.uses.length === 0;

    return combine({
      parent: node,
      nodes: [node.expression, node.statement],
      props,
      addIndent: true,
      content: (expr, statement) => `
for ${isUnused ? "_" : ""}${decl.name.getText()} in ${expr}:
  ${statement}
` });
  } else {
    const initializedVariable = node.initializer.getChildAt(1);

    return combine({
      parent: node,
      nodes: [node.expression, node.statement],
      props,
      addIndent: true,
      content: (expr, statement) => `
for ${initializedVariable.getText()} in ${expr}:
  ${statement}
` });
  }
}

export const testPass1: Test = {
  ts: `
for (let x of []) print(1)
  `,
  expected: `
for _x in []:
  print(1)
  `,
};