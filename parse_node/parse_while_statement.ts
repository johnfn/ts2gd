import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

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
