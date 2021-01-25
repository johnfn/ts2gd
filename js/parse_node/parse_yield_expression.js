"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseYieldExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseYieldExpression = (node, props) => {
    return parse_node_1.combine({ parent: node, nodes: node.expression, props, content: (expr) => `yield ${expr}` });
};
exports.parseYieldExpression = parseYieldExpression;
//# sourceMappingURL=parse_yield_expression.js.map