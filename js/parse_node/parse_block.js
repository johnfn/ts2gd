"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBlock = void 0;
const parse_node_1 = require("../parse_node");
const parseBlock = (node, props) => {
    /**
     * The reason we can't `pass` here if node.statements.length === 0 is because
     * a default parameter could add extraLines, which means that the function
     * would not actually have an empty body - but there's no easy way to konw
     * that from here.
     */
    return parse_node_1.combine({
        parent: node,
        nodes: node.statements,
        props,
        parsedStrings: (...parsed) => {
            return parsed.join("");
        },
    });
};
exports.parseBlock = parseBlock;
//# sourceMappingURL=parse_block.js.map