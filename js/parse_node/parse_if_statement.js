"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testElseIf = exports.testIf = exports.parseIfStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseIfStatement = (node, props) => {
    props.scope.enterScope();
    let result = parse_node_1.combine({
        addIndent: true,
        parent: node,
        nodes: [node.expression, node.thenStatement, node.elseStatement],
        props,
        parsedStrings: (expression, thenStatement, elseStatement) => `
if ${expression}:
  ${thenStatement}${elseStatement
            ? `else:
  ${elseStatement}`
            : ""}`,
    });
    props.scope.leaveScope();
    return result;
};
exports.parseIfStatement = parseIfStatement;
exports.testIf = {
    ts: `
if (true) {
  print(1)
} else {
  print(0)
}
  `,
    expected: `
if true:
  print(1)
else:
  print(0)
  `,
};
exports.testElseIf = {
    ts: `
if (true) {
  print(1)
} else if ('maybe') {
  print(2)
} else {
  print(0)
}
  `,
    expected: `
if true:
  print(1)
else:
  if "maybe":
    print(2)
  else:
    print(0)
  `,
};
//# sourceMappingURL=parse_if_statement.js.map