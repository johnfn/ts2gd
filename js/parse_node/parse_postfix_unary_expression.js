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
    let newIncrements = null;
    const result = parse_node_1.combine({
        parent: node,
        nodes: node.operand,
        props,
        parsedStrings: (operand) => {
            switch (node.operator) {
                case SyntaxKind.PlusPlusToken: {
                    newIncrements = {
                        type: "after",
                        line: `${operand} += 1`,
                        lineType: parse_node_1.ExtraLineType.Increment,
                    };
                    return `${operand}`;
                }
                case SyntaxKind.MinusMinusToken: {
                    newIncrements = {
                        type: "after",
                        line: `${operand} -= 1`,
                        lineType: parse_node_1.ExtraLineType.Decrement,
                    };
                    return `${operand}`;
                }
            }
        },
    });
    result.extraLines = [
        ...(newIncrements ? [newIncrements] : []),
        ...(result.extraLines ?? []),
    ];
    return result;
};
exports.parsePostfixUnaryExpression = parsePostfixUnaryExpression;
//# sourceMappingURL=parse_postfix_unary_expression.js.map