"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testIfStatement2 = exports.testIfStatement = exports.testWhileCondition = exports.testPostincrement1 = exports.testPreincrement2 = exports.testPreincrement1 = exports.parsePrefixUnaryExpression = void 0;
const typescript_1 = __importDefault(require("typescript"));
const { SyntaxKind } = typescript_1.default;
const parse_node_1 = require("../parse_node");
const parsePrefixUnaryExpression = (node, props) => {
    let newIncrements = null;
    const result = parse_node_1.combine({
        parent: node,
        nodes: node.operand,
        props,
        parsedStrings: (operand) => {
            switch (node.operator) {
                case SyntaxKind.PlusPlusToken: {
                    newIncrements = {
                        type: "before",
                        line: `${operand} += 1`,
                        isIncrement: true,
                    };
                    return `${operand}`;
                }
                case SyntaxKind.MinusMinusToken: {
                    newIncrements = {
                        type: "before",
                        line: `${operand} -= 1`,
                        isDecrement: true,
                    };
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
    result.extraLines = [
        ...(newIncrements ? [newIncrements] : []),
        ...(result.extraLines ?? []),
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
exports.testWhileCondition = {
    expectFail: true,
    ts: `
let x = 0
while (x++ < 10) {
  print(x)
}
  `,
    expected: `
let x = 0
while (x++ < 10) {
  print(x)
}
`,
};
exports.testIfStatement = {
    ts: `
let x = 0
if (true) {
  if (++x) {
    print(x)
  } else {
    print(x)
  }
}
  `,
    expected: `
var x: int = 0
if true:
  x += 1
  if x:
    print(x)
  else:
    print(x)
`,
};
exports.testIfStatement2 = {
    expectFail: true,
    ts: `
let x = 0
if (true) {
  if (x++) {
    print(x)
  } else {
    print(x)
  }
}
  `,
    expected: `
var x: int = 0
if true:
  if x:
    x += 1
    print(x)
  else:
    x += 1
    print(x)
`,
};
//# sourceMappingURL=parse_prefix_unary_expression.js.map