"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseElementAccessExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseElementAccessExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: [node.expression, node.argumentExpression],
        props,
        parsedStrings: (lhs, rhs) => `${lhs}[${rhs}]`,
    });
};
exports.parseElementAccessExpression = parseElementAccessExpression;
//# sourceMappingURL=parse_element_access_expression.js.map