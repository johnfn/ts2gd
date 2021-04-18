"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNewlineLiteral = exports.parseStringLiteral = void 0;
const parse_node_1 = require("../parse_node");
const parseStringLiteral = (node, props) => {
    let text = node.text;
    // TODO: I'm sure there's a better way to do this.
    text = text.replaceAll("\n", "\\n");
    return parse_node_1.combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => `"${text}"`,
    });
};
exports.parseStringLiteral = parseStringLiteral;
exports.testNewlineLiteral = {
    ts: `
let d = "\\n"
  `,
    expected: `
var _d = "\\n"
`,
};
//# sourceMappingURL=parse_string_literal.js.map