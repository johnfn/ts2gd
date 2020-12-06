import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";
import { getPreciseInitializerType } from "../ts_utils";

export function parseVariableStatement(node: ts.VariableStatement, props: ParseState) {
  const modifiers = node.modifiers?.map(x => x.getText());

  // skip variable declarations; there's no code to generate here
  if (modifiers?.includes('declare')) {
    return '';
  }


  return node.declarationList.declarations.map(declaration => {
    const type = getPreciseInitializerType(declaration.initializer);
    const usages = props.usages.get(declaration.name as ts.Identifier);
    const isUnused = usages?.uses.length === 0;

    if (type) {
      return `${props.indent}var ${isUnused ? '_' : ''}${declaration.name.getText()}: ${type} = ${declaration.initializer ? parseNodeToString(declaration.initializer, props) : ""}\n`
    } else {
      return `${props.indent}var ${isUnused ? '_' : ''}${declaration.name.getText()} = ${declaration.initializer ? parseNodeToString(declaration.initializer, props) : ""}\n`
    }
  }).join("");
}