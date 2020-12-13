import ts from "typescript";

export function parseThisKeyword(genericNode: ts.Node) {
  const node = genericNode as ts.ThisExpression;

  return `self`;
}
