import ts, { SymbolFlags, SyntaxKind } from "typescript"

import {
  ExtraLine,
  ExtraLineType,
  ParseNodeType,
  ParseState,
  combine,
  parseNode,
} from "../parse_node"
import {
  findContainingClassDeclaration,
  isDictionary,
  isEnumType,
  isNullableNode,
} from "../ts_utils"

const isRhs = (node: ts.PropertyAccessExpression) => {
  let parentExpression: ts.Node = node

  while (
    parentExpression.parent &&
    (parentExpression.parent.kind !== SyntaxKind.BinaryExpression ||
      (parentExpression.parent.kind === SyntaxKind.BinaryExpression &&
        (parentExpression.parent as ts.BinaryExpression).operatorToken.kind !==
          SyntaxKind.EqualsToken))
  ) {
    parentExpression = parentExpression.parent
  }
  let binaryExpression = parentExpression.parent as ts.BinaryExpression

  if (!parentExpression.parent) {
    return true
  }

  if (parentExpression.parent && binaryExpression.right === parentExpression) {
    return true
  } else {
    return false
  }
}

export const parsePropertyAccessExpression = (
  node: ts.PropertyAccessExpression,
  props: ParseState
): ParseNodeType => {
  const exprType = props.program
    .getTypeChecker()
    .getTypeAtLocation(node.expression)

  // Compile things like KeyList.KEY_SPACE into KEY_SPACE
  if (isEnumType(exprType)) {
    const symbol = exprType.getSymbol()!
    const declarations = symbol.declarations

    let isGlobal = false
    if (declarations) {
      const sourceFiles = declarations.map((d) => d.getSourceFile().fileName)
      isGlobal = !!sourceFiles.find((f) => f.includes("@globals.d.ts"))
    }

    if (isGlobal) {
      return parseNode(node.name, props)
    }
  }

  let nullCoalesce: ExtraLine[] = []
  const tc = props.program.getTypeChecker()

  let result = combine({
    parent: node,
    nodes: [node.expression, node.name],
    props,
    parsedStrings: (lhs, rhs) => {
      if (node.questionDotToken) {
        const type = tc.getTypeAtLocation(node).getNonNullableType()
        const areWeAFunction =
          type.symbol?.flags & SymbolFlags.Method ||
          type.symbol?.flags & SymbolFlags.Function

        let exprName: string

        if (areWeAFunction) {
          let lhsName: string
          const lhsType = tc.typeToString(
            tc.getTypeAtLocation(node.expression).getNonNullableType()
          )

          lhsName = props.scope.createUniqueName()
          exprName = props.scope.createUniqueName()

          if (
            (lhsType === "Vector2Constructor" ||
              lhsType === "Vector2iConstructor" ||
              lhsType === "Vector3Constructor" ||
              lhsType === "Vector3iConstructor") &&
            (rhs === "add" || rhs === "sub" || rhs === "mul" || rhs === "div")
          ) {
            nullCoalesce = [
              {
                type: "before",
                line: `var ${lhsName} = ${lhs}`,
                lineType: ExtraLineType.NullableIntermediateExpression,
              },
              {
                type: "before",
                line: `var ${exprName} = [funcref(self, "${rhs}_vec_lib") if ${lhsName} != null else null, {}, ${lhsName}]`,
                lineType: ExtraLineType.NullableIntermediateExpression,
              },
            ]

            return exprName
          }

          nullCoalesce = [
            {
              type: "before",
              line: `var ${lhsName} = ${lhs}`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
            {
              type: "before",
              line: `var ${exprName} = [funcref(${lhsName}, "${rhs}") if ${lhsName} != null else null, {}, null]`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
          ]

          return exprName
        } else {
          exprName = props.scope.createUniqueName()

          nullCoalesce = [
            {
              type: "before",
              line: `var ${exprName} = ${lhs}`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
          ]
        }

        return `(${exprName}.${rhs} if ${exprName} != null else null)`
      }

      // Godot does not like var foo = bar.baz when baz is not a key of bar
      // However, Godot is fine with bar.baz = foo even if baz is not a key.

      if (
        isDictionary(exprType) &&
        isNullableNode(node.name, props.program.getTypeChecker()) &&
        isRhs(node)
      ) {
        return `(${lhs}.${rhs} if ${lhs}.has("${rhs}") else null)`
      }

      const containingClassDecl = findContainingClassDeclaration(node)

      if (
        containingClassDecl &&
        exprType.symbol?.declarations &&
        exprType.symbol.declarations[0] === containingClassDecl &&
        node.expression.getText() === containingClassDecl.name?.getText()
      ) {
        return `self.${rhs}`
      }

      return `${lhs}.${rhs}`
    },
  })

  result.extraLines = [...(result.extraLines ?? []), ...nullCoalesce]

  return result
}
