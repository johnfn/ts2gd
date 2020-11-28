import ts, { Identifier } from "typescript";

export function parseIdentifier(genericNode: ts.Node) {
  const node = genericNode as Identifier;

  return node.text;
}
