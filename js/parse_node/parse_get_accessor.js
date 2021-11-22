"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testExportingGetSetBoth = exports.testExportingGetSet2 = exports.testExportingGetSetBig = exports.testGet = exports.parseGetAccessor = void 0;
const parse_node_1 = require("../parse_node");
const parseGetAccessor = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: [node.name, node.body, ...node.parameters],
        addIndent: true,
        props,
        parsedStrings: (name, body, ...params) => `
func ${name}_get(${params.join(", ")}):
  ${body || "pass"}
`,
    });
};
exports.parseGetAccessor = parseGetAccessor;
exports.testGet = {
    ts: `
class Foo {
  _x;
  get x() { return this._x; }
}
  `,
    expected: `
class_name Foo
var x setget , x_get
var _x
func x_get():
  return self._x
  `,
};
exports.testExportingGetSetBig = {
    ts: `
export class Test {
  @exports
  set label(text: string) {
    if (this.LI) {
      this.LI.text = text;
    }
  }

  get label(): string {
    return this.LI?.text ?? "";
  }
}
  `,
    expected: `
class_name Test
export(String) var label setget label_set, label_get
func label_set(text: String):
  if self.LI:
    self.LI.text = text
func label_get():
  var __gen = self.LI
  return ((__gen.text if __gen != null else null) if ((__gen.text if __gen != null else null)) != null else "")
`,
};
exports.testExportingGetSet2 = {
    ts: `
export class Test {
  set label(text: string) {
  }

  @exports
  get label(): string {
    return ""
  }
}
  `,
    expected: `
class_name Test
export(String) var label setget label_set, label_get
func label_set(_text: String):
  pass
func label_get():
  return ""

`,
};
// Strictly speaking this makes no sense, but there's no reason to error.
exports.testExportingGetSetBoth = {
    ts: `
export class Test {
  @exports
  set label(text: string) {
  }

  @exports
  get label(): string {
    return ""
  }
}
  `,
    expected: `
class_name Test
export(String) var label setget label_set, label_get
func label_set(_text: String):
  pass
func label_get():
  return ""
`,
};
//# sourceMappingURL=parse_get_accessor.js.map