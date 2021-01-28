"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testForOfDestructuring = exports.testBasicForOf = exports.parseForOfStatement = void 0;
const typescript_1 = __importDefault(require("typescript"));
const { SyntaxKind } = typescript_1.default;
const parse_node_1 = require("../parse_node");
const parse_variable_declaration_1 = require("./parse_variable_declaration");
const parseForOfStatement = (node, props) => {
    const initializer = node.initializer;
    let result;
    props.scope.enterScope();
    if (initializer.kind === SyntaxKind.VariableDeclarationList) {
        const initializerNode = initializer;
        if (initializerNode.declarations.length > 1) {
            throw new Error("Uh oh! For...of with > 1 declaration");
        }
        const name = initializerNode.declarations[0].name;
        if (name.kind === SyntaxKind.Identifier) {
            // Common case - single variable in for... of
            // like for (const x of list)
            result = parse_node_1.combine({
                parent: node,
                nodes: [node.expression, node.statement, name],
                props,
                addIndent: true,
                content: (expr, statement, name) => `
for ${name} in ${expr}:
  ${statement}
`,
            });
        }
        else {
            // Destructured case
            // like for (const [a, b] of list)
            const destructuredNames = parse_variable_declaration_1.getDestructuredNamesAndAccessStrings(initializerNode.declarations[0].name);
            for (const { id } of destructuredNames) {
                props.scope.addName(id);
            }
            const genName = props.scope.createUniqueName();
            result = parse_node_1.combine({
                parent: node,
                nodes: [
                    node.expression,
                    node.statement,
                    ...destructuredNames.map((d) => d.id),
                ],
                props,
                addIndent: true,
                content: (expr, statement, ...nodes) => `
for ${genName} in ${expr}:
${nodes
                    .map((node, i) => `  var ${node} = ${genName}${destructuredNames[i].access}\n`)
                    .join("")}
  ${statement}
`,
            });
        }
    }
    else {
        const initExpr = initializer;
        result = parse_node_1.combine({
            parent: node,
            nodes: [initExpr, node.expression, node.statement],
            props,
            addIndent: true,
            content: (expr, statement) => `
for ${initExpr} in ${expr}:
  ${statement}
`,
        });
    }
    props.scope.leaveScope();
    return result;
};
exports.parseForOfStatement = parseForOfStatement;
exports.testBasicForOf = {
    ts: `
for (let x of []) print(1)
  `,
    expected: `
for x in []:
  print(1)
  `,
};
exports.testForOfDestructuring = {
    ts: `
for (let [a, b] of [[1, 2]]) print(a, b)
  `,
    expected: `
for __gen in [[1, 2]]:
  var a = __gen[0]
  var b = __gen[1]
  print(a, b)
  `,
};
//# sourceMappingURL=parse_for_of_statement.js.map