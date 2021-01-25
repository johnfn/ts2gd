"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVariableDeclarationList = void 0;
const parse_node_1 = require("../parse_node");
const parseVariableDeclarationList = (node, props) => {
    if (node.declarations.length > 1) {
        console.error("Cant handle so many declarations!");
    }
    return parse_node_1.combine({
        parent: node,
        nodes: node.declarations,
        props,
        content: (...decls) => decls.join(""),
    });
};
exports.parseVariableDeclarationList = parseVariableDeclarationList;
//# sourceMappingURL=parse_variable_declaration_list.js.map