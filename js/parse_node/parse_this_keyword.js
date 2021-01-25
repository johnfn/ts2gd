"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseThisKeyword = void 0;
const parse_node_1 = require("../parse_node");
const parseThisKeyword = (node, props) => {
    return parse_node_1.combine({ parent: node, nodes: [], props, content: () => `self` });
};
exports.parseThisKeyword = parseThisKeyword;
//# sourceMappingURL=parse_this_keyword.js.map