"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testVDL2 = exports.testVDL = exports.parseVariableDeclarationList = void 0;
const parse_node_1 = require("../parse_node");
const parseVariableDeclarationList = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.declarations,
        props,
        parsedStrings: (...decls) => decls.join("\n") + "\n",
    });
};
exports.parseVariableDeclarationList = parseVariableDeclarationList;
exports.testVDL = {
    ts: `
let a = 1, b = 2
print(a)
print(b)
  `,
    expected: `
var a: int = 1
var b: int = 2
print(a)
print(b)
  `,
};
exports.testVDL2 = {
    ts: `
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;
    this.print(1)
  }
}`,
    expected: `
extends Area2D
class_name Test
func _ready():
  var _x: int = 1
  var _y: int = 2
  self.print(1)
`
};
//# sourceMappingURL=parse_variable_declaration_list.js.map