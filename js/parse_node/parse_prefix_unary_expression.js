"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrefixUnaryExpression = void 0;
const typescript_1 = __importDefault(require("typescript"));
const { SyntaxKind } = typescript_1.default;
const parse_node_1 = require("../parse_node");
const parsePrefixUnaryExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.operand,
        props,
        content: (operand) => {
            switch (node.operator) {
                case SyntaxKind.PlusPlusToken:
                    return `(${operand} += 1)`;
                case SyntaxKind.MinusMinusToken:
                    return `(${operand} -= 1)`;
                case SyntaxKind.PlusToken:
                    return `+${operand}`;
                case SyntaxKind.MinusToken:
                    return `-${operand}`;
                case SyntaxKind.TildeToken:
                    // TODO: Error?
                    return `~${operand}`;
                case SyntaxKind.ExclamationToken:
                    return `not ${operand}`;
            }
        },
    });
};
exports.parsePrefixUnaryExpression = parsePrefixUnaryExpression;
//# sourceMappingURL=parse_prefix_unary_expression.js.map