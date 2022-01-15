import ts, { SyntaxKind } from "typescript"

import { ErrorName, addError } from "../errors"
import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { getGodotType } from "../ts_utils"

import {
  isDecoratedAsExportFlags,
  isDecoratedAsExports,
  parseExportFlags,
  parseExports,
} from "./parse_property_declaration"

const getSettersAndGetters = (
  members: readonly ts.ClassElement[],
  props: ParseState
) => {
  const setOrGetters = members.filter(
    (member) =>
      member.kind === SyntaxKind.SetAccessor ||
      member.kind === SyntaxKind.GetAccessor
  ) as (ts.SetAccessorDeclaration | ts.GetAccessorDeclaration)[]

  const pairings: {
    setter?: ts.SetAccessorDeclaration
    getter?: ts.GetAccessorDeclaration
    exportText: string | null
    name: string
  }[] = []

  for (const setGet of setOrGetters) {
    let exportText: string | null = null

    if (isDecoratedAsExports(setGet)) {
      exportText = parseExports(setGet, props)
    }

    if (isDecoratedAsExportFlags(setGet)) {
      exportText = parseExportFlags(setGet, props)
    }

    if (setGet.kind === SyntaxKind.SetAccessor) {
      const setter = setGet as ts.SetAccessorDeclaration
      const name = setter.name.getText()
      const existingObj = pairings.find((pair) => pair.name === name)

      if (existingObj) {
        existingObj.setter = setter
        existingObj.exportText ??= exportText
      } else {
        pairings.push({ setter, name, exportText })
      }
    }

    if (setGet.kind === SyntaxKind.GetAccessor) {
      const getter = setGet as ts.GetAccessorDeclaration
      const name = getter.name.getText()
      const existingObj = pairings.find((pair) => pair.name === name)

      if (existingObj) {
        existingObj.getter = getter
        existingObj.exportText ??= exportText
      } else {
        pairings.push({ getter, name, exportText })
      }
    }
  }

  return pairings
}

export const parseClassDeclaration = (
  node: ts.ClassDeclaration | ts.ClassExpression,
  props: ParseState
): ParseNodeType => {
  const modifiers = (node.modifiers ?? []).map((x) => x.getText())

  // skip class declarations; there's no code to generate here
  if (modifiers.includes("declare")) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  }

  const isAutoload = !!node.decorators?.find(
    (dec) => dec.expression.getText() === "autoload"
  )

  if (!props.isMainClass && isAutoload) {
    addError({
      description: `
Only the main class can be autoloaded. You can make this the main class either by exporting it as default, or using @main. For example:

@autoload export default class ${node.name?.getText() ?? ""} { // ...

Or:

@autoload @main export class ${node.name?.getText() ?? ""} { // ...
`,
      error: ErrorName.ClassMustBeExported,
      location: node,
      stack: new Error().stack ?? "",
    })
  }

  // Preprocess set/get to make setget declarations
  const settersAndGetters = getSettersAndGetters(node.members, props)
  const parsedSetterGetters = settersAndGetters
    .map(({ setter, getter, name, exportText }) => {
      return `${exportText ?? ""}var ${name} setget ${
        setter ? name + "_set" : ""
      }, ${getter ? name + "_get" : ""}`
    })
    .join("\n")

  // NOTE: Since extends and class_name *must* come first in the file,
  // they are added ahead of time by parse_source_file.ts.

  return combine({
    parent: node,
    nodes: node.members,
    props,
    parsedStrings: (...members) => {
      return `
${parsedSetterGetters}
${members.join("")}
`
    },
  })
}

export const testInnerClassExtends: Test = {
  ts: `
export default class Test {
}

export class InnerTest extends Node2D {
  field: int = 2;
}
  `,
  expected: `
class_name Test

class InnerTest extends Node2D:
  var field: int = 2
`,
}

export const testInnerClassExtendsSuperCall: Test = {
  ts: `
export default class Test {
}

export class InnerTest extends Node2D {
  field: int = 2;

  constructor() {
    super();
  }
}
  `,
  expected: `
class_name Test

class InnerTest extends Node2D:
  var field: int = 2
  func _init().():
    pass
`,
}

