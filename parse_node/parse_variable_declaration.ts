import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { getPreciseInitializerType as getFloatOrInt } from "../ts_utils"

export const getDestructuredNamesAndAccessStrings = (
  node: ts.BindingName,
  access = ""
): { id: ts.Identifier; access: string }[] => {
  if (node.kind === SyntaxKind.Identifier) {
    const id = node as ts.Identifier

    return [{ id, access: access }]
  } else if (node.kind === SyntaxKind.ObjectBindingPattern) {
    const obj = node as ts.ObjectBindingPattern

    return obj.elements
      .map((elem) =>
        getDestructuredNamesAndAccessStrings(
          elem.name,
          access + "." + (elem.propertyName?.getText() ?? elem.name.getText())
        )
      )
      .flat()
  } else if (node.kind === SyntaxKind.ArrayBindingPattern) {
    const obj = node as ts.ArrayBindingPattern

    return obj.elements
      .map((elem, i) => {
        if (elem.kind === SyntaxKind.BindingElement) {
          return getDestructuredNamesAndAccessStrings(
            elem.name,
            access + `[${i}]`
          )
        } else {
          throw new Error("I dont know what this is")
        }
      })
      .flat()
  }

  throw new Error(
    "Completely and totally impossible. You will never see this. I promise."
  )
}

export const parseVariableDeclaration = (
  node: ts.VariableDeclaration,
  props: ParseState
): ParseNodeType => {
  let declaredType = node.type?.getText()

  if (declaredType !== "int" && declaredType !== "float") {
    declaredType = undefined
  }

  let inferredType = getFloatOrInt(
    node.initializer,
    node.initializer ? node.initializer.getText() : ""
  )

  const type = declaredType ?? inferredType
  const usages = props.usages.get(node.name as ts.Identifier)
  const unused = usages?.uses.length === 0 ? "_" : ""
  const typeString = type ? `: ${type}` : ""

  if (node.name.kind === SyntaxKind.Identifier) {
    const decl = props.program
      .getTypeChecker()
      .getTypeAtLocation(node)
      .getSymbol()?.declarations?.[0]

    const isAutoload =
      props.isAutoload &&
      decl?.kind === SyntaxKind.ClassDeclaration &&
      decl.getSourceFile() === node.getSourceFile() &&
      node.parent.parent.parent.kind === SyntaxKind.SourceFile

    if (isAutoload) {
      return combine({
        parent: node,
        nodes: [node.name, node.initializer],
        props,
        parsedStrings: (nodeName, init) => ``,
      })
    }
  }

  if (node.name.kind === SyntaxKind.Identifier) {
    props.scope.addName(node.name)

    return combine({
      parent: node,
      nodes: [node.name, node.initializer],
      props,
      parsedStrings: (nodeName, init) =>
        `var ${unused}${nodeName}${typeString}${init ? " = " + init : ""}`,
    })
  } else {
    let destructuredNames = getDestructuredNamesAndAccessStrings(node.name)

    for (const { id } of destructuredNames) {
      props.scope.addName(id)
    }

    const genName = props.scope.createUniqueName()

    return combine({
      parent: node,
      nodes: [node.initializer, ...destructuredNames.map((d) => d.id)],
      props,
      parsedStrings: (initializer, ...nodes) => {
        return `
var ${genName} = ${initializer}
${nodes
  .map((node, i) => `var ${node} = ${genName}${destructuredNames[i].access}`)
  .join("\n")}
`
      },
    })
  }
}
