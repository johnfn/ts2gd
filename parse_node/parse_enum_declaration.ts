import ts from "typescript"

import { combine, ParseNodeType, ParseState } from "../parse_node"
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
    content: (...initializers) => {
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

  const importString = `const ${enumName} = preload("${resPath}").${enumName}`

  return {
    content: "",
    hoistedEnumImports: [importString],
    enums: [
      {
        content: enumText.content,
        name: node.name.text,
      },
    ],
  }
}

export const testEnumDeclaration: Test = {
  ts: `
export enum Test { A, B }

print(Test.A)
  `,
  expected: `
const Test = preload("_Test.gd").Test

print(Test.A)
  `,

  expectedFiles: [
    {
      filename: "Test.gd",
      content: `
const Test = {
  "A": 0,
  "B": 1,
}      
`,
    },
  ],
}

export const testEnumDeclaration2: Test = {
  ts: `
export enum Test { 
  A = "A", 
  B = "B"
}

print(Test.A)
  `,
  expected: `
const Test = preload("_Test.gd").Test

print(Test.A)
  `,

  expectedFiles: [
    {
      filename: "Test.gd",
      content: `
const Test = {
  "A": "A",
  "B": "B",
}      
`,
    },
  ],
}
