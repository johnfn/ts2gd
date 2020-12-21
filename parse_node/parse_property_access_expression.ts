import ts, { SyntaxKind } from "typescript";
import { combine, parseNode, ParseNodeType, ParseState } from "../parse_node";
import { Test } from "../test";
import { isDictionary, isEnumType } from "../ts_utils";


export const parsePropertyAccessExpression = (node: ts.PropertyAccessExpression, props: ParseState): ParseNodeType => {
  const leftType = props.program.getTypeChecker().getTypeAtLocation(node.expression);

  // Compile things like KeyList.KEY_SPACE into KEY_SPACE
  if (isEnumType(leftType)) {
    const symbol = leftType.getSymbol()!;
    const declarations = symbol.declarations;
    const sourceFiles = declarations.map(d => d.getSourceFile().fileName);
    const isGlobal = !!sourceFiles.find(f => f.includes("@globals.d.ts"))

    if (isGlobal) {
      return parseNode(node.name, props);
    }
  }

  return combine({
    parent: node,
    nodes: [node.expression, node.name],
    props,
    content: (lhs, rhs) => {
      // TS requires you to write this.blah everywhere, but Godot does not, and in fact
      // even generates a warning since it cant prove that self.blah is real.
      if (lhs === "self") {
        return rhs;
      }

      if (isDictionary(leftType)) {
        // In TS, dictionary access is indistinguishable from normal property access
        // In Godot, it could be dict.has("key") if we're checking if the key
        // is actually in the dict or not.
        // We need to walk up the AST to figure out which of the two it is.
        let parent: ts.Node = node.parent;

        while (parent.kind === SyntaxKind.PrefixUnaryExpression ||
          parent.kind === SyntaxKind.PostfixUnaryExpression) {
          parent = parent.parent;
        }

        if (parent.kind === SyntaxKind.IfStatement ||
          parent.kind === SyntaxKind.SwitchStatement ||
          parent.kind === SyntaxKind.WhileStatement ||
          parent.kind === SyntaxKind.ForStatement) {
          return `${lhs}.has("${rhs}")`;
        }

        if (rhs === "type") {
          return `${lhs}["${rhs}"]`;
        }

        return `${lhs}.${rhs}`;
      }

      return `${lhs}.${rhs}`;
    }
  });

}

export const testAccess: Test = {
  ts: `
let foo = { bar: 1 }
print(foo.bar)
  `,
  expected: `
var foo = { "bar": 1 }
print(foo.bar)
  `,
};

export const testAccessRewriting: Test = {
  ts: `
let foo = { bar: 1 }
if (foo.bar) {
  print (foo.bar)
}
  `,
  expected: `
var foo = { "bar": 1 }
if foo.has("bar"):
  print(foo.bar)
  `,
};