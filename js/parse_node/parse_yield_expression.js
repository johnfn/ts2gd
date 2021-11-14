"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testYieldSignal2 = exports.testYieldSignal = exports.parseYieldExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseYieldExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.expression,
        props,
        parsedStrings: (expr) => {
            if (expr.includes(".$")) {
                return "yield(" + expr.replace(".$", ', "') + '")';
            }
            else {
                return `yield ${expr}`;
            }
        },
    });
};
exports.parseYieldExpression = parseYieldExpression;
exports.testYieldSignal = {
    ts: `
export class Test {
  *test(): void {
    yield this.get_tree().$idle_frame
  }
}
  `,
    expected: `
class_name Test
func test():
  yield(self.get_tree(), "idle_frame")
`,
};
exports.testYieldSignal2 = {
    ts: `
export class Test {
  $mysignal: Signal
  *test(): void {
    yield this.$mysignal
  }
}
  `,
    expected: `
class_name Test
signal mysignal
func test():
  yield(self, "mysignal")
`,
};
//# sourceMappingURL=parse_yield_expression.js.map