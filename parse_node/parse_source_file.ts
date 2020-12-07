import ts, { SyntaxKind } from "typescript";
import * as utils from "tsutils";
import { parseNodeToString, ParseState } from "../parse_node";

export const parseSourceFile = (node: ts.SourceFile, props: ParseState) => {
  const { statements } = node;
  let result = '';

  // props.project.sourceFiles.find(file => file.)

  console.log(node.fileName);

  props.usages = utils.collectVariableUsage(node);

  for (const statement of statements) {
    // The only VariableStatements outside of a class are for autoload classes, which
    // are only needed for Godot.
    if (statement.kind === SyntaxKind.VariableStatement) {
      continue;
    }

    let parsed = parseNodeToString(statement, props);

    result += parsed + "\n";
  }

  return result;
}
