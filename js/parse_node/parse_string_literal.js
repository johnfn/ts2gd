"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStringLiteral = void 0;
const parse_node_1 = require("../parse_node");
const parseStringLiteral = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: [],
        props,
        content: () => `"${node.text}"`
    });
};
exports.parseStringLiteral = parseStringLiteral;
//# sourceMappingURL=parse_string_literal.js.map