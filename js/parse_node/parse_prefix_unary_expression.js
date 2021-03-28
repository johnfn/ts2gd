"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPreincrement1 = exports.parsePrefixUnaryExpression = void 0;
const typescript_1 = __importDefault(require("typescript"));
const { SyntaxKind } = typescript_1.default;
const parse_node_1 = require("../parse_node");
const parsePrefixUnaryExpression = (node, props) => {
    // props = {
    //   ...props,
    // }
    let newIncrements = null;
    const result = parse_node_1.combine({
        parent: node,
        nodes: node.operand,
        props,
        content: (operand) => {
            switch (node.operator) {
                case SyntaxKind.PlusPlusToken: {
                    newIncrements = { type: "increment", variable: operand };
                    return `(${operand} + 1)`;
                }
                case SyntaxKind.MinusMinusToken: {
                    newIncrements = { type: "decrement", variable: operand };
                    return `(${operand} - 1)`;
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
// TODO: postincrements
exports.testPreincrement1 = {
    ts: `
if (true) {
  ++x
  print(x)
}
  `,
    expected: `
(x + 1)
x += 1
print(x)
  `,
};
//# sourceMappingURL=parse_prefix_unary_expression.js.map