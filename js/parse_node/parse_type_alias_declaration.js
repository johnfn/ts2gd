"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTypeAliasDeclaration = void 0;
const parse_node_1 = require("../parse_node");
// This is something like "type Blah = ...". There is nothing to do here.
const parseTypeAliasDeclaration = (node, props) => {
    return parse_node_1.combine({ parent: node, nodes: [], props, parsedStrings: () => "" });
};
exports.parseTypeAliasDeclaration = parseTypeAliasDeclaration;
//# sourceMappingURL=parse_type_alias_declaration.js.map