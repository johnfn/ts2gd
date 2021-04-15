import ts, { SyntaxKind } from "typescript"
import { combine, ParseState } from "../parse_node"
import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"
import { isArrayType, isDictionary } from "../ts_utils"
import { getCapturedScope } from "./parse_arrow_function"

type LibraryFunctionName =
  | "map"
  | "filter"
  | "max_by"
  | "min_by"
  | "join"
  | "random_element"
const LibraryFunctions: {
  [key in LibraryFunctionName]: {
    name: LibraryFunctionName
    definition: (name: string) => string
  }
} = {
  map: {
    name: "map",
    definition: (name: string) => `
func ${name}(list, fn, captures):
  var result = []

  for item in list:
    result.append(fn.call_func(item, captures))

  return result
    `,
  },

  filter: {
    name: "filter",
    definition: (name: string) => `
func ${name}(list, fn, captures):
  var result = []

  for item in list:
    if fn.call_func(item, captures):
      result.append(item)

  return result
    `,
  },

  max_by: {
    name: "max_by",
    definition: (name: string) => `
func ${name}(list, fn, captures):
  if len(list) == 0: 
    return null

  var result = []
  var best = null
  var best_score = -INF

  for item in list:
    var score = fn.call_func(item, captures)

    if score > best_score:
      best_score = score
      best = item

  return best
    `,
  },

  min_by: {
    name: "min_by",
    definition: (name: string) => `
func ${name}(list, fn, captures):
  if len(list) == 0: 
    return null

  var result = []
  var best = null
  var best_score = INF

  for item in list:
    var score = fn.call_func(item, captures)

    if score < best_score:
      best_score = score
      best = item

  return best
    `,
  },

  join: {
    name: "join",
    definition: (name: string) => `
func ${name}(list, join_str):
  var result = ""

  for i in range(len(list)):
    result += str(list[i])

    if i != len(list) - 1:
      result += join_str

  return result
    `,
  },

  random_element: {
    name: "random_element",
    definition: (name: string) => `
func ${name}(list):
  if len(list) == 0: 
    return null
  return list[randi() % len(list)]
    `,
  },
}

export const parseCallExpression = (
  node: ts.CallExpression,
  props: ParseState
): ParseNodeType => {
  let expression = node.expression
  let args = node.arguments

  if (node.expression.kind === SyntaxKind.SuperKeyword) {
    return combine({
      parent: node,
      nodes: node.expression,
      props,
      content: () => "",
    })
  }

  // This block compiles vec.add(vec2) into vec + vec2.

  // node = [[ a.b(c) ]]
  if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
    // prop = [[ a.b ]](c)
    const prop = node.expression as ts.PropertyAccessExpression
    const functionName = prop.name.getText()

    const type = props.program
      .getTypeChecker()
      .getTypeAtLocation(prop.expression)
    const stringType = props.program.getTypeChecker().typeToString(type)

    if (isArrayType(type)) {
      if (functionName in LibraryFunctions) {
        const libFunctionName = functionName as LibraryFunctionName
        let result: ParseNodeType

        if (
          node.arguments.length > 0 &&
          node.arguments[0].kind === SyntaxKind.ArrowFunction
        ) {
          const arrowFunction = node.arguments[0] as ts.ArrowFunction

          const { capturedScopeObject } = getCapturedScope(
            arrowFunction,
            props.program.getTypeChecker()
          )

          result = combine({
            parent: node,
            nodes: [prop.expression, ...args],
            props,
            content: (expr, ...args) => {
              return `__${libFunctionName}(${[expr, ...args].join(
                ", "
              )}, ${capturedScopeObject})`
            },
          })
        } else {
          result = combine({
            parent: node,
            nodes: [prop.expression, ...args],
            props,
            content: (expr, ...args) => {
              return `__${libFunctionName}(${[expr, ...args].join(", ")})`
            },
          })
        }

        result.hoistedLibraryFunctions = [
          ...(result.hoistedLibraryFunctions ?? []),
          LibraryFunctions[libFunctionName].definition("__" + libFunctionName),
        ]

        return result
      }
    }

    if (
      stringType === "Vector2" ||
      stringType === "Vector2i" ||
      stringType === "Vector3" ||
      stringType === "Vector3i"
    ) {
      let operator: undefined | string = undefined

      if (functionName === "add") operator = "+"
      if (functionName === "sub") operator = "-"
      if (functionName === "mul") operator = "*"
      if (functionName === "div") operator = "/"

      if (operator) {
        return combine({
          parent: node,
          nodes: [prop.expression, node.arguments[0]],
          props,
          content: (exp, arg) => `${exp} ${operator} ${arg}`,
        })
      }
    }
  }

  // This compiles dict.put(a, b) into dict[a] = b
  if (expression.kind === SyntaxKind.PropertyAccessExpression) {
    const propAccess = expression as ts.PropertyAccessExpression

    if (
      isDictionary(
        props.program.getTypeChecker().getTypeAtLocation(propAccess.expression)
      ) &&
      propAccess.name.escapedText === "put"
    ) {
      return combine({
        parent: node,
        nodes: [propAccess.expression, args[0], args[1]],
        props,
        content: (dict, key, val) => `${dict}[${key}] = ${val}`,
      })
    }
  }

  const decls = props.program
    .getTypeChecker()
    .getTypeAtLocation(node.expression).symbol?.declarations
  const isArrowFunction =
    decls &&
    decls[0].kind === SyntaxKind.ArrowFunction &&
    decls[0].getSourceFile() === node.getSourceFile()

  return combine({
    parent: node,
    nodes: [expression, ...args],
    props,
    content: (expr, ...args) => {
      if (expr === "Yield") {
        expr = "yield"
      }

      if (expr === "self.get_node_safe") {
        expr = "self.get_node"
      }

      // Translate `this.emit_signal(this.signal)`
      // into `this.emit_signal("signal")`
      if (expr === "self.emit_signal") {
        if (args[0].startsWith("self")) {
          args[0] = args[0].slice("self.".length)
        }

        args[0] = '"' + args[0] + '"'
      }

      if (expr === "todict") {
        return args[0]
      }

      if (isArrowFunction) {
        const { capturedScopeObject } = getCapturedScope(
          decls[0] as ts.ArrowFunction,
          props.program.getTypeChecker()
        )

        return `${expr}.call_func(${[...args, capturedScopeObject].join(", ")})`
      }

      return `${expr}(${args.join(", ")})`
    },
  })
}

