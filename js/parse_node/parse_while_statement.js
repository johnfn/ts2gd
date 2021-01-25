"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPassWhile = exports.parseWhileStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseWhileStatement = (node, props) => {
    const newProps = { ...props, mostRecentControlStructureIsSwitch: false };
    props.scope.enterScope();
    const result = parse_node_1.combine({
        parent: node,
        nodes: [node.expression, node.statement],
        props: newProps,
        addIndent: true,
        content: (expr, statement) => `
while ${expr}:
  ${statement}
`,
    });
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
//# sourceMappingURL=parse_while_statement.js.map