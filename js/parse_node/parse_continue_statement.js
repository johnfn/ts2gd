"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testContinue2 = exports.testContinue1 = exports.parseContinueStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseContinueStatement = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: [],
        props,
        content: () => `continue`,
    });
};
exports.parseContinueStatement = parseContinueStatement;
exports.testContinue1 = {
    ts: `
for (let x = 0; x < 10; x++) {
  continue;
  print(x);
}
  `,
    expected: `
var x: int = 0
while x < 10:
  continue
  print(x)  
  ((x += 1) - 1)
  `,
};
exports.testContinue2 = {
    ts: `
for (let x = 0; x < 10; x++) {
  if (x == 0) continue;
  print(x);
}
  `,
    expected: `
var x: int = 0
while x < 10:
  if x == 0:
    continue
  print(x)
  ((x += 1) - 1)
  `,
};
//# sourceMappingURL=parse_continue_statement.js.map