import ts, { ForOfStatement } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseForOfStatement(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ForOfStatement;
  const newProps = { ...props, indent: props.indent + "  " };

  const initializedVariable = node.initializer.getChildAt(1);

  return `${props.indent}for ${initializedVariable.getText()} in ${parseNodeToString(node.expression, props)}:\n${parseNodeToString(node.statement, newProps)}`;
}
