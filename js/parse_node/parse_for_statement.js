"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPass2 = exports.testIf = exports.parseForStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseForStatement = (node, props) => {
    props = { ...props, mostRecentControlStructureIsSwitch: false };
    // Add initializer to current scope BEFORE entering new scope
    let initializer = parse_node_1.combine({
        parent: node,
        nodes: node.initializer,
        props,
        content: (init) => init,
    }).content;
    props.scope.enterScope();
    const increment = parse_node_1.combine({
        parent: node,
        addIndent: true,
        nodes: [node.incrementor],
        props,
        content: (inc) => inc,
    }).content;
    props.mostRecentForStatement = {
        incrementor: increment,
    };
    const result = parse_node_1.combine({
        parent: node,
        addIndent: true,
        nodes: [node.condition, node.statement],
        props,
        content: (cond, statement) => {
            if (statement.trim().length === 0 && increment.trim().length === 0) {
                statement = "pass";
            }
            return `
${initializer || ""}
while ${cond || "true"}:
  ${statement}
  ${increment ?? ""}
`;
        },
    });
    props.scope.leaveScope();
    return result;
};
exports.parseForStatement = parseForStatement;
exports.testIf = {
    expectFail: true,
    ts: `

for (let i = 0; i < 6; ++i) {
  print(i)
}
for (let i = 0; i < 5; ++i) {
  print(i)
}
for (let i = 0; i < 5; ++i) {
  print(i)
}
  `,
    expected: `
var i: int = 0
while i < 6:
  print(i)
  (i += 1)
var i1: int = 0
while i1 < 5:
  print(i1)
  (i1 += 1)
var i2: int = 0
while i2 < 5:
  print(i2)
  (i2 += 1)
  `,
};
exports.testPass2 = {
    ts: `
for (let x = 0; x < 10; );
  `,
    expected: `
var x: int = 0
while x < 10:
  pass
  `,
};
//# sourceMappingURL=parse_for_statement.js.map