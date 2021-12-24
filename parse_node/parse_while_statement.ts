import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
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
    parsedObjs: (expr, statement) => {
      const beforeLines =
        expr.extraLines
          ?.filter((line) => line.type === "before")
          .map((e) => e.line)
          .join("\n") ?? ""
      const afterLines =
        expr.extraLines
          ?.filter((line) => line.type === "after")
          .map((e) => e.line)
          .join("\n") ?? ""

      return `${beforeLines}
while ${expr.content}:
  ${afterLines}
  ${statement.content}
  ${beforeLines}
`
    },
  })

  result.extraLines = []

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

export const testWhileConditionPostIncrement: Test = {
  ts: `
let x = 0
while (x++ < 10) {
  print(x)
}
  `,
  expected: `
var x: int = 0
while x < 10:
  x += 1
  print(x)
`,
}

export const testWhileConditionPass: Test = {
  ts: `
let x = 0
while (x++ < 10) { }
  `,
  expected: `
var x: int = 0
while x < 10:
  x += 1
`,
}

export const testWhileConditionPreIncrement: Test = {
  ts: `
let x = 0
while (++x < 10) {
  print(x)
}
  `,
  expected: `
var x: int = 0
x += 1
while x < 10:
  print(x)
  x += 1
`,
}
