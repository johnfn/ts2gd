import ts from "typescript"
import { parseNodeToString, ParseState } from "../parse_node"

/**
 * Like this.set_text("blah", Color.red)
 *                    ^^^^^^^^^^^^^^^^^
 */
export const parseArgumentList = (list: ts.NodeArray<ts.Expression> | undefined, props: ParseState) => {
  if (!list) {
    return "";
  }

  return list.map(param => parseNodeToString(param, props)).join(', ')
}