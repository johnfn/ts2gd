import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

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
    parsedObjs: (expression, thenStatement, elseStatement) => {
      const beforeLines =
        expression.extraLines?.filter((line) => line.type === "before") ?? []
      const afterLines =
        expression.extraLines?.filter((line) => line.type === "after") ?? []

      let thenBody =
        afterLines.map(({ line }) => "  " + line + "\n") +
        (thenStatement.content.trim() === ""
          ? ""
          : "  " + thenStatement.content)
      let elseBody =
        afterLines.map(({ line }) => "  " + line + "\n") +
        (elseStatement.content.trim() === ""
          ? ""
          : "  " + elseStatement.content)

      if (thenBody.trim() === "") {
        thenBody = "  pass"
      }

      return `
${beforeLines.map((line) => line.line).join("\n")}
if ${expression.content}:
${thenBody}
${
  elseBody.trim() === ""
    ? ""
    : `else:
${elseBody}
`
}`
    },
  })

  result.extraLines = []

  props.scope.leaveScope()

  return result
}
