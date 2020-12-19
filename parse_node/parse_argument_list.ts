import ts from "typescript"
import { combine, parseNode, ParseNodeType, ParseState } from "../parse_node"
import { notEmpty } from "../ts_utils";

/**
 * Like this.set_text("blah", Color.red)
 *                    ^^^^^^^^^^^^^^^^^
 */
export const parseArgumentList = (parent: ts.Node, list: ts.NodeArray<ts.Expression> | undefined, props: ParseState): ParseNodeType => {
  if (!list) {
    return { content: "" };
  }

  return combine({ parent, nodes: [...list], props, content: (...args) => `${args.join(", ")}` });
}