import ts, { SyntaxKind } from "typescript";
import { ParseState, parseNodeToString, addIndent } from "../parse_node";

export function parseObjectLiteralExpression(node: ts.ObjectLiteralExpression, props: ParseState) {
  let result = '{\n';

  for (const prop of node.properties) {
    if (prop.kind === SyntaxKind.PropertyAssignment) {
      result += `"  ${props.indent}${prop.name.getText()}": ${parseNodeToString(prop.initializer, addIndent(props))},\n`;
    } else {
      throw new Error("Unknown property in object.");
    }
  }

  result += '}\n';

  return result;
}
