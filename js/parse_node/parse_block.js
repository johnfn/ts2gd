"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBlock = void 0;
const parse_node_1 = require("../parse_node");
const parseBlock = (node, props) => {
    if (node.statements.length !== 0) {
        return parse_node_1.combine({
            parent: node,
            nodes: node.statements,
            props,
            parsedStrings: (...parsed) => parsed.join(""),
        });
    }
    else {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            parsedStrings: () => "pass\n",
        });
    }
};
exports.parseBlock = parseBlock;
//# sourceMappingURL=parse_block.js.map