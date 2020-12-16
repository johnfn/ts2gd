import ts from "typescript";

import { ParseNodeType, ParseState } from "../parse_node"

export const parseEnumDeclaration = (genericNode: ts.EnumDeclaration, props: ParseState): ParseNodeType => {
  const node = genericNode as ts.EnumDeclaration;
  let result = `enum ${node.name.text} {\n`;

  for (const m of node.members) {
    result += `  ${m.name.getText()},\n`;
  }

  result += '}';

  return {
    content: '',
    enums: [{
      content: result,
      name: node.name.text,
    }],
  };
}
