import ts, { StringLiteral } from "typescript";

export function parseStringLiteral(genericNode: ts.Node) {
  const node = genericNode as StringLiteral;

  return `"${node.text}"`;
}
