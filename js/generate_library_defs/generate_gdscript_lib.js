"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGdscriptLib = exports.parseMethod = exports.getCodeForMethod = void 0;
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = require("xml2js");
const generate_library_1 = require("./generate_library");
const getCodeForMethod = (generateAsGlobals, props, 
// TOOD: This should really not be undefined
containingClassName) => {
    const { name, isConstructor, argumentList, docString, isAbstract, returnType, } = props;
    switch (name) {
        case "connect":
        case "yield":
        case "typeof":
        case "rpc":
        case "rpc_id":
        case "print":
            return "";
        case "is_action_just_pressed":
            return `${docString}
is_action_just_pressed(action: Action): boolean;
      `;
        case "is_action_pressed":
            return `${docString}
is_action_pressed(action: Action): boolean;
      `;
        case "is_action_just_released":
            return `${docString}
is_action_just_released(action: Action): boolean;
      `;
        case "get_node":
            return `${docString}
get_node(path: NodePathType): Node;

${docString}
get_node_unsafe<T extends Node>(path: NodePathType): T;
`;
        case "change_scene":
            return `${docString}
change_scene(path: SceneName): int`;
        case "get_nodes_in_group":
            return `${docString}
get_nodes_in_group<T extends keyof Groups>(group: T): Groups[T][]`;
        case "has_group":
            return `${docString}
has_group<T extends keyof Groups>(name: T): boolean`;
        case "make_input_local":
            return "make_input_local<T extends InputEvent>(event: T): T";
        case "emit_signal":
            return `${docString}
emit_signal<U extends (...args: Args) => any, T extends Signal<U>, Args extends any[]>(signal: T, ...args: Args): void;`;
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
const argsToString = (args) => {
    let result = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const argName = generate_library_1.sanitizeGodotNameForTs(arg["$"].name, "argument");
        let argType = generate_library_1.godotTypeToTsType(arg["$"].type);
        const isOptional = args.slice(i).every((arg) => !!arg["$"].default);
        if (argType === "StringName") {
            if (argName === "group") {
                argType = "keyof Groups";
            }
            if (argName === "action") {
                argType = "Action";
            }
        }
        result.push(`${argName}${isOptional ? "?" : ""}: ${argType}`);
    }
    return result;
};
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
            argumentList = argsToString(args).join(", ");
        }
    }
    // Special case for TileSet#tile_get_shapes
    if (name === "tile_get_shapes") {
        returnType = `{
  autotile_coord: Vector2,
  one_way: boolean,
  one_way_margin: int,
  shape: CollisionShape2D,
  shape_transform: Transform2D,
}[]`;
    }
    if (name === "assert") {
        returnType = `asserts condition`;
    }
    if (name === "get_overlapping_bodies") {
        returnType = "PhysicsBody2D[]";
    }
    if (name === "get_datetime") {
        returnType = `{
      year: number;
      month: number;
      day: number;
      weekday: number;
      dst: boolean;
      hour: number;
      minute: number;
      second: number;
    }`;
    }
    if (name === "get_children") {
        returnType = `Node[]`;
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
        codegen: exports.getCodeForMethod(generateAsGlobal, result, containingClassName),
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
        if (parsedMethod.name === "load") {
            continue;
        }
        if (parsedMethod.name === "preload") {
            continue;
        }
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