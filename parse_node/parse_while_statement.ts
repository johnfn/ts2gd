import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseWhileStatement = (
  node: ts.WhileStatement,
  props: ParseState
): ParseNodeType => {
  const newProps = { ...props, mostRecentControlStructureIsSwitch: false }

  props.scope.enterScope()

  const result = combine({
    parent: node,
    nodes: [node.expression, node.statement],
    props: newProps,
    addIndent: true,
    content: (expr, statement) => `
while ${expr}:
  ${statement}
`,
  })

  props.scope.leaveScope()

  return result
}

export const testPassWhile: Test = {
  ts: `
while (true);
  `,
  expected: `
while true:
  pass
  `,
}
