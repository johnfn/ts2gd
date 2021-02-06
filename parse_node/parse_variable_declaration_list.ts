import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../test"

export const parseVariableDeclarationList = (
  node: ts.VariableDeclarationList,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.declarations,
    props,
    content: (...decls) => decls.join("\n"),
  })
}

export const testKeyword: Test = {
  ts: `
let a = 1, b = 2
print(a)
print(b)
  `,
  expected: `
var a: int = 1
var b: int = 2
print(a)
print(b)
  `,
}
