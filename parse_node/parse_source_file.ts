import ts, { SyntaxKind } from "typescript"
import {
  parseNode as parseNode,
  ParseNodeType,
  ParseState,
} from "../parse_node"
import * as utils from "tsutils"

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

  return `${extendsFrom ? `extends ${extendsFrom}` : ""}
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

  props.usages = utils.collectVariableUsage(node)
  props.isAutoload = sourceInfo?.isAutoload() ?? false

  const classDecl = statements.find(
    (statement) =>
      statement.kind === SyntaxKind.ClassDeclaration &&
      // skip class declarations
      statement.modifiers?.filter((m) => m.getText() === "declare").length === 0
  ) as ts.ClassDeclaration | null
  const parsedStatements = statements.map((statement) =>
    parseNode(statement, props)
  )

  return {
    content: `
${classDecl ? preprocessClassDecl(classDecl, props) : ""} 
${parsedStatements.flatMap((x) => x.hoistedEnumImports ?? []).join("\n")}
${parsedStatements.flatMap((x) => x.hoistedLibraryFunctions ?? []).join("\n")}
${parsedStatements.flatMap((x) => x.hoistedArrowFunctions ?? []).join("\n")}
${parsedStatements.map((x) => x.content).join("\n")}
`.trim(),
    enums: parsedStatements.flatMap((x) => x.enums ?? []),
  }
}
