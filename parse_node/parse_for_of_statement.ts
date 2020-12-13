import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState, parseNodeToString } from "../parse_node";

export function parseForOfStatement(genericNode: ts.Node, props: ParseState) {
  const node = genericNode as ts.ForOfStatement;
  const newProps = { ...props, indent: props.indent + "  " };

  const initializer = node.initializer;

  if (initializer.kind === SyntaxKind.VariableDeclarationList) {
    const initializerNode = initializer as ts.VariableDeclarationList;
    const decl = initializerNode.declarations[0];

    if (initializerNode.declarations.length > 1) {
      // TODO: Handle this case
      throw new Error("Uh oh! For...of with > 1 declaration");
    }

    const usages = props.usages.get(decl.name as ts.Identifier);
    const isUnused = usages?.uses.length === 0

    return `${props.indent}for ${isUnused ? "_" : ""}${decl.name.getText()} in ${parseNodeToString(node.expression, props)}:\n${parseNodeToString(node.statement, newProps)}`;
  } else {
    const initializedVariable = node.initializer.getChildAt(1);

    return `${props.indent}for ${initializedVariable.getText()} in ${parseNodeToString(node.expression, props)}:\n${parseNodeToString(node.statement, newProps)}`;
  }
}
