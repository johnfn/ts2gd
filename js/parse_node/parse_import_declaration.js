"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImportDeclaration = exports.getImportResPathForEnum = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
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
    const symbol = node.getSymbol();
    if (!symbol) {
        throw new Error("Can't find symbol for node.");
    }
    const declarations = symbol.declarations;
    if (declarations.length === 0 || declarations.length > 1) {
        throw new Error(`Invalid length for declarations: ${declarations.length}`);
    }
    const decl = declarations[0];
    const sourceFile = decl.getSourceFile();
    const importedSourceFile = props.project
        .sourceFiles()
        .find((sf) => sf.fsPath === sourceFile.fileName);
    if (!importedSourceFile) {
        console.log("All source files:\n", props.project.sourceFiles().map((f) => f.fsPath + "\n"));
        throw new Error(`Can't find associated sourcefile for ${sourceFile.fileName}`);
    }
    let enumTypeString = props.program.getTypeChecker().typeToString(node);
    if (enumTypeString.startsWith("typeof ")) {
        enumTypeString = enumTypeString.slice("typeof ".length);
    }
    const pathWithoutEnum = importedSourceFile.resPath;
    const importPath = pathWithoutEnum.slice(0, -".gd".length) + "_" + enumTypeString + ".gd";
    return {
        resPath: importPath,
        sourceFile,
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
                const importedName = bindings.elements[0].name.text;
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
                    throw new Error(`Error! ${pathToImportedTs} import not found.
  in ${node.getSourceFile().fileName}`);
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
        content: () => imports
            .map(({ importedName, type, resPath }) => {
            if (type === "class") {
                return `const ${importedName} = preload("${resPath}")`;
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