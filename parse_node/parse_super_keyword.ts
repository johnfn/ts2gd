import ts from "typescript";
import { combine, ParseNodeType, ParseState } from "../parse_node"

export const parseSuperKeyword = (node: ts.SuperExpression, props: ParseState): ParseNodeType => {
  return combine(node, [], props, () => ``);
}
