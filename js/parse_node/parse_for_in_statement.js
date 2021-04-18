"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testForIn2 = exports.testForIn1 = exports.parseForInStatement = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const parseForInStatement = (node, props) => {
    let result;
    props.scope.enterScope();
    if (node.initializer.kind === typescript_1.SyntaxKind.VariableDeclarationList) {
        const vdl = node.initializer;
        if (vdl.declarations.length > 1 || vdl.declarations.length === 0) {
            throw new Error("non-1 length of declarations in for...in");
        }
        result = parse_node_1.combine({
            parent: node,
            nodes: [vdl.declarations[0].name, node.expression, node.statement],
            props,
            addIndent: true,
            parsedStrings: (name, expr, statement) => `
for ${name} in ${expr}:
  ${statement}
`,
        });
    }
    else {
        const initExpr = node.initializer;
        result = parse_node_1.combine({
            parent: node,
            nodes: [initExpr, node.expression, node.statement],
            props,
            addIndent: true,
            parsedStrings: (initExpr, expr, statement) => `
for ${initExpr} in ${expr}:
  ${statement}
`,
        });
    }
    props.scope.leaveScope();
    return result;
};
exports.parseForInStatement = parseForInStatement;
exports.testForIn1 = {
    ts: `
for (let x in []);
  `,
    expected: `
for x in []:
  pass
  `,
};
exports.testForIn2 = {
    ts: `
let x: never;
for (x in []);
  `,
    expected: `
var x
for x in []:
  pass
  `,
};
//# sourceMappingURL=parse_for_in_statement.js.map