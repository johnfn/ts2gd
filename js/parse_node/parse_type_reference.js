"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTypeReference = void 0;
const parse_node_1 = require("../parse_node");
const parseTypeReference = (node, props) => {
    return parse_node_1.combine({ parent: node, nodes: [], props, content: () => node.getText() });
};
exports.parseTypeReference = parseTypeReference;
//# sourceMappingURL=parse_type_reference.js.map