"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGodotLibraryDefinitions = exports.formatJsDoc = exports.godotTypeToTsType = exports.sanitizeGodotNameForTs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const xml2js_1 = require("xml2js");
const project_1 = require("../project/project");
const ts_utils_1 = require("../ts_utils");
const generate_base_1 = require("./generate_base");
const generate_gdscript_lib_1 = require("./generate_gdscript_lib");
function sanitizeGodotNameForTs(name, type) {
    if (name === "with" ||
        name === "var" ||
        name === "class" ||
        name === "default" ||
        name === "in") {
        if (type === "argument") {
            return "_" + name;
        }
        else {
            return `"${name}"`;
        }
    }
    // for enum names in @GlobalScope
    name = name.replace(".", "_");
    // Bizarre case in SliderJoint3D.xml
    if (name.includes("/")) {
        if (type === "argument") {
            return name.replace("/", "_");
        }
        else {
            return `"${name}"`;
        }
    }
    return name;
}
exports.sanitizeGodotNameForTs = sanitizeGodotNameForTs;
function godotTypeToTsType(godotType) {
    if (godotType === "int") {
        return "int";
    }
    if (godotType === "float") {
        return "float";
    }
    if (godotType === "bool") {
        return "boolean";
    }
    if (godotType === "Array") {
        return "any[]";
    }
    if (godotType === "PackedScene") {
        return "PackedScene<any>";
    }
    if (godotType === "Variant") {
        return "any";
    }
    if (godotType === "String") {
        return "string";
    }
    if (godotType.startsWith("Transform2D")) {
        return "Transform2D";
    }
    if (godotType === "Dictionary") {
        return "Dictionary<any, any>";
    }
    if (godotType === "NodePath") {
        // TODO
        return "NodePathType";
    }
    if (!!godotType.match(/^[0-9]+$/)) {
        return "int";
    }
    return godotType;
}
exports.godotTypeToTsType = godotTypeToTsType;
function formatJsDoc(input) {
    if (!input) {
        return `/** No documentation provided. */`;
    }
    let lines = input.split("\n");
    if (lines.length === 1) {
        return `/** ${input} */`;
    }
    const indentationLength = lines[1].length - lines[1].trimStart().length;
    // All lines are indented except the first one for some reason.
    lines = [
        lines[0],
        ...lines.slice(1).map((line) => line.slice(indentationLength)),
    ];
    lines = lines.filter((line) => line.trim() !== "");
    let result = "/**\n";
    let insideCodeBlock = false;
    for (let line of lines) {
        if (line.includes("[codeblock]")) {
            result += " * @example \n";
            insideCodeBlock = true;
        }
        if (line.includes("[/codeblock]")) {
            result += " * @summary \n";
            insideCodeBlock = false;
        }
        if (line.includes("[codeblocks]")) {
            result += " * @example \n";
            insideCodeBlock = true;
        }
        if (line.includes("[/codeblocks]")) {
            result += " * @summary \n";
            insideCodeBlock = false;
        }
        line = line.replaceAll("[gdscript]", "");
        line = line.replaceAll("[/gdscript]", "");
        line = line.replaceAll("[csharp]", "");
        line = line.replaceAll("[/csharp]", "");
        line = line.replaceAll("[b]", "**");
        line = line.replaceAll("[/b]", "**");
        line = line.replaceAll("[i]", "**");
        line = line.replaceAll("[/i]", "**");
        line = line.replaceAll("[code]", "`");
        line = line.replaceAll("[/code]", "`");
        line = line.replaceAll("[codeblock]", "");
        line = line.replaceAll("[/codeblock]", "");
        line = line.replaceAll("[codeblocks]", "");
        line = line.replaceAll("[/codeblocks]", "");
        result += " * " + line + "\n" + (!insideCodeBlock ? " *\n" : "");
    }
    result += "*/";
    return result;
}
exports.formatJsDoc = formatJsDoc;
async function generateGodotLibraryDefinitions() {
    // TODO: Refactor this out
    let csgClassesPath = path_1.default.join(project_1.TsGdProjectClass.Paths.godotSourceRepoPath ?? "", "modules/csg/doc_classes");
    let normalClassesPath = path_1.default.join(project_1.TsGdProjectClass.Paths.godotSourceRepoPath ?? "", "doc/classes");
    let gdscriptPath = path_1.default.join(project_1.TsGdProjectClass.Paths.godotSourceRepoPath ?? "", "modules/gdscript/doc_classes");
    fs_1.default.mkdirSync(project_1.TsGdProjectClass.Paths.staticGodotDefsPath, { recursive: true });
    fs_1.default.mkdirSync(project_1.TsGdProjectClass.Paths.dynamicGodotDefsPath, { recursive: true });
    const singletons = [];
    async function parseFile(path) {
        const content = fs_1.default.readFileSync(path, "utf-8");
        const json = await xml2js_1.parseStringPromise(content);
        const methodsXml = json.class.methods?.[0].method ?? [];
        const members = (json.class.members ?? [])[0]?.member ?? [];
        let className = json.class["$"].name;
        const inherits = json.class["$"].inherits;
        const constants = (json.class.constants ?? [])[0]?.constant ?? [];
        const signals = (json.class.signals ?? [])[0]?.signal ?? [];
        const methods = methodsXml.map((method) => generate_gdscript_lib_1.parseMethod(method, { containgClassName: className }));
        const constructorInfo = methods.filter((method) => method.isConstructor);
        if (className === "Signal") {
            className = "Signal<T extends (...args: any[]): any>";
        }
        if (singletons.includes(className)) {
            className += "Class";
        }
        const output = `
${formatJsDoc(json.class.description[0])}
declare class ${className}${inherits ? ` extends ${inherits}` : ""} {

  
${formatJsDoc(json.class.description[0])}
${(() => {
            if (className.toLowerCase() === "signal<t>") {
                return "";
            }
            let constructors = "";
            if (constructorInfo.length === 0) {
                constructors += `  "new"(): ${className};\n`;
            }
            else {
                constructors += `
${constructorInfo
                    .map((inf) => `  constructor(${inf.argumentList});`)
                    .join("\n")}
`;
            }
            constructors += `  static "new"(): ${className};\n`;
            return constructors;
        })()}

${members
            .map((property) => {
            const propertyName = sanitizeGodotNameForTs(property["$"].name, "property");
            if (!property["_"]) {
                return "";
            }
            // Godot allows for a method and a variable with the same name, but TS does not.
            if (propertyName === "rotate" && className === "PathFollow2D") {
                return;
            }
            return `
${formatJsDoc(property["_"].trim())}
${propertyName}: ${godotTypeToTsType(property["$"].type)};`;
        })
            .join("\n")}

${methods
            .map((method) => {
            return method.codegen;
        })
            .join("\n\n")}

  // connect<T extends SignalsOf<${className}>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<${className}Signals>>(signal: T, method: SignalFunction<${className}Signals[T]>): number;

${(() => {
            // Generate wrapper functions for operator overloading stuff.
            if (className === "Vector2" ||
                className === "Vector2i" ||
                className === "Vector3" ||
                className === "Vector3i") {
                return `
add(other: number | ${className}): ${className};
sub(other: number | ${className}): ${className};
mul(other: number | ${className}): ${className};
div(other: number | ${className}): ${className};
`;
            }
            else {
                return "";
            }
        })()}

${constants
            .map((c) => {
            const value = c["$"].value.trim();
            let genericClassNameRe = /([A-Z][a-zA-Z0-9]*)\(.*\)/;
            const match = genericClassNameRe.exec(value);
            const type = godotTypeToTsType(match?.[1] ?? "any");
            if (type) {
                return `${formatJsDoc(c["_"] || "")}\nstatic ${c["$"].name}: ${type};\n`;
            }
            else {
                return `${formatJsDoc(c["_"] || "")}\n static ${c["$"].name}: ${type};\n`;
            }
        })
            .join("\n")}
}

declare class ${className}Signals${inherits ? ` extends ${inherits}Signals` : ""} {
  ${signals
            .map((signal) => {
            return `${formatJsDoc(signal.description[0])}\n${signal["$"].name}: Signal<(${(signal.argument || [])
                .map((arg) => arg["$"].name + ": " + godotTypeToTsType(arg["$"].type))
                .join(", ")}) => void>\n`;
        })
            .join("\n")}
}
`;
        return output;
    }
    async function parseGlobalScope(path) {
        const content = fs_1.default.readFileSync(path, "utf-8");
        const json = await xml2js_1.parseStringPromise(content);
        const methods = json.class.methods[0].method ?? [];
        const properties = (json.class.members ?? [])[0]?.member ?? [];
        const className = json.class["$"].name;
        const inherits = json.class["$"].inherits;
        const constants = (json.class.constants ?? [])[0]?.constant ?? [];
        const enums = {};
        for (const c of constants) {
            const doc = c["_"];
            const enumName = c["$"].enum;
            if (enumName) {
                enums[enumName] = [
                    ...(enums[enumName] || []),
                    { ...c["$"], doc: c["_"] },
                ];
            }
        }
        const result = `
declare const load: <T extends AssetPath>(path: T) => AssetType[T];
declare const preload: <T extends AssetPath>(path: T) => AssetType[T];
${properties
            .map((property) => {
            const name = sanitizeGodotNameForTs(property["$"].name, "property");
            // these dont have .xml files
            let commentOut = name === "VisualScriptEditor" || name === "GodotSharp";
            // TODO:
            if (name === "NavigationMeshGenerator") {
                commentOut = true;
            }
            singletons.push(name);
            if (!property["_"]) {
                return "";
            }
            return `
${formatJsDoc(property["_"].trim())}
${commentOut ? "//" : ""}declare const ${name}: ${godotTypeToTsType(property["$"].type)}Class;`;
        })
            .join("\n")}

${Object.keys(enums)
            .map((key) => {
            return `
    declare enum ${sanitizeGodotNameForTs(key, "argument")} {
      ${enums[key]
                .map((enumItem) => {
                return `${formatJsDoc(enumItem.doc)}\n${enumItem.name} = ${/^-?\d+$/.test(enumItem.value)
                    ? enumItem.value
                    : '"' + enumItem.value + '"'}`;
            })
                .join(",\n")}
    }
    `;
        })
            .join("\n")}
    `;
        return result;
    }
    async function writeLibraryDefinitions() {
        if (!fs_1.default.existsSync(csgClassesPath) || !fs_1.default.existsSync(normalClassesPath)) {
            console.info("No Godot source installation found, writing from backup...");
            let localGodotDefs = path_1.default.join(__dirname, "..", "..", "_godot_defs");
            ts_utils_1.copyFolderRecursiveSync(localGodotDefs, project_1.TsGdProjectClass.Paths.rootPath);
            console.info("Done.");
            return;
        }
        // This must come first because it parses out singletons
        // TODO - clean that up.
        const globalScope = await parseGlobalScope(path_1.default.join(normalClassesPath, "@GlobalScope.xml"));
        fs_1.default.writeFileSync(path_1.default.join(project_1.TsGdProjectClass.Paths.staticGodotDefsPath, "@globals.d.ts"), globalScope);
        const globalFunctions = await generate_gdscript_lib_1.generateGdscriptLib(path_1.default.join(gdscriptPath, "@GDScript.xml"));
        fs_1.default.writeFileSync(path_1.default.join(project_1.TsGdProjectClass.Paths.staticGodotDefsPath, "@global_functions.d.ts"), globalFunctions);
        const xmlPaths = [
            ...fs_1.default
                .readdirSync(csgClassesPath)
                .map((x) => path_1.default.join(csgClassesPath, x)),
            ...fs_1.default
                .readdirSync(normalClassesPath)
                .map((x) => path_1.default.join(normalClassesPath, x)),
        ].filter((file) => file.endsWith(".xml"));
        for (let fullPath of xmlPaths) {
            const fileName = path_1.default.basename(fullPath);
            if (fileName === "@GlobalScope.xml") {
                continue;
            }
            if (fileName === "Array.xml") {
                continue;
            }
            if (fileName === "Dictionary.xml") {
                continue;
            }
            if (fileName === "int.xml") {
                continue;
            }
            if (fileName === "float.xml") {
                continue;
            }
            if (fileName === "PackedScene.xml") {
                continue;
            }
            const result = await parseFile(fullPath);
            fs_1.default.writeFileSync(path_1.default.join(project_1.TsGdProjectClass.Paths.staticGodotDefsPath, fileName.slice(0, -4) + ".d.ts"), result);
        }
    }
    async function main() {
        generate_base_1.buildBase();
        await writeLibraryDefinitions();
    }
    // async function debug() {
    //   let fileName = 'KinematicBody2D.xml';
    //   const result = await parseFile(godotDocumentationPath + fileName);
    //   console.log(result);
    // }
    await main();
}
exports.generateGodotLibraryDefinitions = generateGodotLibraryDefinitions;
//# sourceMappingURL=generate_library.js.map