import ts from "typescript";
import { ParseState } from "../parse_node";

// This is something like "type Blah = ...". There is nothing to do here.
export function parseTypeAliasDeclaration(node: ts.TypeAliasDeclaration, props: ParseState) {
  return "";
}
