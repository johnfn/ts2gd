import ts from "typescript"
import { combine, ParseState } from "../parse_node"

import { ParseNodeType } from "../parse_node"
import { Test } from "../test"

export const parseContinueStatement = (
  node: ts.ContinueStatement,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [],
    props,
    content: () => `continue`,
  })
}

export const testContinue1: Test = {
  ts: `
for (let x = 0; x < 10; x++) {
  continue;
  print(x);
}
  `,
  expected: `
var x: int = 0
while x < 10:
  continue
  print(x)  
  ((x += 1) - 1)
  `,
}

export const testContinue2: Test = {
  ts: `
for (let x: int = 0; x < 10; x++) {
  if (x == (0 as int)) continue;
  print(x);
}
  `,
  expected: `
var x: int = 0
while x < 10:
  if x == 0:
    continue
  print(x)
  ((x += 1) - 1)
  `,
}
