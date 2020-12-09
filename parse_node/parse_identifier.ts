import ts, { Identifier } from "typescript";

export function parseIdentifier(genericNode: ts.Node) {
  const node = genericNode as Identifier;
  const name = node.text;

  if (name === "undefined") {
    return "null"
  } else {
    return node.text;
  }
}
