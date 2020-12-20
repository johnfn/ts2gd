import ts, { SyntaxKind } from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseEmptyStatement = (node: ts.EmptyStatement, props: ParseState): ParseNodeType => {
  // TODO - are there others?
  // TODO - this isn't accurate for things like for(;;) { stuff() } where no pass is necessary.
  if (
    node.parent.kind === SyntaxKind.WhileStatement ||
    node.parent.kind === SyntaxKind.ForInStatement ||
    node.parent.kind === SyntaxKind.ForOfStatement ||
    // Exclude for statement on purpose because we always add in the increment. Well, almost always...!
    // node.parent.kind === SyntaxKind.ForStatement ||
    node.parent.kind === SyntaxKind.DoStatement
  ) {
    return combine({
      parent: node,
      nodes: [],
      content: () => "pass",
      props,
    });
  } else {
    return combine({
      parent: node,
      nodes: [],
      content: () => "",
      props,
    });
  }
}


export const testPass1: Test = {
  ts: `
for (let x = 0; x < 10; x++);
  `,
  expected: `
var x: int = 0
while x < 10:
  x++
  `,
};

export const testPass2: Test = {
  ts: `
for (let x = 0; x < 10; );
  `,
  expected: `
var x: int = 0
while x < 10:
  pass
  `,
};

export const testPassWhile: Test = {
  ts: `
while (true);
  `,
  expected: `
while true:
  pass
  `,
};

export const testPassForIn: Test = {
  ts: `
for (let x in {});
  `,
  expected: `
for x in {}:
  pass
`,
};

// export const testPassDoWhile: Test = {
//   ts: `
// do {

// } while(true);
//   `,
//   expected: `
// for x in {}:
//   pass
// `,
// };
