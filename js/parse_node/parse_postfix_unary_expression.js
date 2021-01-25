"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePostfixUnaryExpression = void 0;
const typescript_1 = __importDefault(require("typescript"));
const { SyntaxKind } = typescript_1.default;
const parse_node_1 = require("../parse_node");
const parsePostfixUnaryExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.operand,
        props,
        content: (operand) => {
            switch (node.operator) {
                case SyntaxKind.PlusPlusToken:
                    return `((${operand} += 1) - 1)`;
                case SyntaxKind.MinusMinusToken:
                    return `((${operand} -= 1) + 1)`;
            }
        },
    });
};
exports.parsePostfixUnaryExpression = parsePostfixUnaryExpression;
//# sourceMappingURL=parse_postfix_unary_expression.js.map