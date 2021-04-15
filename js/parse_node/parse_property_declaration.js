"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePropertyDeclaration = void 0;
const parse_node_1 = require("../parse_node");
const ts_utils_1 = require("../ts_utils");
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
        if (node.initializer.getText().includes("get_node(")) {
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
    let nameOrError = ts_utils_1.getGodotType(node, props, node.initializer, node.type);
    if (nameOrError.errors) {
        for (const error of nameOrError.errors) {
            props.addError(error);
        }
    }
    let typeGodotName = ts_utils_1.getGodotType(node, props, node.initializer, node.type);
    let typeName = type.symbol?.getName() ?? "";
    let typeHintName = typeGodotName.result;
    typeGodotName.errors?.forEach((error) => props.addError(error));
    if (ts_utils_1.isEnumType(type)) {
        typeGodotName.result = props.program.getTypeChecker().typeToString(type);
    }
    if (typeName === "Signal") {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            content: () => `signal ${node.name.getText()}`,
        });
    }
    const exportText = isExported(node) ? `export(${typeGodotName.result}) ` : "";
    const onReady = isOnReady(node, props);
    return parse_node_1.combine({
        parent: node,
        nodes: [node.initializer, node.name],
        props,
        content: (initializer, name) => {
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
//# sourceMappingURL=parse_property_declaration.js.map