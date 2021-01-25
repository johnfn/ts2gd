"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBreakStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseBreakStatement = (node, props) => {
    if (props.mostRecentControlStructureIsSwitch) {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            content: () => ""
        });
    }
    else {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            content: () => `break`,
        });
    }
};
exports.parseBreakStatement = parseBreakStatement;
//# sourceMappingURL=parse_break_statement.js.map