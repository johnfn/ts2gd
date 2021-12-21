import ts, { SymbolFlags, SyntaxKind } from "typescript"
import {
  combine,
  ExtraLine,
  ExtraLineType,
  parseNode,
  ParseNodeType,
  ParseState,
} from "../parse_node"
import { Test } from "../tests/test"
import {
  findContainingClassDeclaration,
  isDictionary,
  isEnumType,
  isNullableNode,
} from "../ts_utils"

const isRhs = (node: ts.PropertyAccessExpression) => {
  let parentExpression: ts.Node = node

  while (
    parentExpression.parent &&
    (parentExpression.parent.kind !== SyntaxKind.BinaryExpression ||
      (parentExpression.parent.kind === SyntaxKind.BinaryExpression &&
        (parentExpression.parent as ts.BinaryExpression).operatorToken.kind !==
          SyntaxKind.EqualsToken))
  ) {
    parentExpression = parentExpression.parent
  }
  let binaryExpression = parentExpression.parent as ts.BinaryExpression

  if (!parentExpression.parent) {
    return true
  }

  if (parentExpression.parent && binaryExpression.right === parentExpression) {
    return true
  } else {
    return false
  }
}

export const parsePropertyAccessExpression = (
  node: ts.PropertyAccessExpression,
  props: ParseState
): ParseNodeType => {
  const exprType = props.program
    .getTypeChecker()
    .getTypeAtLocation(node.expression)

  // Compile things like KeyList.KEY_SPACE into KEY_SPACE
  if (isEnumType(exprType)) {
    const symbol = exprType.getSymbol()!
    const declarations = symbol.declarations

    let isGlobal = false
    if (declarations) {
      const sourceFiles = declarations.map((d) => d.getSourceFile().fileName)
      isGlobal = !!sourceFiles.find((f) => f.includes("@globals.d.ts"))
    }

    if (isGlobal) {
      return parseNode(node.name, props)
    }
  }

  let nullCoalesce: ExtraLine[] = []
  const tc = props.program.getTypeChecker()

  let result = combine({
    parent: node,
    nodes: [node.expression, node.name],
    props,
    parsedStrings: (lhs, rhs) => {
      if (node.questionDotToken) {
        const type = tc.getTypeAtLocation(node).getNonNullableType()
        const areWeAFunction =
          type.symbol?.flags & SymbolFlags.Method ||
          type.symbol?.flags & SymbolFlags.Function

        let exprName: string

        if (areWeAFunction) {
          let lhsName: string
          const lhsType = tc.typeToString(
            tc.getTypeAtLocation(node.expression).getNonNullableType()
          )

          lhsName = props.scope.createUniqueName()
          exprName = props.scope.createUniqueName()

          if (
            (lhsType === "Vector2Constructor" ||
              lhsType === "Vector2iConstructor" ||
              lhsType === "Vector3Constructor" ||
              lhsType === "Vector3iConstructor") &&
            (rhs === "add" || rhs === "sub" || rhs === "mul" || rhs === "div")
          ) {
            nullCoalesce = [
              {
                type: "before",
                line: `var ${lhsName} = ${lhs}`,
                lineType: ExtraLineType.NullableIntermediateExpression,
              },
              {
                type: "before",
                line: `var ${exprName} = [funcref(self, "${rhs}_vec_lib") if ${lhsName} != null else null, {}, ${lhsName}]`,
                lineType: ExtraLineType.NullableIntermediateExpression,
              },
            ]

            return exprName
          }

          nullCoalesce = [
            {
              type: "before",
              line: `var ${lhsName} = ${lhs}`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
            {
              type: "before",
              line: `var ${exprName} = [funcref(${lhsName}, "${rhs}") if ${lhsName} != null else null, {}, null]`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
          ]

          return exprName
        } else {
          exprName = props.scope.createUniqueName()

          nullCoalesce = [
            {
              type: "before",
              line: `var ${exprName} = ${lhs}`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
          ]
        }

        return `(${exprName}.${rhs} if ${exprName} != null else null)`
      }

      // Godot does not like var foo = bar.baz when baz is not a key of bar
      // However, Godot is fine with bar.baz = foo even if baz is not a key.

      if (
        isDictionary(exprType) &&
        isNullableNode(node.name, props.program.getTypeChecker()) &&
        isRhs(node)
      ) {
        return `(${lhs}.${rhs} if ${lhs}.has("${rhs}") else null)`
      }

      const containingClassDecl = findContainingClassDeclaration(node)

      if (
        containingClassDecl &&
        exprType.symbol?.declarations &&
        exprType.symbol.declarations[0] === containingClassDecl &&
        node.expression.getText() === containingClassDecl.name?.getText()
      ) {
        return `self.${rhs}`
      }

      return `${lhs}.${rhs}`
    },
  })

  result.extraLines = [...(result.extraLines ?? []), ...nullCoalesce]

  return result
}

export const testAccess: Test = {
  ts: `
let foo = { bar: 1 }
print(foo.bar)
  `,
  expected: `
var foo = { "bar": 1 }
print(foo.bar)
  `,
}

export const testAccessRewriting: Test = {
  ts: `
let foo = { bar: 1 }
if (foo.bar) {
  print (foo.bar)
}
  `,
  expected: `
var foo = { "bar": 1 }
if foo.bar:
  print(foo.bar)
  `,
}

export const testAccessRewriting2: Test = {
  ts: `
let foo: { bar?: int } = { bar: 1 as int }
if (foo.bar === 1 as int) {
  print (foo.bar)
}
  `,
  expected: `
var foo = { "bar": 1 }
if ((typeof((foo.bar if foo.has("bar") else null)) == typeof(1)) and ((foo.bar if foo.has("bar") else null) == 1)):
  print(foo.bar)
  `,
}

export const testNullableAccess: Test = {
  ts: `
let foo: { bar: number | null } = { bar: 1 }
print(foo.bar)
  `,
  expected: `
var foo = { "bar": 1 }
print((foo.bar if foo.has("bar") else null))
  `,
}

export const testOptionalAccess: Test = {
  ts: `
let foo: { bar?: number } = { bar: 1 }
print(foo.bar)
  `,
  expected: `
var foo = { "bar": 1 }
print((foo.bar if foo.has("bar") else null))
  `,
}

export const testOptionalAssignment: Test = {
  ts: `
let foo: { bar?: number } = { bar: 1 }
foo.bar = 2
  `,
  expected: `
var foo = { "bar": 1 }
foo.bar = 2
  `,
}

export const testComplexLhs: Test = {
  ts: `
let foo: { bar?: number }[] = [{ bar: 1 }]
foo[0].bar = 2
  `,
  expected: `
var foo = [{ "bar": 1 }]
foo[0].bar = 2
  `,
}

export const testNoSelfForSignal: Test = {
  ts: `
export default class Test {
  $mouseenter!: Signal<[]>;

  test() {
    this.$mouseenter.emit()
  }
}
  `,
  expected: `
class_name Test
signal mouseenter

func test():
  self.emit_signal("mouseenter")
`,
}

export const testAddSelfForParams: Test = {
  ts: `
export default class Test {
  a: float
  b: string

  test(a: float, b: string) {
    this.a = a;
    this.b = b;
  }
}
  `,
  expected: `
class_name Test
var a: float
var b: String
func test(a: float, b: String):
  self.a = a
  self.b = b
`,
}

export const testNullCoalesce: Test = {
  ts: `
export default class Test {
  test() {
    const foo: string | null = "hello"

    print(foo?.bar)
  }
}
  `,
  expected: `
class_name Test
func test():
  var foo = "hello"
  var __gen = foo
  print((__gen.bar if __gen != null else null))
  `,
}

export const testNullCoalesce2: Test = {
  ts: `
export default class Test {
  test() {
    const foo: string | null = "hello"

    print((foo + "a")?.bar)
  }
}
  `,
  expected: `
class_name Test
func test():
  var foo = "hello"
  var __gen = (foo + "a")
  print((__gen.bar if __gen != null else null))
  `,
}

export const testNullCoalesce3: Test = {
  ts: `
export default class Test {
  foo: string | null = "hello"

  test(): void {
    print(this.foo?.bar)
  }
}
  `,
  expected: `
class_name Test
var foo = "hello"
func test():
  var __gen = self.foo
  print((__gen.bar if __gen != null else null))
  `,
}

export const testNullCoalesce4: Test = {
  ts: `
export default class Test {
  test(): void {
    let foo: Test | null = null as (Test | null)
    print(foo?.test())
  }
}
  `,
  expected: `
class_name Test
func test():
  var foo = null
  var __gen = foo
  var __gen1 = [funcref(__gen, "test") if __gen != null else null, {}, null]
  var __gen2 = __gen1[0].call_func() if __gen1 != null else null
  print(__gen2)
  `,
}

export const testNullCoalesce5: Test = {
  ts: `
export default class Test {
  test(x: int): void {
    let foo: Test | null = null as (Test | null)
    print(foo?.test(1))
  }
}
  `,
  expected: `
class_name Test
func test(_x: int):
  var foo = null
  var __gen = foo
  var __gen1 = [funcref(__gen, "test") if __gen != null else null, {}, null]
  var __gen2 = __gen1[0].call_func(1) if __gen1 != null else null
  print(__gen2)
  `,
}

export const testPropertyConvertToFuncRef: Test = {
  ts: `
class default Test extends Area2D {
  foo(arg: () => void) {

  }

  bar() {
    this.foo(this.foo)
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func foo(arg):
  pass

func bar():
  this.foo(funcref(self, "foo"))
  `,

  expectFail: true,
}

// This ensures that we do funcref of .mul() correctly.
export const testComplicatedLibFunc: Test = {
  ts: `
export default class Test extends Area2D {
  test() {
    const maybeVec = randi() ? Vector2(0, 0) : null
    const foo = maybeVec?.mul(4)
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func test():
  var maybeVec = Vector2(0, 0) if randi() else null
  var __gen = maybeVec
  var __gen1 = [funcref(self, "mul_vec_lib") if __gen != null else null, {}, __gen]
  var __gen2 = __gen1[0].call_func(__gen1[2], 4) if __gen1 != null else null
  var _foo = __gen2
`,
}

export const testStaticClassMethodInvoke: Test = {
  ts: `
export default class Test extends Area2D {
  constructor() {
    super()
    Test.test()
  }

  static test() {
    print("static")
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func _ready():
  self.test()
static func test():
  print("static")

`,
}
