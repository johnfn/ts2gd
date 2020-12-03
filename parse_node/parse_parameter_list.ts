import ts from "typescript"
import { parseNodeToString, ParseState } from "../parse_node"

export const parseParameterList = (list: ts.NodeArray<ts.ParameterDeclaration>, props: ParseState) => {
  return list.map(param => parseNodeToString(param, props)).join(', ')
}