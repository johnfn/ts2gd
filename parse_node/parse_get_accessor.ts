import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseGetAccessor = (
  node: ts.GetAccessorDeclaration,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.name, node.body, ...node.parameters],
    addIndent: true,
    props,
    parsedStrings: (name, body, ...params) => `
func ${name}_get(${params.join(", ")}):
  ${body || "pass"}
`,
  })
}

export const testGet: Test = {
  ts: `
export default class Foo {
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
}

export const testExportingGetSetBig: Test = {
  ts: `
export default class Test {
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
}

export const testExportingGetSet2: Test = {
  ts: `
export default class Test {
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
}

// Strictly speaking this makes no sense, but there's no reason to error.
export const testExportingGetSetBoth: Test = {
  ts: `
export default class Test {
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
}
