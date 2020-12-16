import ts from "typescript";
import { combine, parseNodeToString, ParseState } from "../parse_node";
import { getPreciseInitializerType } from "../ts_utils";

import { ParseNodeType } from "../parse_node"

export const parseVariableStatement = (node: ts.VariableStatement, props: ParseState): ParseNodeType => {
  const modifiers = node.modifiers?.map(x => x.getText());

  // skip variable declarations; there's no code to generate here
  if (modifiers?.includes('declare')) {
    return combine({ parent: node, nodes: [], props, content: () => "" });
  }

  return combine({ parent: node, nodes: node.declarationList, props, content: list => list });
};