export const testBasicCall: Test = {
  ts: `foo("bar")`,
  expected: `foo("bar")`,
}

export const testAddVec: Test = {
  ts: `const v1: Vector2; const v2: Vector2; v1.add(v2)`,
  expected: `
var v1
var v2
v1 + v2
`,
}

export const testAddVec2: Test = {
  ts: `const foo: { v: Vector2; }; const v2: Vector2; foo.v.add(v2)`,
  expected: `
var foo
var v2
foo.v + v2
`,
}

export const testNormalVec: Test = {
  ts: `const v1: Vector2; v1.distance_to(v1)`,
  expected: `
var v1
v1.distance_to(v1)
`,
}

export const testArrowFunction: Test = {
  ts: `
const test = () => 5;
test()  
  `,
  expected: `
func __gen(captures):
  return 5
var test = funcref(self, "__gen")
test.call_func({})
`,
}

export const testMap: Test = {
  ts: `
let x: string[] = ['a', 'b', 'c']
x.map(y => y + '1')
  `,
  expected: `
${LibraryFunctions.map.definition("__map")}
func __gen(y: String, captures):
  return y + "1"
var x = ["a", "b", "c"]
__map(x, funcref(self, "__gen"), {})
`,
}

export const testMapCapture: Test = {
  ts: `
let x = [1, 2, 3]
let z = 5
let big = { a : 6 }
x.map((y: int) => {
  return z + big.a + y * 3
})
  `,
  expected: `
${LibraryFunctions.map.definition("__map")}
func __gen(y, captures):
  var z = captures.z
  var big = captures.big
  return z + big.a + y * 3
var x = [1, 2, 3]
var z: int = 5
var big = { "a": 6 }
__map(x, funcref(self, "__gen"), {"z": z, "big": big})
`,
}

// TODO: this also fails lol
// for (let i = 0; i < 3; i++) {

// }
// return z + big.a + y * 3

export const testRewriteDictPut: Test = {
  ts: `
let d = todict({ 'a': 1 })
d.put('b', 2)
  `,
  expected: `
var d = { "a": 1 }
d["b"] = 2
`,
}

export const testRewriteDictPut2: Test = {
  ts: `
let d = todict({ 'a': 1 })
d.put([1, 2], 2)
  `,
  expected: `
var d = { "a": 1 }
d[[1, 2]] = 2
`,
}

export const testEmitSignal: Test = {
  ts: `
export class CityGridCollision extends Area {
  mouseenter!: Signal<[]>;
  test() {
    this.emit_signal(this.mouseenter)
  }
}
  `,
  expected: `
extends Area
class_name CityGridCollision
signal mouseenter
func test():
  self.emit_signal("mouseenter")
`,
}

export const testDoubleMap: Test = {
  ts: `
let a: string[] = []
a.filter(x => x).map(x => x)
  `,
  expected: `
${LibraryFunctions.filter.definition("__filter")}
${LibraryFunctions.map.definition("__map")}
func __gen(x: String, captures):
  return x
func __gen1(x: String, captures):
  return x
var a = []
__map(__filter(a, funcref(self, "__gen"), {}), funcref(self, "__gen1"), {})
`,
}

export const testRewriteGetNode: Test = {
  ts: `
export class Test {
  foo() {
    this.get_node_safe('hello')
  }
}
  `,
  expected: `
class_name Test

func foo():
  self.get_node("hello")
`,
}

export const testRewriteGetNode2: Test = {
  ts: `
export class Test {
  foo() {
    this.get_node('hello')
  }
}
  `,
  expected: `
class_name Test

func foo():
  self.get_node("hello")
`,
}
