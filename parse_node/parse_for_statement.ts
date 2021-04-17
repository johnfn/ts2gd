import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseForStatement = (
  node: ts.ForStatement,
  props: ParseState
): ParseNodeType => {
  props = { ...props, mostRecentControlStructureIsSwitch: false }

  // Add initializer to current scope BEFORE entering new scope
  let initializer = combine({
    parent: node,
    nodes: node.initializer,
    props,
    parsedStrings: (init) => init,
  }).content

  props.scope.enterScope()

  const increment = combine({
    parent: node,
    addIndent: true,
    nodes: [node.incrementor],
    props,
    parsedStrings: (inc) => inc,
  })

  let incrementText =
    increment.extraLines
      ?.filter((line) => line.isDecrement || line.isIncrement)
      .map((line) => line.line) ?? []

  props.mostRecentForStatement = {
    incrementor: incrementText.join("\n"),
  }

  const result = combine({
    parent: node,
    addIndent: true,
    nodes: [node.condition, node.statement],
    props,
    parsedStrings: (cond, statement) => {
      if (
        statement.trim().length === 0 &&
        increment.content.trim().length === 0
      ) {
        statement = "pass"
      }

      return `
${initializer || ""}
while ${cond || "true"}:
  ${statement}
  ${incrementText}
`
    },
  })

  props.scope.leaveScope()

  return result
}

export const testMultipleSameNameVars: Test = {
  ts: `

for (let i = 0; i < 6; ++i) {
  print(i)
}
for (let i = 0; i < 5; ++i) {
  print(i)
}
for (let i = 0; i < 5; ++i) {
  print(i)
}
  `,
  expected: `
var i: int = 0
while i < 6:
  print(i)
  i += 1
var i1: int = 0
while i1 < 5:
  print(i1)
  i1 += 1
var i2: int = 0
while i2 < 5:
  print(i2)
  i2 += 1
  `,
}

export const testPass2: Test = {
  ts: `
for (let x = 0; x < 10; );
  `,
  expected: `
var x: int = 0
while x < 10:
  pass
  `,
}
