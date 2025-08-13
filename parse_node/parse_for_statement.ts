import ts from "typescript"

import {
  ExtraLineType,
  ParseState,
  combine,
  ParseNodeType,
} from "../parse_node"

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
      ?.filter(
        (line) =>
          line.lineType === ExtraLineType.Decrement ||
          line.lineType === ExtraLineType.Increment
      )
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
