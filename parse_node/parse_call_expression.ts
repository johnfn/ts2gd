import ts, { SyntaxKind } from "typescript"

import { ErrorName } from "../project/errors"
import {
  ExtraLine,
  ExtraLineType,
  ParseState,
  combine,
  parseNode,
  ParseNodeType,
} from "../parse_node"
import { Test } from "../tests/test"
import { isArrayType, isDictionary, isNullableNode } from "../ts_utils"

import { LibraryFunctionName, LibraryFunctions } from "./library_functions"
import { getCapturedScope } from "./parse_arrow_function"

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
      parsedStrings: () => "",
    })
  }

  // node = [[ a.b(c) ]]
  if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
    // prop = [[ a.b ]](c)
    const prop = node.expression as ts.PropertyAccessExpression
    const functionName = prop.name.getText()

    const type = props.program
      .getTypeChecker()
      .getTypeAtLocation(prop.expression)

    if (isDictionary(type)) {
      if (functionName === "entries") {
        let result = combine({
          parent: node,
          nodes: [prop.expression],
          props,
          parsedStrings: (expr) => {
            return `__entries(${[expr].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add("entries")

        return result
      }
    }

    if (isArrayType(type)) {
      if (functionName in LibraryFunctions) {
        const libFunctionName = functionName as LibraryFunctionName

        let result = combine({
          parent: node,
          nodes: [prop.expression, ...args],
          props,
          parsedStrings: (expr, ...args) => {
            return `__${libFunctionName}(${[expr, ...args].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add(libFunctionName)

        return result
      }
    }

    const typeAsString = props.program.getTypeChecker().typeToString(type)

    if (
      typeAsString === "Vector2Constructor" ||
      typeAsString === "Vector2iConstructor" ||
      typeAsString === "Vector3Constructor" ||
      typeAsString === "Vector3iConstructor"
    ) {
      if (
        functionName === "add" ||
        functionName === "sub" ||
        functionName === "mul" ||
        functionName === "div"
      ) {
        const libFunctionName = (functionName +
          "_vec_lib") as LibraryFunctionName

        let result = combine({
          parent: node,
          nodes: [prop.expression, ...args],
          props,
          parsedStrings: (expr, ...args) => {
            return `${libFunctionName}(${[expr, ...args].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add(libFunctionName)

        return result
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
        parsedStrings: (dict, key, val) => `${dict}[${key}] = ${val}`,
      })
    }
  }

  const decls = props.program
    .getTypeChecker()
    .getTypeAtLocation(node.expression).symbol?.declarations
  const isExpressionArrowFunction =
    decls &&
    decls[0].kind === SyntaxKind.ArrowFunction &&
    decls[0].getSourceFile() === node.getSourceFile()

  let nullCoalesce: ExtraLine[] = []

  let result = combine({
    parent: node,
    nodes: [expression, ...args],
    props,
    parsedObjs: (parsedExpr, ...parsedArgs) => {
      let parsedStringArgs: string[] = parsedArgs.map((arg) => arg.content)

      if (parsedExpr.content.endsWith("get_node_unsafe")) {
        parsedExpr.content = parsedExpr.content.replace(
          "get_node_unsafe",
          "get_node"
        )
      }

      // Rewrite this.$signal.emit() to this.emit_signal("signal")
      if (parsedExpr.content.endsWith(".emit")) {
        const secondDot = parsedExpr.content.lastIndexOf(".")
        const firstDot = parsedExpr.content.lastIndexOf(".", secondDot - 1)
        let signalName = parsedExpr.content.slice(firstDot + 1, secondDot)

        if (signalName.startsWith("$")) {
          signalName = signalName.slice(1)
        }

        if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = node.expression as ts.PropertyAccessExpression
          if (pae.expression.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            const expr = parseNode(pae2.expression, props)

            parsedStringArgs = [
              `"${signalName}"`,
              ...parsedArgs.map((arg) => arg.content),
            ]
            parsedExpr = {
              content: expr.content + ".emit_signal",
            }
          }
        }
      }

      // TODO - there are less brittle ways of checking for this.

      // Rewrite this.$signal.connect(() => stuff()) to this.connect(this, 'signal', method)
      if (parsedExpr.content.endsWith(".connect")) {
        if (expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = expression as ts.PropertyAccessExpression

          if (pae.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            let signalName = pae2.name.getText()

            if (signalName.startsWith("$")) {
              signalName = signalName.slice(1)
            }

            if (!parsedArgs[0]) {
              props.project.errors.add({
                description:
                  "Missing arrow function argument in signal connect invocation.",
                error: ErrorName.Ts2GdError,
                location: expression,
                stack: new Error().stack ?? "",
              })
            } else {
              const af = args[0] as ts.ArrowFunction
              const arrowFunctionObj =
                parsedArgs[0].hoistedArrowFunctions?.find(
                  (obj) => obj.node === af
                )

              if (!arrowFunctionObj) {
                props.project.errors.add({
                  description:
                    "ts2gd can't find that arrow function. This is an internal ts2gd error. Please report it on GitHub along with the code that caused it.",
                  error: ErrorName.Ts2GdError,
                  location: expression,
                  stack: new Error().stack ?? "",
                })
              } else {
                const { capturedScopeObject } = getCapturedScope(
                  arrowFunctionObj.node,
                  props
                )

                parsedStringArgs = [
                  `"${signalName}"`,
                  "self",
                  `"${arrowFunctionObj.name}"`,
                  `[${capturedScopeObject}]`,
                ]

                const secondDot = parsedExpr.content.lastIndexOf(".")
                const firstDot = parsedExpr.content.lastIndexOf(
                  ".",
                  secondDot - 1
                )

                // We have "self.variable.signal.connect" but we want
                // "self.signal.connect".
                // TODO: This is kinda a hack.
                parsedExpr = {
                  content:
                    parsedExpr.content.substring(0, firstDot) +
                    parsedExpr.content.substring(secondDot),
                }
              }
            }
          }
        }
      }

      if (
        parsedExpr.content.endsWith(".rpc") ||
        parsedExpr.content.endsWith(".rpc_id")
      ) {
        if (expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = expression as ts.PropertyAccessExpression

          if (pae.expression.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            const rpcFunctionName = pae2.name.getText()

            const secondDot = parsedExpr.content.lastIndexOf(".")
            const firstDot = parsedExpr.content.lastIndexOf(".", secondDot - 1)

            const expressionWithoutRpcName =
              parsedExpr.content.substring(0, firstDot) +
              parsedExpr.content.substring(secondDot)

            const isRpcId = parsedExpr.content.endsWith(".rpc_id")

            if (isRpcId) {
              parsedStringArgs = [
                parsedArgs[0].content,
                `"${rpcFunctionName}"`,
                ...parsedArgs.slice(1).map((arg) => arg.content),
              ]
            } else {
              parsedStringArgs = [
                `"${rpcFunctionName}"`,
                ...parsedArgs.map((arg) => arg.content),
              ]
            }

            parsedExpr = {
              content: expressionWithoutRpcName,
            }
          } else {
            props.project.errors.add({
              description: "I'm confused by this rpc",
              error: ErrorName.Ts2GdError,
              location: pae.expression,
              stack: new Error().stack ?? "",
            })
          }
        }
      }

      if (parsedExpr.content === "todict") {
        return parsedArgs[0].content
      }

      // When we pass in functions to other functions, they're passed in as parameters.
      const symbol = props.program
        .getTypeChecker()
        .getSymbolAtLocation(expression)

      const decl = symbol?.getDeclarations() ?? []
      let isFromLib = false

      for (const d of decl) {
        if (d.getSourceFile().fileName.endsWith(".d.ts")) {
          isFromLib = true
        }
      }

      const calledExpressionType = symbol?.getDeclarations()?.[0].kind
      const isFunctionObject =
        !isFromLib &&
        (calledExpressionType === ts.SyntaxKind.Parameter ||
          calledExpressionType === ts.SyntaxKind.VariableDeclaration)

      if (isFunctionObject) {
        parsedStringArgs = [...parsedStringArgs, parsedExpr.content + "[1]"]
      }

      if (isNullableNode(expression, props.program.getTypeChecker())) {
        const newName = props.scope.createUniqueName()
        const needsExplicitSelfArg =
          expression.getText().endsWith("add") ||
          expression.getText().endsWith("sub") ||
          expression.getText().endsWith("mul") ||
          expression.getText().endsWith("div")

        nullCoalesce = [
          {
            type: "before",
            line: `var ${newName} = ${parsedExpr.content}[0].call_func(${
              needsExplicitSelfArg ? parsedExpr.content + "[2], " : ""
            }${parsedStringArgs}) if ${parsedExpr.content} != null else null`,
            lineType: ExtraLineType.NullableIntermediateExpression,
          },
        ]

        return `${newName}`
      }

      if (isFunctionObject) {
        return `${parsedExpr.content}[0].call_func(${parsedStringArgs.join(
          ", "
        )})`
      } else {
        return `${parsedExpr.content}(${parsedStringArgs.join(", ")})`
      }
    },
  })

  result.extraLines = [...(result.extraLines ?? []), ...nullCoalesce]

  if (expression.kind === SyntaxKind.Identifier) {
    const prop = node.expression as ts.Identifier
    const functionName = prop.text

    if (
      functionName === "add_vec_lib" ||
      functionName === "sub_vec_lib" ||
      functionName === "div_vec_lib" ||
      functionName === "mul_vec_lib"
    ) {
      if (!result.hoistedLibraryFunctions) {
        result.hoistedLibraryFunctions = new Set()
      }

      result.hoistedLibraryFunctions.add(functionName)
    }
  }

  return result
}

export const testBasicCall: Test = {
  ts: `foo("bar")`,
  expected: `foo("bar")`,
}

export const testAddVec: Test = {
  ts: `const v1: Vector2; const v2: Vector2; v1.add(v2)`,
  expected: `
func add_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 + v2
var v1
var v2
add_vec_lib(v1, v2)
`,
}

export const testAddVec2: Test = {
  ts: `const foo: { v: Vector2; }; const v2: Vector2; foo.v.add(v2)`,
  expected: `
func add_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 + v2
var foo
var v2
add_vec_lib(foo.v, v2)
`,
}

export const testNormalVec: Test = {
  ts: `const v1: Vector2; v1.distance_to(v1)`,
  expected: `
var v1
v1.distance_to(v1)
`,
}

export const testArrowScoping: Test = {
  ts: `
export class Foo {
  a() {
    const a = () => {};
  }

  b() {
    const b = () => {};
  }
}
  `,
  expected: `
class_name Foo
func __gen(captures):
  pass
func __gen1(captures):
  pass
func a():
  var _a = [funcref(self, "__gen"), {}]
func b():
  var _b = [funcref(self, "__gen1"), {}]
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
var test = [funcref(self, "__gen"), {}]
test[0].call_func(test[1])
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
__map(x, [funcref(self, "__gen"), {}])
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
func __gen(y: int, captures):
  var z = captures.z
  var big = captures.big
  return z + big.a + y * 3
var x = [1, 2, 3]
var z: int = 5
var big = { "a": 6 }
__map(x, [funcref(self, "__gen"), {"z": z, "big": big}])
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

export const testConnect: Test = {
  expectFail: true,
  ts: `
export class Test extends Area2D {
  constructor() {
    super()

    this.$body_entered.connect(this.on_body_entered)
  }

  on_body_entered(body: Node) {

  }
}
  `,
  expected: `
extends Area2D
class_name Test
func _ready():
  self.connect("body_entered", self, "on_body_entered")
func on_body_entered(_body):
  pass
`,
}

export const testConnect2: Test = {
  ts: `
export class Test extends Area2D {
  constructor() {
    super()

    let x = 5
    this.$body_entered.connect((body: Node) => { print(body) })
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func __gen(body, captures):
  print(body)
func _ready():
  var _x: int = 5
  self.connect("body_entered", self, "__gen", [{}])
`,
}

export const testConnectWithClosures: Test = {
  ts: `
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;

    this.$body_entered.connect((body: Node) => { print(x + y) })
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func __gen(_body, captures):
  var x = captures.x
  var y = captures.y
  print(x + y)
func _ready():
  var x: int = 1
  var y: int = 2
  self.connect("body_entered", self, "__gen", [{"x": x, "y": y}])`,
}

// we intentionally do not capture `this` as self - see comment in parse_arrow_function.ts for rationale
export const testConnectWithClosuresNoThis: Test = {
  ts: `
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;

    this.$body_entered.connect((body: Node) => { this.print(x + y) })
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func __gen(_body, captures):
  var x = captures.x
  var y = captures.y
  self.print(x + y)
func _ready():
  var x: int = 1
  var y: int = 2
  self.connect("body_entered", self, "__gen", [{"x": x, "y": y}])`,
}

export const testConnectComplex: Test = {
  ts: `
export class Test {
  enemies: any;

  foo() {
    let enem: any;

    enem.$on_die.connect(() => { this.enemies.erase(enem) });  
  }
}
  `,
  expected: `
class_name Test
func __gen(captures):
  var enem = captures.enem
  self.enemies.erase(enem)
var enemies
func foo():
  var enem
  enem.connect("on_die", self, "__gen", [{"enem": enem}])  
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
  $mouseenter!: Signal<[]>;
  test() {
    this.$mouseenter.emit()
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
__map(__filter(a, [funcref(self, "__gen"), {}]), [funcref(self, "__gen1"), {}])
`,
}

export const testRewriteGetNode: Test = {
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

export const testRewriteGetNode2: Test = {
  ts: `
export class Test {
  foo() {
    this.get_node_unsafe('hello')
  }
}
  `,
  expected: `
class_name Test

func foo():
  self.get_node("hello")
`,
}

export const testDoubleCapture: Test = {
  ts: `
let big = { a : 6 }
let x = []
x.map(() => {
  return big.a + big.a
})
  `,
  expected: `
${LibraryFunctions.map.definition("__map")}
func __gen(captures):
  var big = captures.big
  return big.a + big.a
var big = { "a": 6 }
var x = []
__map(x, [funcref(self, "__gen"), {"big": big}])
`,
}

export const testFunctionNull: Test = {
  ts: `
  declare class Foo {
    x(): number | null;
  }

  export class Test {
    example() {
      const thing: Foo = new Foo()
      let result = thing.x()

      if (result) {
        print("Woohoo")
      }
    }
  }
  `,
  expected: `
class_name Test
func example():
  var thing = Foo.new()
  var result = thing.x()
  if result:
    print("Woohoo")
`,
}

export const testRewriteGetNodeUnsafe: Test = {
  ts: `
let x: Node = 0 as any
x.get_node_unsafe("Foo")
  `,
  expected: `
var x = 0
x.get_node("Foo")
`,
}

// export const testRewriteY: Test = {
//   ts: `
// export class Test extends Node {
//   f() {
//     yield y(this.get_tree(), "idle_frame")
//   }
// }
//   `,
//   expected: `
// extends Node
// class_name Test
// func f():
//   yield (self.get_tree(), "idle_frame")`,
// }

export const testConnectDirectlyToSig: Test = {
  ts: `
export class Test extends Area2D {
  $mysig!: Signal

  constructor() {
    super()

    this.$mysig.connect(() => {
      print("OK")
    })
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func __gen(captures):
  print("OK")
signal mysig
func _ready():
  self.connect("mysig", self, "__gen", [{}])
`,
}

export const testNestedDirectSignalConnect: Test = {
  ts: `
export class Test extends Area2D {
  $mysig!: Signal
  test!: Test

  constructor() {
    super()

    this.test.$mysig.connect(() => {
      print("OK")
    })

    this.test.$mysig.emit()
    this.$mysig.emit(1, 2, 3)
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func __gen(captures):
  print("OK")
signal mysig
var test
func _ready():
  self.test.connect("mysig", self, "__gen", [{}])
  self.test.emit_signal("mysig")
  self.emit_signal("mysig", 1, 2, 3)
`,
}

export const testRpcRewrite: Test = {
  ts: `
export class Test extends Area2D {
  rpc_me() {

  }

  rpc_me_2() {

  }

  rpc_me_3() {

  }

  constructor() {
    super()

    this.rpc_me.rpc()
    this.rpc_me_2.rpc(1, 2, 3)
    this.rpc_me_3.rpc_id(1, "egg")
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func rpc_me():
  pass
func rpc_me_2():
  pass
func rpc_me_3():
  pass
func _ready():
  self.rpc("rpc_me")
  self.rpc("rpc_me_2", 1, 2, 3)
  self.rpc_id(1, "rpc_me_3", "egg")
`,
}

export const testPassInFunction: Test = {
  ts: `
export class Test extends Area2D {
  fn(other: () => void) {
    other()
  }

  constructor() {
    super()

    const fnObject = () => {}

    this.fn(() => {})
    fnObject()
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func __gen(captures):
  pass
func __gen1(captures):
  pass
func fn(other):
  other[0].call_func(other[1])
func _ready():
  var fnObject = [funcref(self, "__gen"), {}]
  self.fn([funcref(self, "__gen1"), {}])
  fnObject[0].call_func(fnObject[1])
`,
}

export const testLibFunction: Test = {
  ts: `
let test = [Vector2.UP, Vector2.DOWN].random_element()?.mul(5)
  `,
  expected: `
func __random_element(list):
  if len(list) == 0:
    return null
  return list[randi() % len(list)]
var __gen = __random_element([Vector2.UP, Vector2.DOWN])
var __gen1 = [funcref(self, "mul_vec_lib") if __gen != null else null, {}, __gen]
var __gen2 = __gen1[0].call_func(__gen1[2], 5) if __gen1 != null else null
var _test = __gen2`,
}
