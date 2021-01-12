import ts from "typescript"

import { combine, ParseNodeType, ParseState } from "../parse_node"
import { Test } from "../test"
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
      let result = `enum ${node.name.text} {\n`

      for (let i = 0; i < initializers.length; i++) {
        result += `  ${node.members[i].name.getText()}${
          initializers[i] ? ` = ${initializers[i]}` : ``
        },\n`
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
enum Test {
  A,
  B,
}      
`,
    },
  ],
}
