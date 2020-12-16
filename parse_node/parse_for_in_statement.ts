import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseForInStatement = (node: ts.ForInStatement, props: ParseState): ParseNodeType => {
  const initializedVariable = node.initializer.getChildAt(1);
  const initializedVariableName = initializedVariable.getText(); // TODO: There is probably a better way to do this.

  return combine(node, [node.expression, node.statement], props, (expr, statement) => `for ${initializedVariableName} in ${expr}:\n${statement}`
  );
}
