"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNoParensThisCausesAGodotBug = exports.parseParenthesizedExpression = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const parseParenthesizedExpression = (node, props) => {
    if (node.expression.kind === typescript_1.SyntaxKind.AsExpression) {
        return parse_node_1.combine({
            parent: node,
            nodes: node.expression,
            props,
            parsedStrings: (expr) => `${expr}`,
        });
    }
    return parse_node_1.combine({
        parent: node,
        nodes: node.expression,
        props,
        parsedStrings: (expr) => `(${expr})`,
    });
};
exports.parseParenthesizedExpression = parseParenthesizedExpression;
// Specifically, (my_function)() is invalid Godot syntax.
exports.testNoParensThisCausesAGodotBug = {
    ts: `
(foo as any)()
  `,
    expected: `
foo()
  `,
};
//# sourceMappingURL=parse_parenthesized_expression.js.map