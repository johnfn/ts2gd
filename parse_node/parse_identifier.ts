import ts from "typescript"

import { combine, ParseNodeType, ParseState } from "../parse_node"
import { Test } from "../test"

export const parseIdentifier = (
  node: ts.Identifier,
  props: ParseState
): ParseNodeType => {
  const name = node.text

  if (name === "undefined") {
    return combine({
      parent: node,
      nodes: [],
      props,
      content: () => "null",
    })
  }

  return combine({
    parent: node,
    nodes: [],
    props,
    content: () => {
      const name = props.scope.getName(node)
      console.log(name)

      if (!name) {
        return node.text
      }

      return name
    },
  })
}

export const testUndefined: Test = {
  ts: `
let x = undefined
  `,
  expected: `
var _x = null
  `,
}
