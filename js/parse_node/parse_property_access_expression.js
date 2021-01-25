"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testComplexLhs = exports.testOptionalAssignment = exports.testOptionalAccess = exports.testNullableAccess = exports.testAccessRewriting2 = exports.testAccessRewriting = exports.testAccess = exports.parsePropertyAccessExpression = void 0;
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
    const leftType = props.program
        .getTypeChecker()
        .getTypeAtLocation(node.expression);
    // Compile things like KeyList.KEY_SPACE into KEY_SPACE
    if (ts_utils_1.isEnumType(leftType)) {
        const symbol = leftType.getSymbol();
        const declarations = symbol.declarations;
        const sourceFiles = declarations.map((d) => d.getSourceFile().fileName);
        const isGlobal = !!sourceFiles.find((f) => f.includes("@globals.d.ts"));
        if (isGlobal) {
            return parse_node_1.parseNode(node.name, props);
        }
    }
    return parse_node_1.combine({
        parent: node,
        nodes: [node.expression, node.name],
        props,
        content: (lhs, rhs) => {
            // TS requires you to write this.blah everywhere, but Godot does not, and in fact
            // even generates a warning since it cant prove that self.blah is real.
            if (lhs === "self") {
                return rhs;
            }
            // Godot does not like var foo = bar.baz when baz is not a key of bar
            // However, Godot is fine with bar.baz = foo even if baz is not a key.
            if (ts_utils_1.isDictionary(leftType) &&
                ts_utils_1.isNullable(node.name, props.program.getTypeChecker()) &&
                isRhs(node)) {
                return `(${lhs}.${rhs} if ${lhs}.has("${rhs}") else null)`;
            }
            return `${lhs}.${rhs}`;
        },
    });
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
let foo: { bar?: number } = { bar: 1 }
if (foo.bar === 1) {
  print (foo.bar)
}
  `,
    expected: `
var foo = { "bar": 1 }
if (foo.bar if foo.has("bar") else null) == 1:
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
//# sourceMappingURL=parse_property_access_expression.js.map