"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNestedAssignmentToDict = exports.testAssignmentToDict = exports.testMultiply = exports.testAdd = exports.parseBinaryExpression = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const parseBinaryExpression = (node, props) => {
    const needsLeftHandSpace = node.operatorToken.kind !== typescript_1.SyntaxKind.CommaToken;
    // We need to rewrite things like dict.a = foo into dict['a'] = foo
    // if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
    //   if (node.left.kind === ts.SyntaxKind.PropertyAccessExpression) {
    //     const leftPropAccess = node.left as ts.PropertyAccessExpression;
    //     const dictNode = leftPropAccess.expression;
    //     const dictNodeType = props.program.getTypeChecker().getTypeAtLocation(dictNode);
    //     const keyNode = leftPropAccess.name;
    //     if (isDictionary(dictNodeType)) {
    //       return combine({
    //         parent: node,
    //         nodes: [dictNode, node.right],
    //         props,
    //         content: (dictNode, right) => `${dictNode}["${keyNode.text}"] = ${right}`
    //       });
    //     }
    //   }
    // }
    return parse_node_1.combine({
        parent: node,
        nodes: [node.left, node.operatorToken, node.right],
        props,
        content: (left, operatorToken, right) => `${left}${needsLeftHandSpace ? ' ' : ''}${operatorToken} ${right}`
    });
};
exports.parseBinaryExpression = parseBinaryExpression;
// Tests
exports.testAdd = {
    ts: '1 + 2',
    expected: '1 + 2',
};
exports.testMultiply = {
    ts: '1 * 2',
    expected: '1 * 2',
};
exports.testAssignmentToDict = {
    ts: `const foo = {};
foo.bar = 1`,
    expected: `var foo = {}
foo.bar = 1
`
};
exports.testNestedAssignmentToDict = {
    expectFail: false,
    ts: `const foo = { bar: {} };
foo.bar.baz = 1`,
    expected: `
var foo = { "bar": {} }
foo.bar.baz = 1
`,
};
//# sourceMappingURL=parse_binary_expression.js.map