export const testFileWithoutDefaultClass: Test = {
  ts: `
class Foo {
  x = 1
}

export class Foo2 {
  y = 1
}`,
  expected: `
class_name Foo2

class Foo:
  var x: int = 1

var y: int = 1
`,
}

export const testDontRequireExportingAutoloads: Test = {
  ts: `
@autoload
export default class Foo {
  x = 1
}`,
  expected: `
class_name Foo
var x: int = 1
`,
}

export const testMainDecoratorAutoload: Test = {
  ts: `
@autoload
@main
export class Foo {
  x = 1
}

export class Bar {

}`,
  expected: `
class_name Foo
class Bar:
  pass
var x: int = 1

`,
}

export const testAutoloadMustBeMainClass: Test = {
  ts: `
@autoload
export class Foo {
  x = 1
}

@main
export class Bar {
  y = 2
}`,
  expected: {
    type: "error",
    error: `
Only the main class can be autoloaded. You can make this the main class either by exporting it as default, or using @main. For example:

@autoload export default class Foo { // ...

Or:

@autoload @main export class Foo { // ...
`,
  },
}

export const testExportArgsSetGet: Test = {
  ts: `
@autoload
export default class Foo {
  @exports
  get nodes(): PackedScene<Node2D>[] {
      return [];
  }

  set nodes(v: PackedScene<Node2D>[]) {

  }
}`,
  expected: `
class_name Foo
export(Array, PackedScene) var nodes setget nodes_set, nodes_get
func nodes_get():
  return []
func nodes_set(_v):
  pass
`,
}

export const testDontRequireDefaultExportingAutoloads: Test = {
  ts: `
@autoload
@inner
class Foo {
  x = 1
}`,
  expected: {
    error: `
Only the main class can be autoloaded. You can make this the main class either by exporting it as default, or using @main. For example:

@autoload export default class Foo { // ...

Or:

@autoload @main export class Foo { // ...
`,
    type: "error",
  },
}

export const testMultipleClassesWithoutMarking: Test = {
  ts: `
class Foo {
  x = 1
}

class Bar {
  x = 1
}`,
  expected: {
    error: "Please mark one of Foo, Bar as the default (main) class.",
    type: "error",
  },
}

export const testMultipleClassesWithMainMarking: Test = {
  ts: `
@main
export class Foo {
  x = 1
}

class Bar {
  y = 1
}`,
  expected: `
class_name Foo

class Bar:
  var y: int = 1

var x: int = 1
`,
}

export const testMultipleClassesWithInnerMarking: Test = {
  ts: `
export class Foo {
  x = 1
}

@inner
class Bar {
  y = 1
}`,
  expected: `
class_name Foo

class Bar:
  var y: int = 1

var x: int = 1
`,
}

export const testMultipleClassesWithDefaultMarking: Test = {
  ts: `
export default class Foo {
  x = 1
}

class Bar {
  y = 1
}`,
  expected: `
class_name Foo

class Bar:
  var y: int = 1

var x: int = 1
`,
}

export const testMultipleClassesWithExportMarking: Test = {
  ts: `
export class Foo {
  x = 1
}

class Bar {
  y = 1
}`,
  expected: `
class_name Foo

class Bar:
  var y: int = 1

var x: int = 1
`,
}

export const testMultipleClassesWithMainMarkingFail: Test = {
  ts: `
@main
class Foo {
  x = 1
}

class Bar {
  y = 1
}`,
  expected: {
    error: "Main class Foo must be exported.",
    type: "error",
  },
}

export const testMainClassNotExported: Test = {
  ts: `
class Foo {
  y = 1
}`,
  expected: {
    error: "Main class Foo must be exported.",
    type: "error",
  },
}

export const testMultipleClassesWithInnerMarking2: Test = {
  ts: `
@inner
export class Foo {
  x = 1
}

@inner
class Bar {
  y = 1
}`,
  expected: `
class Foo:
  var x: int = 1

class Bar:
  var y: int = 1

`,
}
