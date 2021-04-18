"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFloat = exports.testInt = exports.parseNumericLiteral = void 0;
const parse_node_1 = require("../parse_node");
const parseNumericLiteral = (node, props) => {
    // node.text has some weird edge cases e.g. "6.1" gives "6"!
    return parse_node_1.combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => node.getText(),
    });
};
exports.parseNumericLiteral = parseNumericLiteral;
exports.testInt = {
    ts: `
let x = 1
  `,
    expected: `
var _x: int = 1
  `,
};
exports.testFloat = {
    ts: `
let x = 1.0
  `,
    expected: `
var _x: float = 1.0
  `,
};
//# sourceMappingURL=parse_numeric_literal.js.map