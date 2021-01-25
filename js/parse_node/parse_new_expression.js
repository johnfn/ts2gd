"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNewExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseNewExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: [node.expression, ...(node.arguments ?? [])],
        props,
        content: (expr, ...args) => `${expr}(${args.join(', ')})`,
    });
};
exports.parseNewExpression = parseNewExpression;
//# sourceMappingURL=parse_new_expression.js.map