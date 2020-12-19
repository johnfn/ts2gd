import ts from "typescript"
import { combine, parseNode, ParseState } from "../parse_node"


/*
 * Like func set_text(s: string, c: Color)
 *                    ^^^^^^^^^^^^^^^^^^^
 */
export const parseParameterList = (parent: ts.Node, list: ts.NodeArray<ts.ParameterDeclaration>, props: ParseState) => {
  return combine({ parent, nodes: list, props, content: (...params) => params.join(', ') });
}