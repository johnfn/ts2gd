import ts, { SyntaxKind } from "typescript";
import { combine, parseNode, ParseState } from "../parse_node";
import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseCallExpression = (node: ts.CallExpression, props: ParseState): ParseNodeType => {
  // TODO: Work out a better way to determine if something is a call expression
  if (node.expression.getText() === "super") {
    return combine({ parent: node, nodes: node.expression, props, content: () => "" });
  }

  // This block compiles vec.add(vec2) into vec + vec2.

  // node = [[ a.b(c) ]]
  if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {

    // prop = [[ a.b ]](c)
    const prop = node.expression as ts.PropertyAccessExpression;
    const functionName = prop.name.getText();

    const type = props.program.getTypeChecker().getTypeAtLocation(prop.expression);
    const stringType = props.program.getTypeChecker().typeToString(type);
    console.log(stringType);
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
        nodes: [node.expression, node.arguments[0]],
        props,
        content: (exp, arg) => `${exp} ${operator} ${arg}`,
      });
    }
  }

  return combine({
    parent: node, nodes: [node.expression, ...node.arguments], props, content: (expr, ...args) => {
      if (expr === "Yield")
        expr = "yield";

      return `${expr}(${args.join(', ')})`;
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

