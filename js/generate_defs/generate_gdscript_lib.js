"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGdscriptLib = exports.parseMethod = exports.getCodeForMethod = void 0;
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = require("xml2js");
const generate_library_1 = require("./generate_library");
const getCodeForMethod = (generateAsGlobals, props) => {
    const { name, isConstructor, argumentList, docString, isAbstract, returnType, } = props;
    switch (name) {
        case "connect":
        case "yield":
        case "typeof":
        case "print":
            return "";
        case "change_scene":
            return `change_scene(path: SceneName): int`;
        case "get_nodes_in_group":
            return `get_nodes_in_group<T extends keyof Groups>(group: T): Groups[T][]`;
        case "has_group":
            return `has_group<T extends keyof Groups>(name: T): bool`;
        case "emit_signal":
            return "emit_signal<U extends any[], T extends Signal<U>>(signal: T, ...args: U): void;";
        default:
            if (isConstructor) {
                return "";
            }
            if (generateAsGlobals) {
                return `${docString}
declare const ${name}: (${argumentList}) => ${returnType}
    `;
            }
            else {
                return `${docString}
${isAbstract ? "protected " : ""}${name}(${argumentList}): ${returnType};`;
            }
    }
};
exports.getCodeForMethod = getCodeForMethod;
const parseMethod = (method, props) => {
    const containingClassName = props?.containgClassName ?? undefined;
    const generateAsGlobal = props?.generateAsGlobals ?? false;
    const name = method.$.name;
    const args = method.argument;
    const isVarArgs = method.$.qualifiers === "vararg";
    const isConstructor = containingClassName !== undefined && name === containingClassName;
    const docString = generate_library_1.formatJsDoc(method.description[0].trim());
    let returnType = generate_library_1.godotTypeToTsType(method.return?.[0]["$"].type ?? "Variant");
    let argumentList = "";
    if (args || isVarArgs) {
        if (isVarArgs) {
            argumentList = "...args: any[]";
        }
        else {
            argumentList = args
                .map((arg) => {
                let argName = generate_library_1.sanitizeGodotNameForTs(arg["$"].name);
                let argType = generate_library_1.godotTypeToTsType(arg["$"].type);
                let isOptional = !!arg["$"].default;
                if (argType === "StringName") {
                    if (argName === "group") {
                        argType = "keyof Groups";
                    }
                    if (argName === "action") {
                        argType = "Action";
                    }
                }
                return `${argName}${isOptional ? "?" : ""}: ${argType}`;
            })
                .join(", ");
        }
    }
    // Special case for TileSet#tile_get_shapes
    if (name === "tile_get_shapes") {
        returnType = `{
  autotile_coord: Vector2,
  one_way: bool,
  one_way_margin: int,
  shape: CollisionShape2D,
  shape_transform: Transform2D,
}[]`;
    }
    const isAbstract = name.startsWith("_");
    const result = {
        name,
        argumentList,
        isConstructor,
        docString,
        returnType,
        isAbstract,
    };
    return {
        ...result,
        codegen: exports.getCodeForMethod(generateAsGlobal, result),
    };
};
exports.parseMethod = parseMethod;
const generateGdscriptLib = async (path) => {
    const content = fs_1.default.readFileSync(path, "utf-8");
    const json = await xml2js_1.parseStringPromise(content);
    let result = "";
    const globalMethods = json["class"].methods[0].method;
    const parsedMethods = globalMethods.map((m) => exports.parseMethod(m, { generateAsGlobals: true }));
    for (const parsedMethod of parsedMethods) {
        result += `
${parsedMethod.codegen}
    `;
    }
    return result;
};
exports.generateGdscriptLib = generateGdscriptLib;
// generateGdscriptLib(
//   "/Users/johnfn/code/tsgd/godot/modules/gdscript/doc_classes/@GDScript.xml"
// )
//# sourceMappingURL=generate_gdscript_lib.js.map