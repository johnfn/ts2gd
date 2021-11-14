"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImportDeclaration = exports.getImportResPathForEnum = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const errors_1 = require("../errors");
const path_1 = __importDefault(require("path"));
const ts_utils_1 = require("../ts_utils");
const project_1 = require("../project/project");
const tsutils_1 = require("tsutils");
const getPathWithoutExtension = (node, props) => {
    const importPathLiteral = node.moduleSpecifier;
    const importPath = importPathLiteral.text;
    let pathToImportedTs = "";
    if (importPath.startsWith(".")) {
        // Handle relative paths
        pathToImportedTs = path_1.default.join(path_1.default.dirname(node.getSourceFile().fileName), importPath);
    }
    else {
        // Handle absolute paths
        pathToImportedTs = path_1.default.join(project_1.TsGdProjectClass.Paths.rootPath, importPath);
    }
    return pathToImportedTs;
};
const getImportResPathForEnum = (node, props) => {
    const enumSymbol = node.getSymbol();
    if (!enumSymbol) {
        throw new Error("Can't find symbol for node.");
    }
    const enumDeclarations = enumSymbol.declarations;
    if (enumDeclarations.length === 0 || enumDeclarations.length > 1) {
        throw new Error(`Invalid length for declarations: ${enumDeclarations.length}`);
    }
    const enumDeclaration = enumDeclarations[0];
    const enumSourceFile = enumDeclaration.getSourceFile();
    const enumSourceFileAsset = props.project
        .sourceFiles()
        .find((sf) => sf.fsPath === enumSourceFile.fileName);
    if (!enumSourceFileAsset) {
        throw new Error(`Can't find associated sourcefile for ${enumSourceFile.fileName}`);
    }
    let enumTypeString = props.program.getTypeChecker().typeToString(node);
    if (enumTypeString.startsWith("typeof ")) {
        enumTypeString = enumTypeString.slice("typeof ".length);
    }
    const pathWithoutEnum = enumSourceFileAsset.resPath;
    const importPath = pathWithoutEnum.slice(0, -".gd".length) + "_" + enumTypeString + ".gd";
    return {
        resPath: importPath,
        sourceFile: enumSourceFile,
        enumName: enumTypeString,
    };
};
exports.getImportResPathForEnum = getImportResPathForEnum;
const parseImportDeclaration = (node, props) => {
    // Step 1: resolve full path
    const pathWithoutExtension = getPathWithoutExtension(node, props);
    let pathToImportedTs = pathWithoutExtension + ".ts";
    const namedBindings = node.importClause?.namedBindings;
    if (!namedBindings) {
        throw new Error("Unsupported import type!");
    }
    let imports = [];
    if (namedBindings.kind === typescript_1.SyntaxKind.NamedImports) {
        const bindings = namedBindings;
        for (const element of bindings.elements) {
            const type = props.program.getTypeChecker().getTypeAtLocation(element);
            // TODO rewrite this using new project obj
            if (ts_utils_1.isEnumType(type)) {
                const { resPath, enumName } = exports.getImportResPathForEnum(type, props);
                imports.push({ importedName: enumName, resPath: resPath, type: "enum" });
            }
            else if (type.symbol?.name === "PackedScene") {
                const importedName = element.name.text;
                const className = importedName.slice(0, -"Tscn".length);
                const resPath = props.project
                    .godotScenes()
                    .find((scene) => scene.name === className)?.resPath;
                if (!resPath) {
                    continue;
                }
                imports.push({
                    importedName: importedName,
                    resPath: resPath,
                    type: "scene",
                });
            }
            else {
                const importedSourceFile = props.project
                    .sourceFiles()
                    .find((sf) => sf.fsPath === pathToImportedTs);
                if (!importedSourceFile) {
                    if (pathToImportedTs.includes("@")) {
                        continue;
                    }
                    props.addError({
                        error: errors_1.ErrorName.InvalidNumber,
                        location: node,
                        description: `Import ${pathToImportedTs} not found.`,
                    });
                    continue;
                }
                let typeString = props.program.getTypeChecker().typeToString(type);
                if (typeString.startsWith("typeof ")) {
                    typeString = typeString.slice("typeof ".length);
                }
                const usages = props.usages.get(element.name);
                let usedAsValue = false;
                // No import is necessary unless we actually use the identifier as a value. (Circular references
                // will crash Godot, so we try to avoid them.)
                for (const use of usages?.uses ?? []) {
                    if (use.domain & tsutils_1.UsageDomain.Value) {
                        usedAsValue = true;
                        break;
                    }
                }
                if (!importedSourceFile.isAutoload() && usedAsValue) {
                    imports.push({
                        importedName: typeString,
                        resPath: importedSourceFile.resPath,
                        type: "class",
                    });
                }
            }
        }
    }
    return parse_node_1.combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => imports
            .map(({ importedName, type, resPath }) => {
            if (type === "class") {
                return `var ${importedName} = load("${resPath}")`;
            }
            else if (type === "enum") {
                return `const ${importedName} = preload("${resPath}").${importedName}`;
            }
            else if (type === "scene") {
                return `const ${importedName} = preload("${resPath}")`;
            }
        })
            .join("\n"),
    });
};
exports.parseImportDeclaration = parseImportDeclaration;
//# sourceMappingURL=parse_import_declaration.js.map