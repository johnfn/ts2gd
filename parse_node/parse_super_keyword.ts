import ts from "typescript";

export function parseSuperKeyword(genericNode: ts.Node) {
  const node = genericNode as ts.SuperExpression;

  return "";
}
