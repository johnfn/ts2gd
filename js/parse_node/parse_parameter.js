"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testParameter = exports.parseParameter = void 0;
const parse_node_1 = require("../parse_node");
const ts_utils_1 = require("../ts_utils");
const parseParameter = (node, props) => {
    const type = ts_utils_1.getGodotType(node, props, node.initializer, node.type);
    const usages = props.usages.get(node.name);
    const unusedPrefix = usages?.uses.length === 0 ? "_" : "";
    const typeString = type ? `: ${type}` : "";
    props.scope.addName(node.name);
    return parse_node_1.combine({
        parent: node,
        nodes: [node.name, node.initializer],
        props,
        content: (name, initializer) => `${unusedPrefix}${name}${typeString}${initializer && `= ${initializer}`}`,
    });
};
exports.parseParameter = parseParameter;
exports.testParameter = {
    ts: `
class Test {
  test(a: int, b: string) {
    print(a);
  }
}
  `,
    expected: `
class_name Test

func test(a, _b: String):
  print(a)
  `,
};
//# sourceMappingURL=parse_parameter.js.map