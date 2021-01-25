"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUndefined = exports.parseIdentifier = void 0;
const parse_node_1 = require("../parse_node");
const parseIdentifier = (node, props) => {
    const name = node.text;
    if (name === "undefined") {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            content: () => "null",
        });
    }
    return parse_node_1.combine({
        parent: node,
        nodes: [],
        props,
        content: () => {
            const name = props.scope.getName(node);
            if (!name) {
                return node.text;
            }
            return name;
        },
    });
};
exports.parseIdentifier = parseIdentifier;
exports.testUndefined = {
    ts: `
let x = undefined
  `,
    expected: `
var _x = null
  `,
};
//# sourceMappingURL=parse_identifier.js.map