"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPassForIn = exports.testPass1 = exports.parseEmptyStatement = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const parseEmptyStatement = (node, props) => {
    if (node.parent.kind === typescript_1.SyntaxKind.WhileStatement ||
        node.parent.kind === typescript_1.SyntaxKind.ForInStatement ||
        node.parent.kind === typescript_1.SyntaxKind.ForOfStatement ||
        // Exclude for statement on purpose because we always add in the increment. Well, almost always...!
        // node.parent.kind === SyntaxKind.ForStatement ||
        node.parent.kind === typescript_1.SyntaxKind.DoStatement) {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            content: () => "pass",
            props,
        });
    }
    return parse_node_1.combine({
        parent: node,
        nodes: [],
        content: () => "",
        props,
    });
};
exports.parseEmptyStatement = parseEmptyStatement;
exports.testPass1 = {
    ts: `
for (let x = 0; x < 10; x++);
  `,
    expected: `
var x: int = 0
while x < 10:
  x += 1
  `,
};
exports.testPassForIn = {
    ts: `
for (let x in {});
  `,
    expected: `
for x in {}:
  pass
`,
};
// export const testPassDoWhile: Test = {
//   ts: `
// do {
// } while(true);
//   `,
//   expected: `
// for x in {}:
//   pass
// `,
// };
//# sourceMappingURL=parse_empty_statement.js.map