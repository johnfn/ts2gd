import ts from "typescript"
import { parseNodeToString, ParseState } from "../parse_node"


/*
 * Like func set_text(s: string, c: Color)
 *                    ^^^^^^^^^^^^^^^^^^^
 */
export const parseParameterList = (list: ts.NodeArray<ts.ParameterDeclaration>, props: ParseState) => {
  let result = "";

  for (let i = 0; i < list.length; i++) {
    const param = list[i];
    let paramString = parseNodeToString(param, props);

    if (param.initializer) {
      paramString = paramString + ` = ${parseNodeToString(param.initializer, props)}`;
    }

    result += paramString + (i === list.length - 1 ? "" : ", ");
  }

  return result;
}