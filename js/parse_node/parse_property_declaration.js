"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNumberTypeByNoAnnotation2 = exports.testNumberTypeByNoAnnotation = exports.testNumberTypeByAnnotation2 = exports.testNumberTypeByAnnotation = exports.testExportObj2 = exports.testExportObj = exports.testNotSoNormalExportedVariable10 = exports.testNotSoNormalExportedVariable9 = exports.testNotSoNormalExportedVariable8 = exports.testNotSoNormalExportedVariable7 = exports.testNotSoNormalExportedVariable6 = exports.testNormalExportedVariable5 = exports.testNormalExportedVariable4 = exports.testNormalExportedVariable3 = exports.testNormalExportedVariable2 = exports.testNormalExportedVariable = exports.parsePropertyDeclaration = void 0;
const parse_node_1 = require("../parse_node");
const ts_utils_1 = require("../ts_utils");
const errors_1 = require("../errors");
const isExported = (node) => {
    for (const dec of node.decorators ?? []) {
        if (dec.expression.getText() === "exports") {
            return true;
        }
    }
    return false;
};
const isOnReady = (node, props) => {
    if (node.initializer) {
        // I think there's some sort of race where we save .d.ts files too fast to
        // then have the type checker re-analyze them, so the get_node() calls have a habit
        // of coming back as 'any' when we use the typechecker on them.
        const initializerText = props.getNodeText(node.initializer);
        if (initializerText.includes("get_node(") ||
            initializerText.includes("get_node_unsafe")) {
            return true;
        }
        // TODO: This isn't quite so simple, because we could do something like node.value - where
        // node is Node but value is int - which we should mark as onready, but we aren't currently
        const initializerType = props.program
            .getTypeChecker()
            .getTypeAtLocation(node.initializer);
        const hierarchy = ts_utils_1.getTypeHierarchy(initializerType).map((x) => props.program.getTypeChecker().typeToString(x));
        return hierarchy.includes("Node2D") || hierarchy.includes("Node");
    }
    return false;
};
const getSuperclassType = (classType) => {
    const baseTypes = classType.getBaseTypes() ?? [];
    if (baseTypes.length === 0) {
        return null;
    }
    if (baseTypes.length > 1) {
        throw new Error("> 1 base types; not sure which one to pick!");
    }
    return baseTypes[0];
};
const parsePropertyDeclaration = (node, props) => {
    let klass = node.parent;
    let classType = props.program.getTypeChecker().getTypeAtLocation(klass);
    let type = props.program.getTypeChecker().getTypeAtLocation(node);
    let superclassType = getSuperclassType(classType);
    let nameOrError = ts_utils_1.getGodotType(node, props.program.getTypeChecker().getTypeAtLocation(node), props, false, node.initializer, node.type);
    if (nameOrError.errors) {
        for (const error of nameOrError.errors) {
            props.addError(error);
        }
    }
    let typeGodotName = ts_utils_1.getGodotType(node, props.program.getTypeChecker().getTypeAtLocation(node), props, false, node.initializer, node.type);
    let typeName = type.symbol?.getName() ?? "";
    let typeHintName = typeGodotName.result;
    typeGodotName.errors?.forEach((error) => props.addError(error));
    if (ts_utils_1.isEnumType(type)) {
        typeGodotName.result = props.program.getTypeChecker().typeToString(type);
    }
    if (typeName === "Signal") {
        let signalName = node.name.getText();
        if (signalName.startsWith("$")) {
            signalName = signalName.slice(1);
        }
        else {
            props.addError({
                description: "Signals must be prefixed with $.",
                error: errors_1.ErrorName.SignalsMustBePrefixedWith$,
                location: node,
            });
        }
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            parsedStrings: () => `signal ${signalName}`,
        });
    }
    let exportText = "";
    if (isExported(node)) {
        let typeGodotName = ts_utils_1.getGodotType(node, props.program.getTypeChecker().getTypeAtLocation(node), props, true, // isExported
        node.initializer, node.type);
        // TODO: Have a fallback
        exportText = isExported(node)
            ? `export(${typeGodotName.result ?? "null"}) `
            : "";
    }
    const onReady = isOnReady(node, props);
    return parse_node_1.combine({
        parent: node,
        nodes: [node.initializer, node.name],
        props,
        parsedStrings: (initializer, name) => {
            // Don't redeclare properties defined in a superclass. This is useful in
            // TS (because you can define them w/ more precise types) but causes an
            // error in Godot.
            if (superclassType?.getProperties().find((prop) => prop.name === name)) {
                return "";
            }
            return `${exportText}${onReady ? "onready " : ""}var ${name}${typeHintName ? `: ${typeHintName}` : ""}${initializer && ` = ${initializer}`}`;
        },
    });
};
exports.parsePropertyDeclaration = parsePropertyDeclaration;
exports.testNormalExportedVariable = {
    ts: `
export class Test {
  @exports
  foo: int
}
  `,
    expected: `
class_name Test
export(int) var foo: int
`,
};
exports.testNormalExportedVariable2 = {
    ts: `
export class Test {
  @exports
  foo: float
}
  `,
    expected: `
class_name Test
export(float) var foo: float
`,
};
exports.testNormalExportedVariable3 = {
    ts: `
export class Test {
  @exports
  foo: string
}
  `,
    expected: `
class_name Test
export(String) var foo: String
`,
};
exports.testNormalExportedVariable4 = {
    ts: `
export class Test {
  @exports
  foo: { [key: string]: string }
}
  `,
    expected: `
class_name Test
export(Dictionary) var foo
`,
};
exports.testNormalExportedVariable5 = {
    ts: `
export class Test {
  @exports
  foo: number[]
}
  `,
    expected: `
class_name Test
export(Array) var foo
`,
};
exports.testNotSoNormalExportedVariable6 = {
    ts: `
export class Test {
  @exports
  foo: { [key: string]: string }[]
}
  `,
    expected: `
class_name Test
export(Array) var foo
`,
};
exports.testNotSoNormalExportedVariable7 = {
    ts: `
export class Test {
  @exports
  foo: int | null
}
  `,
    expected: `
class_name Test
export(int) var foo
`,
};
exports.testNotSoNormalExportedVariable8 = {
    ts: `
export class Test {
  @exports
  foo: int | null | undefined
}
  `,
    expected: `
class_name Test
export(int) var foo
`,
};
exports.testNotSoNormalExportedVariable9 = {
    ts: `
export class Test {
  @exports
  foo: { [key: string]: string } | null | undefined
}
  `,
    expected: `
class_name Test
export(Dictionary) var foo
`,
};
exports.testNotSoNormalExportedVariable10 = {
    ts: `
export enum MyEnum {

}

export class Test {
  @exports
  foo: MyEnum
}
  `,
    expected: `
class_name Test
const MyEnum = preload("_MyEnum.gd").MyEnum
export(MyEnum) var foo
`,
};
exports.testExportObj = {
    ts: `
export class Test {
  @exports
  foo: Vector2
}
  `,
    expected: `
class_name Test
export(Vector2) var foo
`,
};
exports.testExportObj2 = {
    ts: `
export class Test {
  @exports
  foo: Vector2 | null
}
  `,
    expected: `
class_name Test
export(Vector2) var foo
`,
};
exports.testNumberTypeByAnnotation = {
    ts: `
export class Test {
  x: int = 1
}
  `,
    expected: `
class_name Test
var x: int = 1
`,
};
exports.testNumberTypeByAnnotation2 = {
    ts: `
export class Test {
  x: float = 1
}
  `,
    expected: `
class_name Test
var x: float = 1
`,
};
exports.testNumberTypeByNoAnnotation = {
    ts: `
export class Test {
  x = 1
}
  `,
    expected: `
class_name Test
var x: int = 1
`,
};
exports.testNumberTypeByNoAnnotation2 = {
    ts: `
export class Test {
  x = 1.0
}
  `,
    expected: `
class_name Test
var x: float = 1.0
`,
};
//# sourceMappingURL=parse_property_declaration.js.map