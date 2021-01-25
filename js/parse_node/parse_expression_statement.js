"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testExpressionStatement = exports.parseExpressionStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseExpressionStatement = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.expression,
        props,
        content: expr => expr
    });
};
exports.parseExpressionStatement = parseExpressionStatement;
exports.testExpressionStatement = {
    ts: `
1 + 1
  `,
    expected: `
1 + 1
  `,
};
//# sourceMappingURL=parse_expression_statement.js.map