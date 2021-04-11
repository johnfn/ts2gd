"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTypeofExpression = exports.parseTypeofExpression = void 0;
const parse_node_1 = require("../parse_node");
const parseTypeofExpression = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.expression,
        props,
        content: (expr) => {
            return `${expr}.get_class()`;
        },
    });
};
exports.parseTypeofExpression = parseTypeofExpression;
exports.testTypeofExpression = {
    ts: `
let x = new Vector2(1, 1);
print(typeof x);
  `,
    expected: `
var x = Vector2(1, 1)
print(x.get_class())
  `,
};
//# sourceMappingURL=parse_typeof_expression.js.map