import ts from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseNewExpression = (
  node: ts.NewExpression,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.expression, ...(node.arguments ?? [])],
    props,
    parsedStrings: (expr, ...args) => {
      if (
        expr === "Vector2" ||
        expr === "Vector3" ||
        expr === "Color" ||
        expr === "Vector2i" ||
        expr === "Vector3i" ||
        expr === "Rect2"
      ) {
        // Special cases that do not require .new
        return `${expr}(${args.join(", ")})`
      }

      return `${expr}.new(${args.join(", ")})`
    },
  })
}

export const testNormalNew: Test = {
  ts: `
let foo = new Node2D()
  `,
  expected: `
var _foo = Node2D.new()
  `,
}

export const testVectorNoNew: Test = {
  ts: `
let foo = new Vector2()
  `,
  expected: `
var _foo = Vector2()
  `,
}

export const testColorNoNew: Test = {
  ts: `
let foo = new Color()
  `,
  expected: `
var _foo = Color()
  `,
}
