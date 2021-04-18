"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testKeyword = exports.parseVariableDeclarationList = void 0;
const parse_node_1 = require("../parse_node");
const parseVariableDeclarationList = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.declarations,
        props,
        parsedStrings: (...decls) => decls.join("\n"),
    });
};
exports.parseVariableDeclarationList = parseVariableDeclarationList;
exports.testKeyword = {
    ts: `
let a = 1, b = 2
print(a)
print(b)
  `,
    expected: `
var a: int = 1
var b: int = 2
print(a)
print(b)
  `,
};
//# sourceMappingURL=parse_variable_declaration_list.js.map