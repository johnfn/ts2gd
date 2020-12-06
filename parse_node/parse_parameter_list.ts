import ts from "typescript"
import { program } from "../main";
import { parseNodeToString, ParseState } from "../parse_node"


/*
 * Like set_text(s: string, c: Color)
 *               ^^^^^^^^^^^^^^^^^^^
 */
export const parseParameterList = (list: ts.NodeArray<ts.ParameterDeclaration>, props: ParseState) => {
  let result = "";

  for (let i = 0; i < list.length; i++) {
    const param = list[i];
    const paramString = parseNodeToString(param, props);

    result += paramString + (i === list.length - 1 ? "" : ", ");
  }

  return result;
}