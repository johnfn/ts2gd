import ts, { SyntaxKind } from "typescript"
import {
  parseNode as parseNode,
  ParseNodeType,
  ParseState,
} from "../parse_node"
import { Test } from "../tests/test"
import { LibraryFunctions } from "./parse_call_expression"

/**
 * The class_name and extends statements *must* come first in the file, so we
 * preprocess the class to find them prior to our normal pass.
 */
const preprocessClassDecl = (node: ts.ClassDeclaration, props: ParseState) => {
  let extendsFrom = ""

  if (node.heritageClauses) {
    // TODO: Ensure there's only one of each here

    const clause = node.heritageClauses[0] as ts.HeritageClause
    const type = clause.types[0]

    extendsFrom = type.getText()
  }

  const isTool = !!node.decorators?.find(
    (dec) => props.getNodeText(dec.expression) === "tool"
  )

  return `${isTool ? "tool\n" : ""}${
    extendsFrom ? `extends ${extendsFrom}` : ""
  }
${props.isAutoload ? "" : `class_name ${node.name?.getText()}\n`}`
}

export const parseSourceFile = (
  node: ts.SourceFile,
  props: ParseState
): ParseNodeType => {
  const { statements } = node
  const sourceInfo = props.project
    .sourceFiles()
    .find((file) => file.fsPath === node.fileName)

  // props.usages = utils.collectVariableUsage(node)
  props.isAutoload = sourceInfo?.isAutoload() ?? false

  const classDecl = statements.find(
    (statement) =>
      statement.kind === SyntaxKind.ClassDeclaration &&
      // skip class type declarations
      (statement.modifiers ?? []).filter((m) => m.getText() === "declare")
        .length === 0
  ) as ts.ClassDeclaration | null
  const parsedStatements = statements.map((statement) =>
    parseNode(statement, props)
  )

  const allHoistedLibraryFunctions = new Set(
    parsedStatements.flatMap((x) => [
      ...(x.hoistedLibraryFunctions?.keys() ?? []),
    ])
  )
  const allHoistedLibraryFunctionDefinitions = [
    ...allHoistedLibraryFunctions.keys(),
  ].map((item) =>
    LibraryFunctions[item].definition("__" + LibraryFunctions[item].name)
  )

  const content = [
    classDecl ? preprocessClassDecl(classDecl, props) : "",
    parsedStatements.flatMap((x) => x.hoistedEnumImports ?? []).join("\n"),
    allHoistedLibraryFunctionDefinitions.join("\n"),
    parsedStatements
      .flatMap((x) => x.hoistedArrowFunctions ?? [])
      .map((obj) => obj.content)
      .join("\n"),
    parsedStatements.map((x) => x.content).join("\n"),
  ]

  return {
    content: `
    ${content.filter((item) => item.trim() !== "").join("\n")}
`.trim(),
    enums: parsedStatements.flatMap((x) => x.enums ?? []),
  }
}

export const testToolAnnotation: Test = {
  ts: `
@tool
export class Test {
}
  `,
  expected: `
tool
class_name Test
`,
}
