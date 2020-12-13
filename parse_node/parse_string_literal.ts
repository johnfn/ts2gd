import ts from "typescript";

export function parseStringLiteral(genericNode: ts.Node) {
  const node = genericNode as ts.StringLiteral;

  return `"${node.text}"`;
}
