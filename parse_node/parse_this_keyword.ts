import ts, { ThisExpression } from "typescript";

export function parseThisKeyword(genericNode: ts.Node) {
  const node = genericNode as ThisExpression;

  return `self`;
}
