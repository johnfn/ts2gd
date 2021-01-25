"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSuperKeyword = void 0;
const parse_node_1 = require("../parse_node");
const parseSuperKeyword = (node, props) => {
    return parse_node_1.combine({ parent: node, nodes: [], props, content: () => `` });
};
exports.parseSuperKeyword = parseSuperKeyword;
//# sourceMappingURL=parse_super_keyword.js.map