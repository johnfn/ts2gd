import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";

export function parseVariableStatement(node: ts.VariableStatement, props: ParseState) {
  const modifiers = node.modifiers?.map(x => x.getText());

  // skip variable declarations; there's no code to generate here
  if (modifiers?.includes('declare')) {
    return '';
  }

  return node.declarationList.declarations.map(declaration => {
    return `${props.indent}var ${declaration.name.getText()} = ${declaration.initializer ? parseNodeToString(declaration.initializer, props) : ""}\n`
  }).join("");
}