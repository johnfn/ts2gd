import ts from "typescript"

import {
  ExtraLine,
  ExtraLineType,
  ParseState,
  combine,
  ParseNodeType,
} from "../parse_node"
import { getGodotType } from "../ts_utils"

const magic = `"[no value passed in]"`

export const parseParameter = (
  node: ts.ParameterDeclaration,
  props: ParseState
): ParseNodeType => {
  const type = getGodotType(
    node,
    props.program.getTypeChecker().getTypeAtLocation(node),
    props,
    false,
    node.initializer,
    node.type
  )
  const usages = props.usages.get(node.name as ts.Identifier)
  const unusedPrefix = usages?.uses.length === 0 && !node.initializer ? "_" : ""
  const typeString = type ? `: ${type}` : ""

  props.scope.addName(node.name)

  const initializers: ExtraLine[] = []

  const result = combine({
    parent: node,
    nodes: [node.name, node.initializer],
    props,
    parsedStrings: (name, initializer) => {
      if (initializer) {
        // It's tempting to just initialize it with godot default parameter
        // initializers, but there's a subtle bug: TS supports myFunction(a, b =
        // a) { } but Godot does not. So we need to compile that out.

        // `magic` is a giant hack but it's the only way to get things to work
        // without rewriting callsites.

        initializers.push({
          line: `${name} = (${initializer} if (typeof(${name}) == TYPE_STRING and ${name} == ${magic}) else ${name})`,
          type: "after",
          lineType: ExtraLineType.DefaultInitialization,
        })

        return `${name}${initializer ? ` = ${magic}` : ""}`
      }

      return `${unusedPrefix}${name}${typeString}${
        initializer ? " = null" : ""
      }`
    },
  })

  result.extraLines = initializers

  return result
}
