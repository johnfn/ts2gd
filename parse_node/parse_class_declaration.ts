import ts, { SyntaxKind } from "typescript"
import { ParseState, combine } from "../parse_node"
import { ParseNodeType } from "../parse_node"

const getSettersAndGetters = (members: readonly ts.ClassElement[]) => {
  const setOrGetters = members.filter(
    (member) =>
      member.kind === SyntaxKind.SetAccessor ||
      member.kind === SyntaxKind.GetAccessor
  )
  const pairings: {
    setter?: ts.SetAccessorDeclaration
    getter?: ts.GetAccessorDeclaration
    name: string
  }[] = []

  for (const setGet of setOrGetters) {
    if (setGet.kind === SyntaxKind.SetAccessor) {
      const setter = setGet as ts.SetAccessorDeclaration
      const name = setter.name.getText()
      const existingObj = pairings.find((pair) => pair.name === name)

      if (existingObj) {
        existingObj.setter = setter
      } else {
        pairings.push({ setter, name })
      }
    }

    if (setGet.kind === SyntaxKind.GetAccessor) {
      const getter = setGet as ts.GetAccessorDeclaration
      const name = getter.name.getText()
      const existingObj = pairings.find((pair) => pair.name === name)

      if (existingObj) {
        existingObj.getter = getter
      } else {
        pairings.push({ getter, name })
      }
    }
  }

  return pairings
}

export const parseClassDeclaration = (
  node: ts.ClassDeclaration | ts.ClassExpression,
  props: ParseState
): ParseNodeType => {
  const modifiers = node.modifiers?.map((x) => x.getText())

  // skip class declarations; there's no code to generate here
  if (modifiers?.includes("declare")) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  }

  // Preprocess set/get to make setget declarations
  const settersAndGetters = getSettersAndGetters(node.members)
  const parsedSetterGetters = settersAndGetters
    .map(({ setter, getter, name }) => {
      return `var ${name} setget ${setter ? name + "_set" : ""}, ${
        getter ? name + "_get" : ""
      }`
    })
    .join("\n")

  // NOTE: Since extends and class_name *must* come first in the file,
  // they are added ahead of time by parse_source_file.ts.

  return combine({
    parent: node,
    nodes: node.members,
    props,
    parsedStrings: (...members) => {
      return `
${parsedSetterGetters}
${members.join("")}
`
    },
  })
}

// export const testConditionalExpression: Test = {
//   ts: `
// export class Foo {
//   x = 1
// }

// class Bar {
//   x = 2
// }
//   `,
//   expected: `var _x = 1 if true else 2`,
// }
