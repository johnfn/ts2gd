import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState, parseNodeToString, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseObjectLiteralExpression = (node: ts.ObjectLiteralExpression, props: ParseState): ParseNodeType => {
  if (node.properties.length === 0) {
    return combine({ parent: node, nodes: [], props, content: () => '{}' });
  }

  let result = '{\n';

  for (const prop of node.properties) {
    if (prop.kind === SyntaxKind.PropertyAssignment) {
      result += `  ${props.indent}"${prop.name.getText()}": ${parseNodeToString(prop.initializer, props)},\n`;
    } else if (prop.kind === SyntaxKind.ShorthandPropertyAssignment) {
      const shorthandProp = prop as ts.ShorthandPropertyAssignment;
      result += `  ${props.indent}"${shorthandProp.name.getText()}": ${parseNodeToString(shorthandProp.name, props)},\n`;
    } else {
      throw new Error("Unknown property in object.");
    }
  }

  result += `${props.indent}}`;

  return combine({ parent: node, nodes: [], props, content: () => result });
}
