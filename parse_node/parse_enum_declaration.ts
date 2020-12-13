import ts from "typescript";

export function parseEnumDeclaration(genericNode: ts.Node) {
  const node = genericNode as ts.EnumDeclaration;
  let result = `enum ${node.name.text} {\n`;

  for (const m of node.members) {
    result += `  ${m.name.getText()},\n`;
  }

  result += '}';

  return result;
}
