import ts from "typescript";
import { program } from "../main";

import { ParseNodeType, ParseState } from "../parse_node"
import { getImportResPathForEnum } from "./parse_import_declaration";

export const parseEnumDeclaration = (node: ts.EnumDeclaration, props: ParseState): ParseNodeType => {
  let result = `enum ${node.name.text} {\n`;

  for (const m of node.members) {
    result += `  ${m.name.getText()},\n`;
  }

  result += '}';

  const enumType = program.getTypeChecker().getTypeAtLocation(node);
  const {
    resPath,
    enumName,
  } = getImportResPathForEnum(enumType, props);

  let importString = `const ${enumName} = preload("${resPath}")`

  return {
    content: importString,
    enums: [{
      content: result,
      name: node.name.text,
    }],
  };
}
