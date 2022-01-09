import path from "path"

import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { mockProjectPath } from "../tests/test_utils"

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

  const fileName = props.project.paths.replaceExtension(
    props.sourceFileAsset.gdPath,
    `_${enumName}.gd`
  )

  return {
    content: `const ${enumName} = preload("${resPath}").${enumName}`,
    files: [
      {
        body: enumText.content,
        filePath: fileName,
      },
    ],
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

  expected: {
    type: "multiple-files",
    files: [
      {
        fileName: mockProjectPath("Hello.gd"),
        expected: `
class_name Hello
const MyEnum = preload("res://Test_MyEnum.gd").MyEnum
func _ready():
  print(MyEnum.A)
      `,
      },

      {
        fileName: mockProjectPath("Test_MyEnum.gd"),
        expected: `
const MyEnum = {
  "A": 0,
  "B": 1,
}`,
      },
    ],
  },
}

export const testEnumDeclaration2: Test = {
  ts: `
export enum TestEnum { 
  A = "A", 
  B = "B"
}

export class Hello {
  constructor() {
    print(TestEnum.A)
  }
}
`,
  expected: {
    type: "multiple-files",
    files: [
      {
        fileName: mockProjectPath("Hello.gd"),
        expected: `
class_name Hello
const TestEnum = preload("res://Test_TestEnum.gd").TestEnum
func _ready():
  print(TestEnum.A)
      `,
      },

      {
        fileName: mockProjectPath("Test_TestEnum.gd"),
        expected: `
const TestEnum = {
  "A": "A",
  "B": "B",
}`,
      },
    ],
  },
}
