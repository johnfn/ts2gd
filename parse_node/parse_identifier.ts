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
    content: () => node.text,
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
