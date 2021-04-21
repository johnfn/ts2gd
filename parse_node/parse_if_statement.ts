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
    parsedObjs: (expression, thenStatement, elseStatement) => {
      const beforeLines =
        expression.extraLines?.filter((line) => line.type === "before") ?? []
      const afterLines =
        expression.extraLines?.filter((line) => line.type === "after") ?? []

      return `
${beforeLines.map((line) => line.line).join("\n")}
if ${expression.content}:
  ${afterLines.map((line) => line.line).join("\n")}
  ${thenStatement.content}${
        elseStatement.content
          ? `else:
  ${afterLines.map((line) => line.line).join("\n")}
  ${elseStatement.content}`
          : ""
      }`
    },
  })

  result.extraLines = []

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

export const testIfPreInc1: Test = {
  ts: `
if (++x) {
  print(1)
} else {
  print(0)
}
  `,
  expected: `
x += 1
if x:
  print(1)
else:
  print(0)
  `,
}

export const testIfPreInc2: Test = {
  ts: `
if (x) {
  print(++x)
} else {
  print(++x)
}
  `,
  expected: `
if x:
  x += 1
  print(x)
else:
  x += 1
  print(x)
  `,
}

export const testIfPostInc1: Test = {
  ts: `
if (x++) {
  print(1)
} else {
  print(0)
}
  `,
  expected: `
if x:
  x += 1
  print(1)
else:
  x += 1
  print(0)
  `,
}

export const testIfPostInc2: Test = {
  ts: `
if (x) {
  print(x++)
} else {
  print(x++)
}
  `,
  expected: `
if x:
  print(x)
  x += 1
else:
  print(x)
  x += 1
  `,
}
