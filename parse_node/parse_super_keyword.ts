import ts, { SuperExpression } from "typescript";

export function parseSuperKeyword(genericNode: ts.Node) {
  const node = genericNode as SuperExpression;

  return "";
}
