import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

import { getImportResPathForEnum } from "./parse_import_declaration"

export const parseEnumDeclaration = (
  node: ts.EnumDeclaration,
  props: ParseState
): ParseNodeType => {
  const enumText = combine({
    parent: node,
    nodes: node.members.map((member) => member.initializer ?? undefined),
    props,
    parsedStrings: (...initializers) => {
      let result = `const ${node.name.text} = {\n`
      let initializedValue = 0

      for (let i = 0; i < initializers.length; i++) {
        result += `  "${node.members[i].name.getText()}": ${
          initializers[i] ? initializers[i] : initializedValue
        },\n`

        if (initializers[i] && !isNaN(Number(initializers[i]))) {
          initializedValue = Number(initializers[i]) + 1
        } else {
          initializedValue++
        }
      }

      result += "}"

      return result
    },
  })

  const enumType = props.program.getTypeChecker().getTypeAtLocation(node)
  const { resPath, enumName } = getImportResPathForEnum(enumType, props)

  const fileName =
    props.sourceFileAsset.gdContainingDirectory +
    props.sourceFileAsset.name +
    "_" +
    enumName +
    ".gd"

  return {
    content: enumText.content,
    files: [],
  }
}

export const testEnumDeclaration: Test = {
  ts: `
export enum MyEnum { A, B }

export class Hello {
  constructor() {
    print(MyEnum.A)
  }
}
  `,
  expected: `
class_name Hello
const MyEnum = {
  "A": 0,
  "B": 1,
}
func _ready():
  print(MyEnum.A)
  `,
}

export const testEnumDeclaration2: Test = {
  ts: `
export enum TestEnum {
  A = 1,
  B = 2
}

export class Hello {
  constructor() {
    print(TestEnum.A)
  }
}
`,
  expected: `
class_name Hello
const TestEnum = {
  "A": 1,
  "B": 2,
}
func _ready():
  print(TestEnum.A)
  `,
}

export const testEnumDeclaration3: Test = {
  ts: `
export enum TestEnum {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export class Hello {
  constructor() {
    print(TestEnum.C)
  }
}
`,
  expected: `
class_name Hello
const TestEnum = {
  "A": "A",
  "B": "B",
  "C": "C",
  "D": "D",
}
func _ready():
  print(TestEnum.C)
  `,
}
