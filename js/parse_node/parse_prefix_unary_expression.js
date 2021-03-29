"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPostincrement1 = exports.testPreincrement2 = exports.testPreincrement1 = exports.parsePrefixUnaryExpression = void 0;
const typescript_1 = __importDefault(require("typescript"));
const { SyntaxKind } = typescript_1.default;
const parse_node_1 = require("../parse_node");
const parsePrefixUnaryExpression = (node, props) => {
    let newIncrements = null;
    const result = parse_node_1.combine({
        parent: node,
        nodes: node.operand,
        props,
        content: (operand) => {
            switch (node.operator) {
                case SyntaxKind.PlusPlusToken: {
                    newIncrements = { type: "preincrement", variable: operand };
                    return `${operand}`;
                }
                case SyntaxKind.MinusMinusToken: {
                    newIncrements = { type: "predecrement", variable: operand };
                    return `${operand}`;
                }
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
    result.incrementState = [
        ...(newIncrements ? [newIncrements] : []),
        ...(result.incrementState ?? []),
    ];
    return result;
};
exports.parsePrefixUnaryExpression = parsePrefixUnaryExpression;
// TODO: for loops
// TODO: indents
exports.testPreincrement1 = {
    ts: `
if (true) {
  ++x
  print(x)
}
  `,
    expected: `
if true:
  x += 1
  x
  print(x)
  `,
};
exports.testPreincrement2 = {
    ts: `
if (true) {
  print(++x)
}
  `,
    expected: `
if true:
  x += 1
  print(x)
  `,
};
exports.testPostincrement1 = {
    ts: `
if (true) {
  print(x++)
}
  `,
    expected: `
if true:
  print(x)
  x += 1
  `,
};
//# sourceMappingURL=parse_prefix_unary_expression.js.map