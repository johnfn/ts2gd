import ts, { SyntaxKind } from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseForInStatement = (
  node: ts.ForInStatement,
  props: ParseState
): ParseNodeType => {
  let result: ParseNodeType

  props.scope.enterScope()

  if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
    const vdl = node.initializer as ts.VariableDeclarationList

    if (vdl.declarations.length > 1 || vdl.declarations.length === 0) {
      throw new Error("non-1 length of declarations in for...in")
    }

    result = combine({
      parent: node,
      nodes: [vdl.declarations[0].name, node.expression, node.statement],
      props,
      addIndent: true,
      parsedStrings: (name, expr, statement) => `
for ${name} in ${expr}:
  ${statement}
`,
    })
  } else {
    const initExpr = node.initializer as ts.Expression

    result = combine({
      parent: node,
      nodes: [initExpr, node.expression, node.statement],
      props,
      addIndent: true,
      parsedStrings: (initExpr, expr, statement) => `
for ${initExpr} in ${expr}:
  ${statement}
`,
    })
  }

  props.scope.leaveScope()

  return result
}

export const testForIn1: Test = {
  ts: `
for (let x in []);
  `,
  expected: `
for x in []:
  pass
  `,
}

export const testForIn2: Test = {
  ts: `
let x: never;
for (x in []);
  `,
  expected: `
var x
for x in []:
  pass
  `,
}
