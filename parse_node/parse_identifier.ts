import ts from "typescript";

export function parseIdentifier(genericNode: ts.Node) {
  const node = genericNode as ts.Identifier;
  const name = node.text;

  if (name === "undefined") {
    return "null"
  } else {
    return node.text;
  }
}
