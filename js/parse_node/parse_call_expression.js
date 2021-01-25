"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMapCapture = exports.testMap = exports.testArrowFunction = exports.testNormalVec = exports.testAddVec2 = exports.testAddVec = exports.testBasicCall = exports.parseCallExpression = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const ts_utils_1 = require("../ts_utils");
const parse_arrow_function_1 = require("./parse_arrow_function");
const LibraryFunctions = {
    map: {
        name: "map",
        definition: (name) => `
func ${name}(list, fn, captures):
  var result = []

  for item in list:
    result.append(fn.call_func(item, captures))

  return result
    `,
    },
    filter: {
        name: "filter",
        definition: (name) => `
func ${name}(list, fn, captures):
  var result = []

  for item in list:
    if fn.call_func(item, captures):
      result.append(item)

  return result
    `,
    },
};
const parseCallExpression = (node, props) => {
    let expression = node.expression;
    let args = node.arguments;
    if (node.expression.kind === typescript_1.SyntaxKind.SuperKeyword) {
        return parse_node_1.combine({
            parent: node,
            nodes: node.expression,
            props,
            content: () => "",
        });
    }
    // This block compiles vec.add(vec2) into vec + vec2.
    // node = [[ a.b(c) ]]
    if (node.expression.kind === typescript_1.SyntaxKind.PropertyAccessExpression) {
        // prop = [[ a.b ]](c)
        const prop = node.expression;
        const functionName = prop.name.getText();
        const type = props.program
            .getTypeChecker()
            .getTypeAtLocation(prop.expression);
        const stringType = props.program.getTypeChecker().typeToString(type);
        if (ts_utils_1.isArrayType(type)) {
            if (functionName in LibraryFunctions) {
                const libFunctionName = functionName;
                if (node.arguments[0].kind !== typescript_1.SyntaxKind.ArrowFunction) {
                    throw new Error("Can't do map w/o an arrow function!");
                }
                const arrowFunction = node.arguments[0];
                const { capturedScopeObject } = parse_arrow_function_1.getCapturedScope(arrowFunction, props.program.getTypeChecker());
                const result = parse_node_1.combine({
                    parent: node,
                    nodes: [prop.expression, ...args],
                    props,
                    content: (expr, ...args) => {
                        return `__${libFunctionName}(${[expr, ...args].join(", ")}, ${capturedScopeObject})`;
                    },
                });
                result.hoistedLibraryFunctions = [
                    LibraryFunctions[libFunctionName].definition("__" + libFunctionName),
                ];
                return result;
            }
        }
        if (stringType === "Vector2" ||
            stringType === "Vector2i" ||
            stringType === "Vector3" ||
            stringType === "Vector3i") {
            let operator = undefined;
            if (functionName === "add")
                operator = "+";
            if (functionName === "sub")
                operator = "-";
            if (functionName === "mul")
                operator = "*";
            if (functionName === "div")
                operator = "/";
            if (operator) {
                return parse_node_1.combine({
                    parent: node,
                    nodes: [prop.expression, node.arguments[0]],
                    props,
                    content: (exp, arg) => `${exp} ${operator} ${arg}`,
                });
            }
        }
    }
    const decls = props.program
        .getTypeChecker()
        .getTypeAtLocation(node.expression).symbol?.declarations;
    const isArrowFunction = decls &&
        decls[0].kind === typescript_1.SyntaxKind.ArrowFunction &&
        decls[0].getSourceFile() === node.getSourceFile();
    return parse_node_1.combine({
        parent: node,
        nodes: [expression, ...args],
        props,
        content: (expr, ...args) => {
            if (expr === "Yield") {
                expr = "yield";
            }
            if (expr === "emit_signal") {
                if (args[0].startsWith("this")) {
                    args[0] = args[0].slice("this.".length);
                }
                args[0] = '"' + args[0] + '"';
            }
            if (isArrowFunction) {
                const { capturedScopeObject } = parse_arrow_function_1.getCapturedScope(decls[0], props.program.getTypeChecker());
                return `${expr}.call_func(${[...args, capturedScopeObject].join(", ")})`;
            }
            else {
                return `${expr}(${args.join(", ")})`;
            }
        },
    });
};
exports.parseCallExpression = parseCallExpression;
exports.testBasicCall = {
    ts: `foo("bar")`,
    expected: `foo("bar")`,
};
exports.testAddVec = {
    ts: `const v1: Vector2; const v2: Vector2; v1.add(v2)`,
    expected: `
var v1
var v2
v1 + v2
`,
};
exports.testAddVec2 = {
    expectFail: true,
    ts: `const foo: { v: Vector2; }; const v2: Vector2; foo.v.add(v2)`,
    expected: `
var foo
var v2
foo['v'] + v2
`,
};
exports.testNormalVec = {
    ts: `const v1: Vector2; v1.distance_to(v1)`,
    expected: `
var v1
v1.distance_to(v1)
`,
};
exports.testArrowFunction = {
    ts: `
const test = () => 5;
test()  
  `,
    expected: `
func func1(captures):
  return 5
var test = funcref(self, "func1")
test.call_func({})
`,
};
exports.testMap = {
    ts: `
let x = [1, 2, 3]
x.map(y => y * 3)
  `,
    expected: `
${LibraryFunctions.map.definition("__map")}
func func1(y: float, captures):
  return y * 3
var x = [1, 2, 3]
__map(x, funcref(self, "func1"), {})
`,
};
exports.testMapCapture = {
    ts: `
let x = [1, 2, 3]
let z = 5
let big = { a : 6 }
x.map(y => {
  return z + big.a + y * 3
})
  `,
    expected: `
${LibraryFunctions.map.definition("__map")}
func func1(y: float, captures):
  var z = captures.z
  var big = captures.big
  return z + big.a + y * 3
var x = [1, 2, 3]
var z: int = 5
var big = { "a": 6 }
__map(x, funcref(self, "func1"), {"z": z, "big": big})
`,
};
// TODO: this also fails lol
// for (let i = 0; i < 3; i++) {
// }
// return z + big.a + y * 3
// TODO this also fails bc it's double quoted.
// let big = { "a" : 6 }
//# sourceMappingURL=parse_call_expression.js.map