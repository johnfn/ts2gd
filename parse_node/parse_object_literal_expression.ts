import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseObjectLiteralExpression = (
  node: ts.ObjectLiteralExpression,
  props: ParseState
): ParseNodeType => {
  if (node.properties.length === 0) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "{}",
    })
  }

  const isMultiline = node.getText().includes("\n")

  const unprocessedKeys = node.properties.map((prop) => {
    if (prop.kind === SyntaxKind.PropertyAssignment) {
      if (prop.name.kind === SyntaxKind.ComputedPropertyName) {
        const computedProp = prop.name as ts.ComputedPropertyName

        return computedProp.expression
      }

      return prop.name
    } else if (prop.kind === SyntaxKind.ShorthandPropertyAssignment) {
      return prop.name
    } else {
      throw new Error("Unknown property in object.")
    }
  })

  const unprocessedValues = node.properties.map((prop) => {
    if (prop.kind === SyntaxKind.PropertyAssignment) {
      return prop.initializer
    } else if (prop.kind === SyntaxKind.ShorthandPropertyAssignment) {
      return prop.name
    } else {
      throw new Error("Unknown property in object.")
    }
  })

  return combine({
    parent: node,
    nodes: [...unprocessedKeys, ...unprocessedValues],
    props,
    parsedStrings: (...keysAndValues) => {
      const keys = keysAndValues.slice(0, keysAndValues.length / 2)
      const values = keysAndValues.slice(keysAndValues.length / 2)

      let pairs: string[][] = []

      for (let i = 0; i < values.length; i++) {
        if (unprocessedKeys[i].kind === SyntaxKind.Identifier) {
          pairs.push(['"' + keys[i] + '"', values[i]])
          continue
        }

        // We need to quote identifiers, even though if we compiled an identifier normally it wouldn't be quoted.

        pairs.push([keys[i], values[i]])
      }

      if (isMultiline) {
        return `
{
${pairs.map(([k, v]) => `  ${k}: ${v},`).join("\n")}
}      
      `
      } else {
        return `
{ ${pairs.map(([k, v]) => `${k}: ${v}`).join(", ")} }      
      `
      }
    },
  })
}
