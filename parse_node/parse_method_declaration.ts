import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

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
${isRemote ? "remote " : ""}${
        isRemoteSync ? "remotesync " : ""
      }func ${funcName}(${joinedParams}):
${body.trim() === "" ? "pass" : body}
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
func _process(_d: float):
  pass
  `,
}

export const testDefaultValue: Test = {
  ts: `
class Foo extends Node2D {
  testDefault(a = 1) { }
}
  `,
  expected: `
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]"):
  a = (1 if a == "[no value passed in]" else a)
  `,
}

export const testDefaultValues: Test = {
  ts: `
class Foo extends Node2D {
  testDefault(a = 1, b = 2) { 
    print("OK")
    print("OK")
  }
}
  `,
  expected: `
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]", b = "[no value passed in]"):
  a = (1 if a == "[no value passed in]" else a)
  b = (2 if b == "[no value passed in]" else b)
  print("OK")
  print("OK")
  `,
}

export const testDefaultValuesSelfReference: Test = {
  ts: `
class Foo extends Node2D {
  testDefault(a = 1, b: int = a) { 
  }
}
  `,
  expected: `
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]", b = "[no value passed in]"):
  a = (1 if a == "[no value passed in]" else a)
  b = (a if b == "[no value passed in]" else b)
  `,
}
