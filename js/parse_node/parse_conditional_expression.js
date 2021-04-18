"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConditionalExpression = exports.parseConditionalExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseConditionalExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: [node.condition, node.whenTrue, node.whenFalse],
        props,
        parsedStrings: (cond, true_, false_) => {
            return `${true_} if ${cond} else ${false_}`;
        },
    });
};
exports.parseConditionalExpression = parseConditionalExpression;
exports.testConditionalExpression = {
    expectFail: true,
    ts: `const x = true ? 1 : 2`,
    expected: `var _x = 1 if true else 2`,
};
//# sourceMappingURL=parse_conditional_expression.js.map