import ts, { SyntaxKind, TypeFlags, TypeFormatFlags } from "typescript"
import { combine, parseNode, ParseNodeType, ParseState } from "../parse_node"
import { Test } from "../test"
import { isDictionary, isEnumType, isNullable, syntaxToKind } from "../ts_utils"

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

  const type = props.program.getTypeChecker().getTypeAtLocation(node)

  // Compile things like KeyList.KEY_SPACE into KEY_SPACE
  if (isEnumType(exprType)) {
    const symbol = exprType.getSymbol()!
    const declarations = symbol.declarations
    const sourceFiles = declarations.map((d) => d.getSourceFile().fileName)
    const isGlobal = !!sourceFiles.find((f) => f.includes("@globals.d.ts"))

    if (isGlobal) {
      return parseNode(node.name, props)
    }
  }

  return combine({
    parent: node,
    nodes: [node.expression, node.name],
    props,
    content: (lhs, rhs) => {
      // Godot does not like var foo = bar.baz when baz is not a key of bar
      // However, Godot is fine with bar.baz = foo even if baz is not a key.

      if (
        isDictionary(exprType) &&
        isNullable(node.name, props.program.getTypeChecker()) &&
        isRhs(node)
      ) {
        return `(${lhs}.${rhs} if ${lhs}.has("${rhs}") else null)`
      }

      return `${lhs}.${rhs}`
    },
  })
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
export class Test {
  mouseenter!: Signal<[]>;

  test() {
    this.emit_signal(this.mouseenter)
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
export class Test {
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
var a
var b: String
func test(a, b: String):
  self.a = a
  self.b = b
`,
}
