import ts, { SyntaxKind } from "typescript";
import * as utils from "tsutils";
import { parseNodeToString, ParseState } from "../parse_node";

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

export const parseSourceFile = (node: ts.SourceFile, props: ParseState) => {
  const { statements } = node;
  let result = '';

  const sourceInfo = props.project.sourceFiles.find(file => file.tsFullPath === node.fileName);

  if (!sourceInfo) {
    throw new Error(`Error!
Can't find associated sourceInfo
  for ${node.fileName}`);
  }

  const newProps: ParseState = {
    ...props,

    isAutoload: sourceInfo.isAutoload,
    usages: utils.collectVariableUsage(node),
  };

  const classDecl = statements.find(statement => statement.kind === SyntaxKind.ClassDeclaration) as ts.ClassDeclaration;

  result += preprocessClassDecl(classDecl, newProps);

  for (const statement of statements) {
    // The only VariableStatements outside of a class are for autoload classes, which
    // are only needed for TypeScript.
    if (statement.kind === SyntaxKind.VariableStatement) {
      continue;
    }

    let parsed = parseNodeToString(statement, props);

    result += parsed + "\n";
  }

  return result;
}
