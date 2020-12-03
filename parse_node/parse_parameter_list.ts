import ts from "typescript"
import { parseNodeToString, ParseState } from "../parse_node"

/*
 * Like set_text(s: string, c: Color)
 *               ^^^^^^^^^^^^^^^^^^^
 */
export const parseParameterList = (list: ts.NodeArray<ts.ParameterDeclaration>, props: ParseState) => {
  return list.map(param => parseNodeToString(param, props)).join(', ')
}