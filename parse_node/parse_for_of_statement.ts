import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"

import { getDestructuredNamesAndAccessStrings } from "./parse_variable_declaration"
const { SyntaxKind } = ts

export const parseForOfStatement = (
  node: ts.ForOfStatement,
  props: ParseState
): ParseNodeType => {
  const initializer = node.initializer
  let result: ParseNodeType

  props.scope.enterScope()

  if (initializer.kind === SyntaxKind.VariableDeclarationList) {
    const initializerNode = initializer as ts.VariableDeclarationList

    if (initializerNode.declarations.length > 1) {
      throw new Error("Uh oh! For...of with > 1 declaration")
    }

    const name = initializerNode.declarations[0].name

    if (name.kind === SyntaxKind.Identifier) {
      // Common case - single variable in for... of
      // like for (const x of list)

      result = combine({
        parent: node,
        nodes: [node.expression, node.statement, name],
        props,
        addIndent: true,
        parsedStrings: (expr, statement, name) => `
for ${name} in ${expr}:
  ${statement}
`,
      })
    } else {
      // Destructured case
      // like for (const [a, b] of list)

      const destructuredNames = getDestructuredNamesAndAccessStrings(
        initializerNode.declarations[0].name
      )

      for (const { id } of destructuredNames) {
        props.scope.addName(id)
      }

      const genName = props.scope.createUniqueName()

      result = combine({
        parent: node,
        nodes: [
          node.expression,
          node.statement,
          ...destructuredNames.map((d) => d.id),
        ],
        props,
        addIndent: true,
        parsedStrings: (expr, statement, ...nodes) => `
for ${genName} in ${expr}:
${nodes
  .map(
    (node, i) => `  var ${node} = ${genName}${destructuredNames[i].access}\n`
  )
  .join("")}
  ${statement}
`,
      })
    }
  } else {
    const initExpr = initializer as ts.Expression

    result = combine({
      parent: node,
      nodes: [initExpr, node.expression, node.statement],
      props,
      addIndent: true,
      parsedStrings: (expr, statement) => `
for ${initExpr} in ${expr}:
  ${statement}
`,
    })
  }

  props.scope.leaveScope()

  return result
}
