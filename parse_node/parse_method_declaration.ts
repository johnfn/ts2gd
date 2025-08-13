import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

const specialMethods = [
  { name: "_process", args: "_delta: float" },
  { name: "_physics_process", args: "_delta: float" },
  { name: "_unhandled_input", args: "_event: InputEvent" },
  { name: "_unhandled_key_input", args: "_event: InputEventKey" },
]

export const parseMethodDeclaration = (
  node: ts.MethodDeclaration,
  props: ParseState
): ParseNodeType => {
  const funcName = node.name.getText()

  props.scope.enterScope()

  let isRemote = false
  let isRemoteSync = false
  let isStatic = node.modifiers?.some((v) => v.getText() === "static") ?? false

  for (const dec of node.decorators ?? []) {
    if (dec.expression.getText() === "remote") {
      isRemote = true
    }

    if (dec.expression.getText() === "remotesync") {
      isRemoteSync = true
    }
  }

  // Need to grab extra lines for default parameters
  const compiledParameters = combine({
    parent: node,
    nodes: node.parameters,
    props,
    parsedStrings: (...params) => params.join(", "),
  })

  let result = combine({
    parent: node,
    nodes: [node.body],
    props,
    addIndent: true,
    parsedStrings: (body) => {
      let joinedParams = compiledParameters.content

      const specialMethod = specialMethods.find(
        (method) => method.name === funcName
      )

      if (specialMethod && joinedParams.trim() === "") {
        joinedParams = specialMethod.args
      }

      let bodyLines = [
        ...(compiledParameters.extraLines?.map((param) => param.line) ?? []),
        ...(body.trim() === "" ? [] : [body]),
      ]

      if (bodyLines.length === 0) {
        bodyLines = ["pass"]
      }

      body = bodyLines.map((line) => "  " + line + "\n").join("")

      return `
${isRemote ? "remote " : ""}${isRemoteSync ? "remotesync " : ""}${
        isStatic ? "static " : ""
      }func ${funcName}(${joinedParams}):
${body.trim() === "" ? "pass" : body}
`
    },
  })

  props.scope.leaveScope()

  return result
}
