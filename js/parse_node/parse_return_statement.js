"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReturnStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseReturnStatement = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.expression,
        props,
        parsedStrings: (expr) => `return ${expr}`,
    });
};
exports.parseReturnStatement = parseReturnStatement;
//# sourceMappingURL=parse_return_statement.js.map