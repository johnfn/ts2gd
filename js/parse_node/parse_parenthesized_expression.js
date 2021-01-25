"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParenthesizedExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseParenthesizedExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.expression,
        props,
        content: expr => `(${expr})`,
    });
};
exports.parseParenthesizedExpression = parseParenthesizedExpression;
//# sourceMappingURL=parse_parenthesized_expression.js.map