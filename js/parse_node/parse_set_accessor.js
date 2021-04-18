"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testGet = exports.parseSetAccessor = void 0;
const parse_node_1 = require("../parse_node");
const parseSetAccessor = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: [node.name, node.body, ...node.parameters],
        props,
        addIndent: true,
        parsedStrings: (name, body, ...params) => `
func ${name}_set(${params.join(", ")}):
  ${body}
`,
    });
};
exports.parseSetAccessor = parseSetAccessor;
exports.testGet = {
    ts: `
class Foo {
  _x: float;
  set x(value: float) { _x = value; }
}
  `,
    expected: `
class_name Foo
var x setget x_set,
var _x
func x_set(value):
  _x = value
  `,
};
//# sourceMappingURL=parse_set_accessor.js.map