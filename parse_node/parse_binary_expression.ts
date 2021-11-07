import ts, { SyntaxKind } from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseBinaryExpression = (
  node: ts.BinaryExpression,
  props: ParseState
): ParseNodeType => {
  const needsLeftHandSpace = node.operatorToken.kind !== SyntaxKind.CommaToken

  // We need to rewrite things like dict.a = foo into dict['a'] = foo
  // if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
  //   if (node.left.kind === ts.SyntaxKind.PropertyAccessExpression) {
  //     const leftPropAccess = node.left as ts.PropertyAccessExpression;
  //     const dictNode = leftPropAccess.expression;
  //     const dictNodeType = props.program.getTypeChecker().getTypeAtLocation(dictNode);
  //     const keyNode = leftPropAccess.name;

  //     if (isDictionary(dictNodeType)) {
  //       return combine({
  //         parent: node,
  //         nodes: [dictNode, node.right],
  //         props,
  //         content: (dictNode, right) => `${dictNode}["${keyNode.text}"] = ${right}`
  //       });
  //     }
  //   }
  // }

  const checker = props.program.getTypeChecker()

  const leftType = checker.getTypeAtLocation(node.left)
  const rightType = checker.getTypeAtLocation(node.right)
  const leftTypeString = checker.typeToString(leftType)
  const rightTypeString = checker.typeToString(rightType)

  return combine({
    parent: node,
    nodes: [node.left, node.operatorToken, node.right],
    props,
    parsedStrings: (left, operatorToken, right) => {
      if (operatorToken === "??") {
        return `(${left} if (${left}) != null else ${right})`
      }

      if (operatorToken === "==" || operatorToken === "===") {
        if (
          leftTypeString !== rightTypeString ||
          // Even if two variables have the same union type they could be different variants of that union
          leftTypeString.includes("|")
        ) {
          // TODO: We should cache the left and right expressions - we evaluate them twice rn

          return `((typeof(${left}) == typeof(${right})) and (${left} == ${right}))`
        }
      }

      if (operatorToken === "!=" || operatorToken === "!==") {
        if (leftTypeString !== rightTypeString) {
          // TODO: We should cache the left and right expressions - we evaluate them twice rn

          return `((typeof(${left}) != typeof(${right})) or ((typeof(${left}) == typeof(${right})) and (${left} != ${right})))`
        }
      }

      return `${left}${needsLeftHandSpace ? " " : ""}${operatorToken} ${right}`
    },
  })
}

// Tests

export const testAdd: Test = {
  ts: "1 + 2",
  expected: "1 + 2",
}

export const testMultiply: Test = {
  ts: "1 * 2",
  expected: "1 * 2",
}

export const testAssignmentToDict: Test = {
  ts: `const foo = {};
foo.bar = 1`,

  expected: `var foo = {}
foo.bar = 1
`,
}

export const testNestedAssignmentToDict: Test = {
  ts: `const foo = { bar: {} };
foo.bar.baz = 1`,
  expected: `
var foo = { "bar": {} }
foo.bar.baz = 1
`,
}

export const testDoubleEqual: Test = {
  ts: "(1 as int) == (2 as int)",
  expected: "1 == 2",
}

export const testDoubleEqualDifferentTypes: Test = {
  ts: `
let a: { a: number; } | string
let b: string

a == b
  `,
  expected: `
var a
var b  
((typeof(a) == typeof(b)) and (a == b))
`,
}

export const testDoubleNotEqualDifferentTypes: Test = {
  ts: `
let a: { a: number; } | string
let b: string

a != b
  `,
  expected: `
var a
var b  
((typeof(a) != typeof(b)) or ((typeof(a) == typeof(b)) and (a != b)))
`,
}
