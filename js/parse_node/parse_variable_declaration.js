"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testIntFloat4 = exports.testIntFloat3 = exports.testIntFloat2 = exports.testIntFloat1 = exports.testKeyword = exports.testAutoloadVariableDeclaration3 = exports.testAutoloadVariableDeclaration2 = exports.testClassNameWithoutAutoload = exports.testAutoloadVariableDeclaration = exports.testNormalVariableDeclaration = exports.testDestructureRename = exports.testDestructure4 = exports.testDestructure3 = exports.testDestructure2 = exports.testDestructure = exports.parseVariableDeclaration = exports.getDestructuredNamesAndAccessStrings = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const ts_utils_1 = require("../ts_utils");
const getDestructuredNamesAndAccessStrings = (node, access = "") => {
    if (node.kind === typescript_1.SyntaxKind.Identifier) {
        const id = node;
        return [{ id, access: access }];
    }
    else if (node.kind === typescript_1.SyntaxKind.ObjectBindingPattern) {
        const obj = node;
        return obj.elements
            .map((elem) => exports.getDestructuredNamesAndAccessStrings(elem.name, access + "." + (elem.propertyName?.getText() ?? elem.name.getText())))
            .flat();
    }
    else if (node.kind === typescript_1.SyntaxKind.ArrayBindingPattern) {
        const obj = node;
        return obj.elements
            .map((elem, i) => {
            if (elem.kind === typescript_1.SyntaxKind.BindingElement) {
                return exports.getDestructuredNamesAndAccessStrings(elem.name, access + `[${i}]`);
            }
            else {
                throw new Error("I dont know what this is");
            }
        })
            .flat();
    }
    throw new Error("Completely and totally impossible. You will never see this. I promise.");
};
exports.getDestructuredNamesAndAccessStrings = getDestructuredNamesAndAccessStrings;
const parseVariableDeclaration = (node, props) => {
    let declaredType = node.type?.getText();
    if (declaredType !== "int" && declaredType !== "float") {
        declaredType = undefined;
    }
    let inferredType = ts_utils_1.getPreciseInitializerType(node.initializer);
    const type = declaredType ?? inferredType;
    const usages = props.usages.get(node.name);
    const unused = usages?.uses.length === 0 ? "_" : "";
    const typeString = type ? `: ${type}` : "";
    if (node.name.kind === typescript_1.SyntaxKind.Identifier) {
        const decl = props.program
            .getTypeChecker()
            .getTypeAtLocation(node)
            .getSymbol()?.declarations[0];
        const isAutoload = props.isAutoload &&
            decl?.kind === typescript_1.SyntaxKind.ClassDeclaration &&
            decl.getSourceFile() === node.getSourceFile() &&
            node.parent.parent.parent.kind === typescript_1.SyntaxKind.SourceFile;
        if (isAutoload) {
            return parse_node_1.combine({
                parent: node,
                nodes: [node.name, node.initializer],
                props,
                parsedStrings: (nodeName, init) => ``,
            });
        }
    }
    if (node.name.kind === typescript_1.SyntaxKind.Identifier) {
        props.scope.addName(node.name);
        return parse_node_1.combine({
            parent: node,
            nodes: [node.name, node.initializer],
            props,
            parsedStrings: (nodeName, init) => `var ${unused}${nodeName}${typeString}${init ? " = " + init : ""}`,
        });
    }
    else {
        let destructuredNames = exports.getDestructuredNamesAndAccessStrings(node.name);
        for (const { id } of destructuredNames) {
            props.scope.addName(id);
        }
        const genName = props.scope.createUniqueName();
        return parse_node_1.combine({
            parent: node,
            nodes: [node.initializer, ...destructuredNames.map((d) => d.id)],
            props,
            parsedStrings: (initializer, ...nodes) => {
                return `
var ${genName} = ${initializer}
${nodes
                    .map((node, i) => `var ${node} = ${genName}${destructuredNames[i].access}`)
                    .join("\n")}
`;
            },
        });
    }
};
exports.parseVariableDeclaration = parseVariableDeclaration;
exports.testDestructure = {
    ts: `
let [a, [b, c]] = [1, [2, 3]]
  `,
    expected: `
var __gen = [1, [2, 3]]
var a = __gen[0]
var b = __gen[1][0]
var c = __gen[1][1]
  `,
};
exports.testDestructure2 = {
    ts: `
let [a] = [1]
let [b] = [1]
  `,
    expected: `
var __gen = [1]
var a = __gen[0]
var __gen1 = [1]
var b = __gen1[0]
  `,
};
exports.testDestructure3 = {
    ts: `
let { a, b } = { a: 1, b: 2 }
  `,
    expected: `
var __gen = { "a": 1, "b": 2 }
var a = __gen.a
var b = __gen.b
  `,
};
exports.testDestructure4 = {
    ts: `
let __gen = 1
let { a, b } = { a: 1, b: 2 }

print(__gen)
  `,
    expected: `
var __gen: int = 1
var __gen1 = { "a": 1, "b": 2 }
var a = __gen1.a
var b = __gen1.b
print(__gen)
  `,
};
exports.testDestructureRename = {
    ts: `
let { a: a1, b: b1 } = { a: 1, b: 2 }
  `,
    expected: `
var __gen = { "a": 1, "b": 2 }
var a1 = __gen.a
var b1 = __gen.b
  `,
};
exports.testNormalVariableDeclaration = {
    ts: `
let x = 1  
let y = 'a'
  `,
    expected: `
var _x: int = 1  
var _y = "a"
  `,
};
exports.testAutoloadVariableDeclaration = {
    isAutoload: true,
    ts: `
export class Blah {

}

const x: Blah = new Blah();
  `,
    expected: `
  `,
};
exports.testClassNameWithoutAutoload = {
    ts: `
export class Blah {

}

const x: Blah = new Blah();
  `,
    expected: `
class_name Blah

var _x = Blah.new()
  `,
};
exports.testAutoloadVariableDeclaration2 = {
    isAutoload: true,
    ts: `
export class Blah {

}

const x: Blah = new Blah();
  `,
    expected: `
  `,
};
exports.testAutoloadVariableDeclaration3 = {
    isAutoload: true,
    ts: `
export class Blah {
  test() {
    const blah: Blah = new Blah();
  }
}

const x: Blah = new Blah();
  `,
    expected: `
func test():
  var _blah = Blah.new()
  `,
};
exports.testKeyword = {
    ts: `
let preload = 123
print(preload)
  `,
    expected: `
var preload_: int = 123
print(preload_)
  `,
};
exports.testIntFloat1 = {
    ts: `
let int = 1
  `,
    expected: `
var _int: int = 1
  `,
};
exports.testIntFloat2 = {
    ts: `
let float = 1.0
  `,
    expected: `
var _float: float = 1.0
  `,
};
exports.testIntFloat3 = {
    ts: `
let float: int = 1.0
  `,
    expected: `
var _float: int = 1.0
  `,
};
exports.testIntFloat4 = {
    ts: `
let float: float = 0
  `,
    expected: `
var _float: float = 0
  `,
};
//# sourceMappingURL=parse_variable_declaration.js.map