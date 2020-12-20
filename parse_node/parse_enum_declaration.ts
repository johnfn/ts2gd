import ts from "typescript";

import { ParseNodeType, ParseState } from "../parse_node"
import { getImportResPathForEnum } from "./parse_import_declaration";

export const parseEnumDeclaration = (node: ts.EnumDeclaration, props: ParseState): ParseNodeType => {
  let result = `enum ${node.name.text} {\n`;

  for (const m of node.members) {
    result += `  ${m.name.getText()},\n`;
  }

  result += '}';

  const enumType = props.program.getTypeChecker().getTypeAtLocation(node);
  const {
    resPath,
    enumName,
  } = getImportResPathForEnum(enumType, props);

  const importString = `const ${enumName} = preload("${resPath}").${enumName}`;

  return {
    content: '',
    hoistedEnumImports: [importString],
    enums: [{
      content: result,
      name: node.name.text,
    }],
  };
}
