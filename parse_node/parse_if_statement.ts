import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseIfStatement = (
  node: ts.IfStatement,
  props: ParseState
): ParseNodeType => {
  props.scope.enterScope()

  let result = combine({
    addIndent: true,
    parent: node,
    nodes: [node.expression, node.thenStatement, node.elseStatement],
    props,
    content: (expression, thenStatement, elseStatement) => `
if ${expression}:
  ${thenStatement}${
      elseStatement
        ? `else:
  ${elseStatement}`
        : ""
    }`,
  })

  props.scope.leaveScope()

  return result
}

export const testIf: Test = {
  ts: `
if (true) {
  print(1)
} else {
  print(0)
}
  `,
  expected: `
if true:
  print(1)
else:
  print(0)
  `,
}

export const testElseIf: Test = {
  ts: `
if (true) {
  print(1)
} else if ('maybe') {
  print(2)
} else {
  print(0)
}
  `,
  expected: `
if true:
  print(1)
else:
  if "maybe":
    print(2)
  else:
    print(0)
  `,
}
