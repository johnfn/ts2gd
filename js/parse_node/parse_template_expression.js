"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testStringInterpolation = exports.parseTemplateExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseTemplateExpression = (node, props) => {
    const sanitizeText = (text) => {
        return text.replaceAll("\n", "\\n");
    };
    return parse_node_1.combine({
        parent: node,
        nodes: node.templateSpans.map((span) => span.expression),
        props,
        parsedStrings: (...exprs) => {
            let result = "";
            result += '"' + sanitizeText(node.head.text) + '"';
            for (let i = 0; i < exprs.length; i++) {
                result += ` + str(${exprs[i]})`;
                result +=
                    ' + "' + sanitizeText(node.templateSpans[i].literal.text) + '"';
            }
            return result;
        },
    });
};
exports.parseTemplateExpression = parseTemplateExpression;
exports.testStringInterpolation = {
    ts: `
let foo = \`blah \${ 10 }  \${ 20 }\`
  `,
    expected: `
var _foo = "blah " + str(10) + "  " + str(20) + ""
`,
};
//# sourceMappingURL=parse_template_expression.js.map