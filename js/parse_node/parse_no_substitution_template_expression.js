"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSanitizeText = exports.parseNoSubstitutionTemplateLiteral = void 0;
const parse_node_1 = require("../parse_node");
const parseNoSubstitutionTemplateLiteral = (node, props) => {
    const sanitizeText = (text) => {
        return text.replaceAll("\n", "\\n");
    };
    return parse_node_1.combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => `"${sanitizeText(node.text)}"`,
    });
};
exports.parseNoSubstitutionTemplateLiteral = parseNoSubstitutionTemplateLiteral;
exports.testSanitizeText = {
    ts: `
let foo = \`
woo
\`
  `,
    expected: `
var _foo = "\\nwoo\\n"
`,
};
//# sourceMappingURL=parse_no_substitution_template_expression.js.map