import ts from "typescript"
import { combine, ExtraLine, ExtraLineType, ParseState } from "../parse_node"
import { getGodotType } from "../ts_utils"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

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
  const typeString = type.result ? `: ${type.result}` : ""

  if (type.errors) {
    type.errors.forEach((err) => props.addError(err))
  }

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

        console.log("add el")
        initializers.push({
          line: `${name} = ${initializer}`,
          type: "after",
          lineType: ExtraLineType.DefaultInitialization,
        })
      }

      return `${unusedPrefix}${name}${typeString}`
    },
  })

  result.extraLines = initializers

  return result
}

export const testParameter: Test = {
  ts: `
class Test {
  test(a: int, b: string) {
    print(a);
  }
}
  `,
  expected: `
class_name Test

func test(a: int, _b: String):
  print(a)
  `,
}
