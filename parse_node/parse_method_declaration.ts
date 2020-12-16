import ts from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"

export const parseMethodDeclaration = (node: ts.MethodDeclaration, props: ParseState): ParseNodeType => {
  const funcName = node.name.getText();

  return combine(node, [node.body, ...node.parameters], props, (body, ...params) => {
    let joinedParams = params.join(', ');

    // TODO: handle other built-in functions in the same way
    if (funcName === '_process' && joinedParams.trim().length === 0) {
      joinedParams = "_delta: float";
    }

    return `func ${funcName}(${joinedParams}):${body || " pass"}`;
  });
}