import ts from "typescript";
import { combine, ParseState } from "../parse_node";
import { ParseNodeType } from "../parse_node"

// This is something like "type Blah = ...". There is nothing to do here.
export const parseTypeAliasDeclaration = (node: ts.TypeAliasDeclaration, props: ParseState): ParseNodeType => {
  return combine(node, [], props, () => "");
}
