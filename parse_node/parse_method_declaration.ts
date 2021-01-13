import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../test"

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

  let result = combine({
    parent: node,
    nodes: [node.body, ...node.parameters],
    props: props,
    addIndent: true,
    content: (body, ...params) => {
      let joinedParams = params.join(", ")

      const specialMethod = specialMethods.find(
        (method) => method.name === funcName
      )

      if (specialMethod && joinedParams.trim() === "") {
        joinedParams = specialMethod.args
      }

      return `
func ${funcName}(${joinedParams}):
  ${body || " pass"}
`
    },
  })

  props.scope.leaveScope()

  return result
}

export const testProcessGetsArgsAdded: Test = {
  ts: `
class Foo extends Node2D {
  _process() {}
}
  `,
  expected: `
extends Node2D
class_name Foo
func _process(_delta: float):
  pass
  `,
}

export const testProcessDoesntGetArgsAdded: Test = {
  ts: `
class Foo extends Node2D {
  _process(d: float) {}
}
  `,
  expected: `
extends Node2D
class_name Foo
func _process(_d):
  pass
  `,
}
