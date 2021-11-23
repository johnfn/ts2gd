"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testParameter = exports.parseParameter = void 0;
const parse_node_1 = require("../parse_node");
const ts_utils_1 = require("../ts_utils");
const magic = `"[no value passed in]"`;
const parseParameter = (node, props) => {
    const type = ts_utils_1.getGodotType(node, props.program.getTypeChecker().getTypeAtLocation(node), props, false, node.initializer, node.type);
    const usages = props.usages.get(node.name);
    const unusedPrefix = usages?.uses.length === 0 && !node.initializer ? "_" : "";
    const typeString = type.result ? `: ${type.result}` : "";
    if (type.errors) {
        type.errors.forEach((err) => props.addError(err));
    }
    props.scope.addName(node.name);
    const initializers = [];
    const result = parse_node_1.combine({
        parent: node,
        nodes: [node.name, node.initializer],
        props,
        parsedStrings: (name, initializer) => {
            if (initializer) {
                // It's tempting to just initialize it with godot default parameter
                // initializers, but there's a subtle bug: TS supports myFunction(a, b =
                // a) { } but Godot does not. So we need to compile that out.
                // `magic` is a giant hack but it's the only way to get things to work
                // without rewriting callsites.
                initializers.push({
                    line: `${name} = (${initializer} if (typeof(${name}) == TYPE_STRING and ${name} == ${magic}) else ${name})`,
                    type: "after",
                    lineType: parse_node_1.ExtraLineType.DefaultInitialization,
                });
                return `${name}${initializer ? ` = ${magic}` : ""}`;
            }
            return `${unusedPrefix}${name}${typeString}${initializer ? " = null" : ""}`;
        },
    });
    result.extraLines = initializers;
    return result;
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

func test(a: int, _b: String):
  print(a)
  `,
};
//# sourceMappingURL=parse_parameter.js.map