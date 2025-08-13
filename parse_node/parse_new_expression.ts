import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

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
