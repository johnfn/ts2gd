import ts, { nodeModuleNameResolver } from "typescript"
import { combine, ParseState } from "../parse_node"
import { getGodotType, getTypeHierarchy, isEnumType } from "../ts_utils"
import { ParseNodeType } from "../parse_node"
import { ErrorName } from "../errors"

const isExported = (node: ts.PropertyDeclaration) => {
  for (const dec of node.decorators ?? []) {
    if (dec.expression.getText() === "exports") {
      return true
    }
  }

  return false
}

const isOnReady = (node: ts.PropertyDeclaration, props: ParseState) => {
  if (node.initializer) {
    // I think there's some sort of race where we save .d.ts files too fast to
    // then have the type checker re-analyze them, so the get_node() calls have a habit
    // of coming back as 'any' when we use the typechecker on them.

    if (
      node.initializer.getText().includes("get_node(") ||
      node.initializer.getText().includes("get_node_unsafe")
    ) {
      return true
    }

    // TODO: This isn't quite so simple, because we could do something like node.value - where
    // node is Node but value is int - which we should mark as onready, but we aren't currently

    const initializerType = props.program
      .getTypeChecker()
      .getTypeAtLocation(node.initializer)
    const hierarchy = getTypeHierarchy(initializerType).map((x) =>
      props.program.getTypeChecker().typeToString(x)
    )

    return hierarchy.includes("Node2D") || hierarchy.includes("Node")
  }

  return false
}

const getSuperclassType = (classType: ts.Type) => {
  const baseTypes = classType.getBaseTypes() ?? []

  if (baseTypes.length === 0) {
    return null
  }

  if (baseTypes.length > 1) {
    throw new Error("> 1 base types; not sure which one to pick!")
  }

  return baseTypes[0]
}

export const parsePropertyDeclaration = (
  node: ts.PropertyDeclaration,
  props: ParseState
): ParseNodeType => {
  let klass = node.parent
  let classType = props.program.getTypeChecker().getTypeAtLocation(klass)
  let type = props.program.getTypeChecker().getTypeAtLocation(node)
  let superclassType = getSuperclassType(classType)

  let nameOrError = getGodotType(node, props, node.initializer, node.type)

  if (nameOrError.errors) {
    for (const error of nameOrError.errors) {
      props.addError(error)
    }
  }

  let typeGodotName = getGodotType(node, props, node.initializer, node.type)
  let typeName = type.symbol?.getName() ?? ""
  let typeHintName = typeGodotName.result

  typeGodotName.errors?.forEach((error) => props.addError(error))

  if (isEnumType(type)) {
    typeGodotName.result = props.program.getTypeChecker().typeToString(type)
  }

  if (typeName === "Signal") {
    let signalName = node.name.getText()

    if (signalName.startsWith("$")) {
      signalName = signalName.slice(1)
    } else {
      props.addError({
        description: "Signals must be prefixed with $.",
        error: ErrorName.SignalsMustBePrefixedWith$,
        location: node,
      })
    }

    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => `signal ${signalName}`,
    })
  }

  const exportText = isExported(node) ? `export(${typeGodotName.result}) ` : ""
  const onReady = isOnReady(node, props)

  return combine({
    parent: node,
    nodes: [node.initializer, node.name],
    props,
    parsedStrings: (initializer, name) => {
      // Don't redeclare properties defined in a superclass. This is useful in
      // TS (because you can define them w/ more precise types) but causes an
      // error in Godot.
      if (superclassType?.getProperties().find((prop) => prop.name === name)) {
        return ""
      }

      return `${exportText}${onReady ? "onready " : ""}var ${name}${
        typeHintName ? `: ${typeHintName}` : ""
      }${initializer && ` = ${initializer}`}`
    },
  })
}
