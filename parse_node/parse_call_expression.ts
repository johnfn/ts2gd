import ts, { SyntaxKind } from "typescript";
import { combine, ParseState } from "../parse_node";
import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseCallExpression = (node: ts.CallExpression, props: ParseState): ParseNodeType => {
  if (node.expression.kind === SyntaxKind.SuperKeyword) {
    return combine({
      parent: node,
      nodes: node.expression,
      props,
      content: () => ""
    });
  }

  // This block compiles vec.add(vec2) into vec + vec2.

  // node = [[ a.b(c) ]]
  if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {

    // prop = [[ a.b ]](c)
    const prop = node.expression as ts.PropertyAccessExpression;
    const functionName = prop.name.getText();

    const type = props.program.getTypeChecker().getTypeAtLocation(prop.expression);
    const stringType = props.program.getTypeChecker().typeToString(type);
    const isVector = (
      stringType === "Vector2" ||
      stringType === "Vector2i" ||
      stringType === "Vector3" ||
      stringType === "Vector3i"
    );

    let operator: undefined | string = undefined;

    if (functionName === "add" && isVector) operator = "+";
    if (functionName === "sub" && isVector) operator = "-";
    if (functionName === "mul" && isVector) operator = "*";
    if (functionName === "div" && isVector) operator = "/";

    if (operator !== undefined) {
      return combine({
        parent: node,
        nodes: [prop.expression, node.arguments[0]],
        props,
        content: (exp, arg) => `${exp} ${operator} ${arg}`,
      });
    }
  }

  const decls = props.program.getTypeChecker().getTypeAtLocation(node.expression).symbol?.declarations;
  const isArrowFunction = decls && (decls[0].kind === SyntaxKind.ArrowFunction && decls[0].getSourceFile() === node.getSourceFile());

  return combine({
    parent: node, nodes: [node.expression, ...node.arguments], props, content: (expr, ...args) => {
      if (expr === "Yield") {
        expr = "yield";
      }

      if (isArrowFunction) {
        return `${expr}.call_func(${args.join(', ')})`;
      } else {
        return `${expr}(${args.join(', ')})`;
      }
    }
  });
}

export const testBasicCall: Test = {
  ts: `foo("bar")`,
  expected: `foo("bar")`,
};

export const testAddVec: Test = {
  ts: `const v1: Vector2; const v2: Vector2; v1.add(v2)`,
  expected: `
var v1
var v2
v1 + v2
`,
};

export const testAddVec2: Test = {
  expectFail: true,
  ts: `const foo: { v: Vector2; }; const v2: Vector2; foo.v.add(v2)`,
  expected: `
var foo
var v2
foo['v'] + v2
`,
};

export const testArrowFunction: Test = {
  ts: `
const test = () => 5;
test()  
  `,
  expected: `
func func1():
  return 5
var test = funcref(self, "func1")
test.call_func()
`,
};