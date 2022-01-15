import ts, { SyntaxKind } from "typescript"

import { ErrorName } from "../project/errors"
import { ParseNodeType, ParseState, combine } from "../parse_node"

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
  root: ts.ArrowFunction,
  props: ParseState
): (ts.Identifier | ts.PropertyAccessExpression)[] => {
  if (!node) {
    return []
  }

  if (
    node.kind === SyntaxKind.Identifier ||
    node.kind === SyntaxKind.PropertyAccessExpression
  ) {
    // In cases like "a.b.c", only return "a".
    while (node.kind === SyntaxKind.PropertyAccessExpression) {
      const pae = node as ts.PropertyAccessExpression
      node = pae.expression
    }

    const symbol = props.program.getTypeChecker().getSymbolAtLocation(node)

    if (symbol) {
      if (!symbol.declarations) {
        props.project.errors.add({
          error: ErrorName.DeclarationNotGiven,
          location: node,
          stack: new Error().stack ?? "",
          description: `
Declaration not provided for free variables. This is an internal ts2gd bug. Please report it. 
        `,
        })
        return []
      }
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
      if (node.kind === SyntaxKind.Identifier) {
        // Expressions like this.get_node("HBoxContainer/BuildButton").visible give
        // "no symbol" logs. I don't understand why
        console.error(node.getText(), "no symbol")
      }
    }

    return []
  }

  let result: (ts.Identifier | ts.PropertyAccessExpression)[][] = []

  ts.forEachChild(node, (ch) => {
    result.push(getFreeVariables(ch, root, props))
  })

  return result.flat()
}

export const getCapturedScope = (
  node: ts.ArrowFunction,
  props: ParseState
): {
  capturedScopeObject: string
  unwrapCapturedScope: string
} => {
  const freeVariables = getFreeVariables(node.body, node, props)
  const uniqueFreeVariables = freeVariables.filter(
    (item, index) =>
      freeVariables.findIndex((obj) => obj.getText() === item.getText()) ===
      index
  )

  // We don't want to capture `this` as part of our scope. There's no reason to
  // do it: lambdas are only ever executed in the current class, so `this` will
  // never be different. Plus, we'd have to rewrite all `this` access in the
  // function to be `_self`, which would be confusing, and look stupid, and
  // basically be a completely pointless workaround.
  const freeVariablesWithoutThis = uniqueFreeVariables.filter(
    (v) => v.getText() !== "this"
  )

  const getNodeName = (node: ts.Node) => {
    const text = node.getText()

    return text
  }

  const capturedScopeObject =
    "{" +
    freeVariablesWithoutThis
      .map((freeVar) => `"${getNodeName(freeVar)}": ${getNodeName(freeVar)}`)
      .join(", ") +
    "}"

  const unwrapCapturedScope = freeVariablesWithoutThis
    .map((v) => `  var ${getNodeName(v)} = captures.${getNodeName(v)}\n`)
    .join("")

  return {
    capturedScopeObject,
    unwrapCapturedScope,
  }
}

// We emit all arrow functions as a tuple of [function object, closed-over
// variables]. (Previously, when we passed an arrow function to another
// function, we were just passing in captured variables as a second argument,
// but this gets messy and complicated when we pass function arguments through
// multiple functions.)
export const parseArrowFunction = (
  node: ts.ArrowFunction,
  props: ParseState
): ParseNodeType => {
  const name = props.scope.createUniqueName()

  const { unwrapCapturedScope } = getCapturedScope(node, props)

  props.scope.enterScope()

  let parsed = combine({
    parent: node,
    nodes: [node.body, ...node.parameters],
    props,
    addIndent: true,
    parsedStrings: (body, ...args) => {
      if (node.body.kind === SyntaxKind.Block) {
        return `
func ${name}(${[...args, "captures"].join(", ")}):
${unwrapCapturedScope}
  ${body.trim() === "" ? "pass" : body}
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

  const decls = props.program.getTypeChecker().getTypeAtLocation(node)
    .symbol?.declarations

  if (!decls) {
    props.project.errors.add({
      error: ErrorName.DeclarationNotGiven,
      location: node,
      stack: new Error().stack ?? "",
      description: `
Declaration not provided for arrow function. This is an internal ts2gd bug. Please report it. 
        `,
    })
  }

  const capturedScopeObject = decls
    ? getCapturedScope(decls[0] as ts.ArrowFunction, props).capturedScopeObject
    : "{}"

  // NOTE: parse_call_expression expects all arrow functions to be declared on self.
  return {
    content: `[funcref(self, "${name}"), ${capturedScopeObject}]`,
    hoistedArrowFunctions: [
      {
        name,
        node,
        content: parsed.content,
      },
      ...(parsed.hoistedArrowFunctions ?? []),
    ],
  }
}
