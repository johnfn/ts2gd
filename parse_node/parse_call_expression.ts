import ts from "typescript";
const { SyntaxKind } = ts;
import { program } from "../main";
import { parseNodeToString, ParseState } from "../parse_node";

export function parseCallExpression(node: ts.CallExpression, props: ParseState) {
  // TODO: Work out a better way to determine if something is a call expression
  if (node.expression.getText() === "super") {
    return "";
  }

  let lhs = parseNodeToString(node.expression, props);
  let rhs = node.arguments.map(arg => parseNodeToString(arg, props)).join(", ");

  if (lhs === "Yield") {
    lhs = "yield";
  }

  // This statement compiles vec.add(vec2) into vec + vec2.

  // node = [[ a.b(c) ]]
  if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {

    // prop = [[ a.b ]](c)
    const prop = node.expression as ts.PropertyAccessExpression;
    const functionName = prop.name.getText();

    const type = program.getTypeChecker().getTypeAtLocation(prop.expression);
    const stringType = program.getTypeChecker().typeToString(type);
    const isVector = (
      stringType === "Vector2" ||
      stringType === "Vector2i" ||
      stringType === "Vector3" ||
      stringType === "Vector3i"
    );

    const newLhs = parseNodeToString(prop.expression, props);

    if (functionName === "add" && isVector) return `${newLhs} + ${rhs}`;
    if (functionName === "sub" && isVector) return `${newLhs} - ${rhs}`;
    if (functionName === "mul" && isVector) return `${newLhs} * ${rhs}`;
    if (functionName === "div" && isVector) return `${newLhs} / ${rhs}`;
  }

  return `${lhs}(${rhs})`
}
