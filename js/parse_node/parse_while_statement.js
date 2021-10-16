"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testWhileConditionPreIncrement = exports.testWhileConditionPostIncrement = exports.testPassWhile = exports.parseWhileStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseWhileStatement = (node, props) => {
    const newProps = { ...props, mostRecentControlStructureIsSwitch: false };
    props.scope.enterScope();
    const result = parse_node_1.combine({
        parent: node,
        nodes: [node.expression, node.statement],
        props: newProps,
        addIndent: true,
        parsedObjs: (expr, statement) => {
            const beforeLines = expr.extraLines
                ?.filter((line) => line.type === "before")
                .map((e) => e.line)
                .join("\n") ?? "";
            const afterLines = expr.extraLines
                ?.filter((line) => line.type === "after")
                .map((e) => e.line)
                .join("\n") ?? "";
            return `${beforeLines}
while ${expr.content}:
  ${afterLines}
  ${statement.content}
  ${beforeLines}
`;
        },
    });
    result.extraLines = [];
    props.scope.leaveScope();
    return result;
};
exports.parseWhileStatement = parseWhileStatement;
exports.testPassWhile = {
    ts: `
while (true);
  `,
    expected: `
while true:
  pass
  `,
};
exports.testWhileConditionPostIncrement = {
    ts: `
let x = 0
while (x++ < 10) {
  print(x)
}
  `,
    expected: `
var x: int = 0
while x < 10:
  x += 1
  print(x)
`,
};
exports.testWhileConditionPreIncrement = {
    ts: `
let x = 0
while (++x < 10) {
  print(x)
}
  `,
    expected: `
var x: int = 0
x += 1
while x < 10:
  print(x)
  x += 1
`,
};
//# sourceMappingURL=parse_while_statement.js.map