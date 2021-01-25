"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEmptyArrayLiteral = exports.testArrayLiteral = exports.parseArrayLiteralExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseArrayLiteralExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.elements,
        props,
        content: (...args) => `[${args.join(", ")}]`,
    });
};
exports.parseArrayLiteralExpression = parseArrayLiteralExpression;
// Tests
exports.testArrayLiteral = {
    ts: '[1, 2, 3]',
    expected: '[1, 2, 3]',
};
exports.testEmptyArrayLiteral = {
    ts: '[]',
    expected: '[]',
};
//# sourceMappingURL=parse_array_literal_expression.js.map