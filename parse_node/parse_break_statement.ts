import ts from "typescript"
import { combine, ParseState } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../test"

export const parseBreakStatement = (
  node: ts.BreakStatement,
  props: ParseState
): ParseNodeType => {
  if (props.mostRecentControlStructureIsSwitch) {
    return combine({
      parent: node,
      nodes: [],
      props,
      content: () => "",
    })
  } else {
    return combine({
      parent: node,
      nodes: [],
      props,
      content: () => `
${props.mostRecentForStatement?.incrementor ?? ""}
break
`,
    })
  }
}

export const testBreak1: Test = {
  ts: `
for (let x = 0; x < 10; x++) {
  break;
  print(x);
}
  `,
  expected: `
var x: int = 0
while x < 10:
  ((x += 1) - 1)
  break
  print(x)  
  ((x += 1) - 1)
  `,
}

export const testBreak2: Test = {
  ts: `
for (let x: int = 0; x < 10; x++) {
  if (x == (0 as int)) break;
  print(x);
}
  `,
  expected: `
var x: int = 0
while x < 10:
  if x == 0:
    ((x += 1) - 1)
    break
  print(x)
  ((x += 1) - 1)
  `,
}
