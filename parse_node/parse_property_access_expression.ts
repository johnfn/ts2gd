import ts, { SyntaxKind } from "typescript";
import { program } from "../main";
import { parseNodeToString, ParseState } from "../parse_node";
import { isDictionary, isEnumType, syntaxToKind } from "../ts_utils";

export const parsePropertyAccessExpression = (node: ts.PropertyAccessExpression, props: ParseState) => {
  const leftType = program.getTypeChecker().getTypeAtLocation(node.expression);

  // Compile things like KeyList.KEY_SPACE into KEY_SPACE
  if (isEnumType(leftType)) {
    const symbol = leftType.getSymbol()!;
    const declarations = symbol.declarations;
    const sourceFiles = declarations.map(d => d.getSourceFile().fileName);

    const isGlobal = !!sourceFiles.find(f => f.includes("@globals.d.ts"))

    if (isGlobal) {
      return parseNodeToString(node.name, props);
    }
  }

  const lhs = parseNodeToString(node.expression, props);
  const rhs = parseNodeToString(node.name, props);

  // TS requires you to write this.blah everywhere, but Godot does not, and in fact
  // even generates a warning since it cant prove that self.blah is real.
  if (lhs === 'self') {
    return rhs;
  }

  if (isDictionary(leftType)) {
    // In TS, dictionary access is indistinguishable from normal property access
    // In Godot, it's dict.get("key") or dict.has("key")

    // We need to walk up the AST to figure out which of the two it is.
    let parent: ts.Node = node.parent;

    while (
      parent.kind === SyntaxKind.PrefixUnaryExpression ||
      parent.kind === SyntaxKind.PostfixUnaryExpression
    ) {
      parent = parent.parent;
    }

    if (parent.kind === SyntaxKind.IfStatement ||
      parent.kind === SyntaxKind.SwitchStatement ||
      parent.kind === SyntaxKind.WhileStatement ||
      parent.kind === SyntaxKind.ForStatement) {
      return `${lhs}.has("${rhs}")`
    }

    return `${lhs}["${rhs}"]`;
  }

  return `${lhs}.${rhs}`;
}