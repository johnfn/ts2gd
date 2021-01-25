"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVariableStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseVariableStatement = (node, props) => {
    const modifiers = node.modifiers?.map(x => x.getText());
    // skip variable declarations; there's no code to generate here
    if (modifiers?.includes('declare')) {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            content: () => ""
        });
    }
    return parse_node_1.combine({
        parent: node,
        nodes: node.declarationList,
        props,
        content: list => list
    });
};
exports.parseVariableStatement = parseVariableStatement;
//# sourceMappingURL=parse_variable_statement.js.map