import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseVariableDeclarationList = (
  node: ts.VariableDeclarationList,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.declarations,
    props,
    parsedStrings: (...decls) => decls.join("\n") + "\n",
  })
}

export const testVDL: Test = {
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


export const testVDL2: Test = {
  ts: `
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;
    this.print(1)
  }
}`,
expected: `
extends Area2D
class_name Test
func _ready():
  var _x: int = 1
  var _y: int = 2
  self.print(1)
`
}