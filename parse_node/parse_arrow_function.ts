import ts, { SyntaxKind } from "typescript"
import { combine, ParseState } from "../parse_node"
import { ParseNodeType } from "../parse_node"

/**
 * Get all identifiers in a scope that were declared in an enclosing scope.
 *
 * e.g.
 *
 * function foo() {
 *   let a = 1;
 *   return a + b + 1;
 * }
 *
 * in foo(), `a` is not a free variable, but `b` is.
 */
const getFreeVariables = (
  node: ts.Node | undefined | null,
  typeChecker: ts.TypeChecker,
  root: ts.ArrowFunction
): (ts.Identifier | ts.PropertyAccessExpression)[] => {
  if (!node) {
    return []
  }

  if (
    node.kind === SyntaxKind.Identifier ||
    node.kind === SyntaxKind.PropertyAccessExpression
  ) {
    if (node.kind === SyntaxKind.PropertyAccessExpression) {
      // In cases like "a.b.c", only return "a".
      const pae = node as ts.PropertyAccessExpression
      node = pae.expression
    }

    const symbol = typeChecker.getSymbolAtLocation(node)

    if (symbol) {
      const decl = symbol.declarations[0]

      if (decl.getSourceFile() !== root.getSourceFile()) {
        return []
      }

      let currentParent: ts.Node | undefined = decl
      let isFreeVariable = true

      while (currentParent) {
        if (currentParent === root) {
          isFreeVariable = false

          break
        }

        currentParent = currentParent.parent
      }

      if (isFreeVariable) {
        return [node as ts.Identifier | ts.PropertyAccessExpression]
      } else {
        return []
      }
    } else {
      console.log(node.getText(), "no symbol")
    }

    return []
  }

  return node
    .getChildren()
    .flatMap((child) => getFreeVariables(child, typeChecker, root))
}

export const getCapturedScope = (
  node: ts.ArrowFunction,
  checker: ts.TypeChecker
): {
  capturedScopeObject: string
  unwrapCapturedScope: string
} => {
  const freeVariables = getFreeVariables(node.body, checker, node)

  const uniqueFreeVariables = freeVariables.filter(
    (item, index) => freeVariables.indexOf(item) === index
  )

  const capturedScopeObject =
    "{" +
    uniqueFreeVariables
      .map((freeVar) => `"${freeVar.getText()}": ${freeVar.getText()}`)
      .join(", ") +
    "}"

  const unwrapCapturedScope = uniqueFreeVariables
    .map((v) => `  var ${v.getText()} = captures.${v.getText()}\n`)
    .join("")

  return {
    capturedScopeObject,
    unwrapCapturedScope,
  }
}

export const parseArrowFunction = (
  node: ts.ArrowFunction,
  props: ParseState
): ParseNodeType => {
  const name = props.genUniqueName()

  const { unwrapCapturedScope } = getCapturedScope(
    node,
    props.program.getTypeChecker()
  )

  props.scope.enterScope()

  let parsed = combine({
    parent: node,
    nodes: [node.body, ...node.parameters],
    props,
    addIndent: true,
    content: (body, ...args) => {
      if (node.body.kind === SyntaxKind.Block) {
        return `
func ${name}(${[...args, "captures"].join(", ")}):
${unwrapCapturedScope}
  ${body}
        `
      } else {
        // Single line arrow function, with implicit return.

        return `
func ${name}(${[...args, "captures"].join(", ")}):
${unwrapCapturedScope}
  return ${body}
        `
      }
    },
  })

  props.scope.leaveScope()

  return {
    content: `funcref(self, "${name}")`,
    hoistedArrowFunctions: [
      parsed.content,
      ...(parsed.hoistedArrowFunctions ?? []),
    ],
  }
}
