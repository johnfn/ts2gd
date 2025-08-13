import ts, { SyntaxKind } from "typescript"

import { ErrorName, addError } from "../errors"
import {
  ExtraLine,
  ExtraLineType,
  ParseState,
  combine,
  parseNode,
  ParseNodeType,
} from "../parse_node"
import { isArrayType, isDictionary, isNullableNode } from "../ts_utils"

import { LibraryFunctionName, LibraryFunctions } from "./library_functions"
import { getCapturedScope } from "./parse_arrow_function"

export const parseCallExpression = (
  node: ts.CallExpression,
  props: ParseState
): ParseNodeType => {
  let expression = node.expression
  let args = node.arguments

  if (node.expression.kind === SyntaxKind.SuperKeyword) {
    return combine({
      parent: node,
      nodes: node.expression,
      props,
      parsedStrings: () => "",
    })
  }

  // node = [[ a.b(c) ]]
  if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
    // prop = [[ a.b ]](c)
    const prop = node.expression as ts.PropertyAccessExpression
    const functionName = prop.name.getText()

    const type = props.program
      .getTypeChecker()
      .getTypeAtLocation(prop.expression)

    if (isDictionary(type)) {
      if (functionName === "entries") {
        let result = combine({
          parent: node,
          nodes: [prop.expression],
          props,
          parsedStrings: (expr) => {
            return `__entries(${[expr].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add("entries")

        return result
      }
    }

    if (isArrayType(type)) {
      if (functionName in LibraryFunctions) {
        const libFunctionName = functionName as LibraryFunctionName

        let result = combine({
          parent: node,
          nodes: [prop.expression, ...args],
          props,
          parsedStrings: (expr, ...args) => {
            return `__${libFunctionName}(${[expr, ...args].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add(libFunctionName)

        return result
      }
    }

    const typeAsString = props.program.getTypeChecker().typeToString(type)

    if (
      typeAsString === "Vector2Constructor" ||
      typeAsString === "Vector2iConstructor" ||
      typeAsString === "Vector3Constructor" ||
      typeAsString === "Vector3iConstructor"
    ) {
      if (
        functionName === "add" ||
        functionName === "sub" ||
        functionName === "mul" ||
        functionName === "div"
      ) {
        const libFunctionName = (functionName +
          "_vec_lib") as LibraryFunctionName

        let result = combine({
          parent: node,
          nodes: [prop.expression, ...args],
          props,
          parsedStrings: (expr, ...args) => {
            return `${libFunctionName}(${[expr, ...args].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add(libFunctionName)

        return result
      }
    }
  }

  // This compiles dict.put(a, b) into dict[a] = b
  if (expression.kind === SyntaxKind.PropertyAccessExpression) {
    const propAccess = expression as ts.PropertyAccessExpression

    if (
      isDictionary(
        props.program.getTypeChecker().getTypeAtLocation(propAccess.expression)
      ) &&
      propAccess.name.escapedText === "put"
    ) {
      return combine({
        parent: node,
        nodes: [propAccess.expression, args[0], args[1]],
        props,
        parsedStrings: (dict, key, val) => `${dict}[${key}] = ${val}`,
      })
    }
  }

  const decls = props.program
    .getTypeChecker()
    .getTypeAtLocation(node.expression).symbol?.declarations
  const isExpressionArrowFunction =
    decls &&
    decls[0].kind === SyntaxKind.ArrowFunction &&
    decls[0].getSourceFile() === node.getSourceFile()

  let nullCoalesce: ExtraLine[] = []

  let result = combine({
    parent: node,
    nodes: [expression, ...args],
    props,
    parsedObjs: (parsedExpr, ...parsedArgs) => {
      let parsedStringArgs: string[] = parsedArgs.map((arg) => arg.content)

      if (parsedExpr.content.endsWith("get_node_unsafe")) {
        parsedExpr.content = parsedExpr.content.replace(
          "get_node_unsafe",
          "get_node"
        )
      }

      // Rewrite this.$signal.emit() to this.emit_signal("signal")
      if (parsedExpr.content.endsWith(".emit")) {
        const secondDot = parsedExpr.content.lastIndexOf(".")
        const firstDot = parsedExpr.content.lastIndexOf(".", secondDot - 1)
        let signalName = parsedExpr.content.slice(firstDot + 1, secondDot)

        if (signalName.startsWith("$")) {
          signalName = signalName.slice(1)
        }

        if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = node.expression as ts.PropertyAccessExpression
          if (pae.expression.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            const expr = parseNode(pae2.expression, props)

            parsedStringArgs = [
              `"${signalName}"`,
              ...parsedArgs.map((arg) => arg.content),
            ]
            parsedExpr = {
              content: expr.content + ".emit_signal",
            }
          }
        }
      }

      // TODO - there are less brittle ways of checking for this.

      // Rewrite this.$signal.connect(() => stuff()) to this.connect(this, 'signal', method)
      if (parsedExpr.content.endsWith(".connect")) {
        if (expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = expression as ts.PropertyAccessExpression

          if (pae.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            let signalName = pae2.name.getText()

            if (signalName.startsWith("$")) {
              signalName = signalName.slice(1)
            }

            if (!parsedArgs[0]) {
              addError({
                description:
                  "Missing arrow function argument in signal connect invocation.",
                error: ErrorName.Ts2GdError,
                location: expression,
                stack: new Error().stack ?? "",
              })
            } else {
              const af = args[0] as ts.ArrowFunction
              const arrowFunctionObj =
                parsedArgs[0].hoistedArrowFunctions?.find(
                  (obj) => obj.node === af
                )

              if (!arrowFunctionObj) {
                addError({
                  description:
                    "ts2gd can't find that arrow function. This is an internal ts2gd error. Please report it on GitHub along with the code that caused it.",
                  error: ErrorName.Ts2GdError,
                  location: expression,
                  stack: new Error().stack ?? "",
                })
              } else {
                const { capturedScopeObject } = getCapturedScope(
                  arrowFunctionObj.node,
                  props
                )

                parsedStringArgs = [
                  `"${signalName}"`,
                  "self",
                  `"${arrowFunctionObj.name}"`,
                  `[${capturedScopeObject}]`,
                ]

                const secondDot = parsedExpr.content.lastIndexOf(".")
                const firstDot = parsedExpr.content.lastIndexOf(
                  ".",
                  secondDot - 1
                )

                // We have "self.variable.signal.connect" but we want
                // "self.signal.connect".
                // TODO: This is kinda a hack.
                parsedExpr = {
                  content:
                    parsedExpr.content.substring(0, firstDot) +
                    parsedExpr.content.substring(secondDot),
                }
              }
            }
          }
        }
      }

      if (
        parsedExpr.content.endsWith(".rpc") ||
        parsedExpr.content.endsWith(".rpc_id")
      ) {
        if (expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = expression as ts.PropertyAccessExpression

          if (pae.expression.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            const rpcFunctionName = pae2.name.getText()

            const secondDot = parsedExpr.content.lastIndexOf(".")
            const firstDot = parsedExpr.content.lastIndexOf(".", secondDot - 1)

            const expressionWithoutRpcName =
              parsedExpr.content.substring(0, firstDot) +
              parsedExpr.content.substring(secondDot)

            const isRpcId = parsedExpr.content.endsWith(".rpc_id")

            if (isRpcId) {
              parsedStringArgs = [
                parsedArgs[0].content,
                `"${rpcFunctionName}"`,
                ...parsedArgs.slice(1).map((arg) => arg.content),
              ]
            } else {
              parsedStringArgs = [
                `"${rpcFunctionName}"`,
                ...parsedArgs.map((arg) => arg.content),
              ]
            }

            parsedExpr = {
              content: expressionWithoutRpcName,
            }
          } else {
            addError({
              description: "I'm confused by this rpc",
              error: ErrorName.Ts2GdError,
              location: pae.expression,
              stack: new Error().stack ?? "",
            })
          }
        }
      }

      if (parsedExpr.content === "todict") {
        return parsedArgs[0].content
      }

      // When we pass in functions to other functions, they're passed in as parameters.
      const symbol = props.program
        .getTypeChecker()
        .getSymbolAtLocation(expression)

      const decl = symbol?.getDeclarations() ?? []
      let isFromLib = false

      for (const d of decl) {
        if (d.getSourceFile().fileName.endsWith(".d.ts")) {
          isFromLib = true
        }
      }

      const calledExpressionType = symbol?.getDeclarations()?.[0].kind
      const isFunctionObject =
        !isFromLib &&
        (calledExpressionType === ts.SyntaxKind.Parameter ||
          calledExpressionType === ts.SyntaxKind.VariableDeclaration)

      if (isFunctionObject) {
        parsedStringArgs = [...parsedStringArgs, parsedExpr.content + "[1]"]
      }

      if (isNullableNode(expression, props.program.getTypeChecker())) {
        const newName = props.scope.createUniqueName()
        const needsExplicitSelfArg =
          expression.getText().endsWith("add") ||
          expression.getText().endsWith("sub") ||
          expression.getText().endsWith("mul") ||
          expression.getText().endsWith("div")

        nullCoalesce = [
          {
            type: "before",
            line: `var ${newName} = ${parsedExpr.content}[0].call_func(${
              needsExplicitSelfArg ? parsedExpr.content + "[2], " : ""
            }${parsedStringArgs}) if ${parsedExpr.content} != null else null`,
            lineType: ExtraLineType.NullableIntermediateExpression,
          },
        ]

        return `${newName}`
      }

      if (isFunctionObject) {
        return `${parsedExpr.content}[0].call_func(${parsedStringArgs.join(
          ", "
        )})`
      } else {
        return `${parsedExpr.content}(${parsedStringArgs.join(", ")})`
      }
    },
  })

  result.extraLines = [...(result.extraLines ?? []), ...nullCoalesce]

  if (expression.kind === SyntaxKind.Identifier) {
    const prop = node.expression as ts.Identifier
    const functionName = prop.text

    if (
      functionName === "add_vec_lib" ||
      functionName === "sub_vec_lib" ||
      functionName === "div_vec_lib" ||
      functionName === "mul_vec_lib"
    ) {
      if (!result.hoistedLibraryFunctions) {
        result.hoistedLibraryFunctions = new Set()
      }

      result.hoistedLibraryFunctions.add(functionName)
    }
  }

  return result
}
