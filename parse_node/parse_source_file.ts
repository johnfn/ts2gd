import ts from "typescript";
const { SyntaxKind } = ts;
import * as utils from "tsutils";
import { combine, parseNode as parseNode, ParseNodeType, ParseState } from "../parse_node";

/**
 * The class_name and extends statements *must* come first in the file, so we
 * preprocess the class to find them prior to our normal pass.
 */
const preprocessClassDecl = (node: ts.ClassDeclaration, props: ParseState) => {
  let extendsFrom = "";

  if (node.heritageClauses) {
    // TODO: Ensure there's only one of each here

    const clause = node.heritageClauses[0] as ts.HeritageClause;
    const type = clause.types[0];

    extendsFrom = type.getText();
  }

  return `${extendsFrom ? `extends ${extendsFrom}` : ''}
${props.isAutoload ? '' : `class_name ${node.name?.getText()}\n`}`
};

export const parseSourceFile = (node: ts.SourceFile, props: ParseState): ParseNodeType => {
  const { statements } = node;
  const sourceInfo = props.project.sourceFiles.find(file => file.tsFullPath === node.fileName);

  if (!sourceInfo) {
    throw new Error(`Error!
Can't find associated sourceInfo
  for ${node.fileName}`);
  }

  const classDecl = statements.find(statement => statement.kind === SyntaxKind.ClassDeclaration) as ts.ClassDeclaration;
  const parsedStatements = statements.map(statement => parseNode(statement, props));

  return {
    content: `
${preprocessClassDecl(classDecl, props)} 
${parsedStatements.flatMap(x => x.hoistedEnumImports ?? []).join('\n')}
${parsedStatements.map(x => x.content).join('')}
`.trim()
  };
}
