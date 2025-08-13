import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

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

      /**
       * Godot has an annoying limitation where a == b actually throws an error (!) if a and b
       * are not the same type.
       */
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
