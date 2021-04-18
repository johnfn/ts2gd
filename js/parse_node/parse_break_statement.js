"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testBreak2 = exports.testBreak1 = exports.parseBreakStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseBreakStatement = (node, props) => {
    if (props.mostRecentControlStructureIsSwitch) {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            parsedStrings: () => "",
        });
    }
    else {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            parsedStrings: () => `
${props.mostRecentForStatement?.incrementor ?? ""}
break
`,
        });
    }
};
exports.parseBreakStatement = parseBreakStatement;
exports.testBreak1 = {
    ts: `
for (let x = 0; x < 10; x++) {
  break;
  print(x);
}
  `,
    expected: `
var x: int = 0
while x < 10:
  x += 1
  break
  print(x)  
  x += 1
  `,
};
exports.testBreak2 = {
    ts: `
for (let x: int = 0; x < 10; x++) {
  if (x == (0 as int)) break;
  print(x);
}
  `,
    expected: `
var x: int = 0
while x < 10:
  if x == 0:
    x += 1
    break
  print(x)
  x += 1
  `,
};
//# sourceMappingURL=parse_break_statement.js.map