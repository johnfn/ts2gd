"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNullCoalesce2 = exports.testNullCoalesce = exports.testAddSelfForParams = exports.testNoSelfForSignal = exports.testComplexLhs = exports.testOptionalAssignment = exports.testOptionalAccess = exports.testNullableAccess = exports.testAccessRewriting2 = exports.testAccessRewriting = exports.testAccess = exports.parsePropertyAccessExpression = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const ts_utils_1 = require("../ts_utils");
const isRhs = (node) => {
    let parentExpression = node;
    while (parentExpression.parent &&
        (parentExpression.parent.kind !== typescript_1.SyntaxKind.BinaryExpression ||
            (parentExpression.parent.kind === typescript_1.SyntaxKind.BinaryExpression &&
                parentExpression.parent.operatorToken.kind !==
                    typescript_1.SyntaxKind.EqualsToken))) {
        parentExpression = parentExpression.parent;
    }
    let binaryExpression = parentExpression.parent;
    if (!parentExpression.parent) {
        return true;
    }
    if (parentExpression.parent && binaryExpression.right === parentExpression) {
        return true;
    }
    else {
        return false;
    }
};
const parsePropertyAccessExpression = (node, props) => {
    const exprType = props.program
        .getTypeChecker()
        .getTypeAtLocation(node.expression);
    // Compile things like KeyList.KEY_SPACE into KEY_SPACE
    if (ts_utils_1.isEnumType(exprType)) {
        const symbol = exprType.getSymbol();
        const declarations = symbol.declarations;
        const sourceFiles = declarations.map((d) => d.getSourceFile().fileName);
        const isGlobal = !!sourceFiles.find((f) => f.includes("@globals.d.ts"));
        if (isGlobal) {
            return parse_node_1.parseNode(node.name, props);
        }
    }
    let nullCoalesce = null;
    let result = parse_node_1.combine({
        parent: node,
        nodes: [node.expression, node.name],
        props,
        content: (lhs, rhs) => {
            if (node.questionDotToken) {
                const newName = props.scope.createUniqueName();
                nullCoalesce = {
                    type: "before",
                    line: `var ${newName} = ${lhs}`,
                };
                return `(${newName}.${rhs} if ${newName} != null else null)`;
            }
            // Godot does not like var foo = bar.baz when baz is not a key of bar
            // However, Godot is fine with bar.baz = foo even if baz is not a key.
            if (ts_utils_1.isDictionary(exprType) &&
                ts_utils_1.isNullable(node.name, props.program.getTypeChecker()) &&
                isRhs(node)) {
                return `(${lhs}.${rhs} if ${lhs}.has("${rhs}") else null)`;
            }
            return `${lhs}.${rhs}`;
        },
    });
    result.extraLines = [
        ...(result.extraLines ?? []),
        ...(nullCoalesce ? [nullCoalesce] : []),
    ];
    return result;
};
exports.parsePropertyAccessExpression = parsePropertyAccessExpression;
exports.testAccess = {
    ts: `
let foo = { bar: 1 }
print(foo.bar)
  `,
    expected: `
var foo = { "bar": 1 }
print(foo.bar)
  `,
};
exports.testAccessRewriting = {
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
};
exports.testAccessRewriting2 = {
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
};
exports.testNullableAccess = {
    ts: `
let foo: { bar: number | null } = { bar: 1 }
print(foo.bar)
  `,
    expected: `
var foo = { "bar": 1 }
print((foo.bar if foo.has("bar") else null))
  `,
};
exports.testOptionalAccess = {
    ts: `
let foo: { bar?: number } = { bar: 1 }
print(foo.bar)
  `,
    expected: `
var foo = { "bar": 1 }
print((foo.bar if foo.has("bar") else null))
  `,
};
exports.testOptionalAssignment = {
    ts: `
let foo: { bar?: number } = { bar: 1 }
foo.bar = 2
  `,
    expected: `
var foo = { "bar": 1 }
foo.bar = 2
  `,
};
exports.testComplexLhs = {
    ts: `
let foo: { bar?: number }[] = [{ bar: 1 }]
foo[0].bar = 2
  `,
    expected: `
var foo = [{ "bar": 1 }]
foo[0].bar = 2
  `,
};
exports.testNoSelfForSignal = {
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
};
exports.testAddSelfForParams = {
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
};
exports.testNullCoalesce = {
    ts: `
export class Test {
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
};
exports.testNullCoalesce2 = {
    ts: `
export class Test {
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
};
//# sourceMappingURL=parse_property_access_expression.js.map