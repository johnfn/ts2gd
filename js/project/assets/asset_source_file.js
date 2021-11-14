"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetSourceFile = void 0;
const fs_1 = __importDefault(require("fs"));
const typescript_1 = __importStar(require("typescript"));
const path_1 = __importDefault(require("path"));
const base_asset_1 = require("./base_asset");
const parse_node_1 = require("../../parse_node");
const errors_1 = require("../../errors");
const scope_1 = require("../../scope");
const project_1 = require("../project");
const chalk_1 = __importDefault(require("chalk"));
const utils = __importStar(require("tsutils"));
// TODO: We currently allow for invalid states (e.g. className() is undefined)
// because we only create AssetSourceFiles on a chokidar 'add' operation (we
// dont make them on edit).
// Can we just create them on edit as well (if it doesn't exist but is valid)?
class AssetSourceFile extends base_asset_1.BaseAsset {
    constructor(sourceFilePath, project) {
        super();
        let gdPath = path_1.default.join(project_1.TsGdProjectClass.Paths.destGdPath, sourceFilePath.slice(project_1.TsGdProjectClass.Paths.sourceTsPath.length, -path_1.default.extname(sourceFilePath).length) + ".gd");
        this.resPath = project_1.TsGdProjectClass.FsPathToResPath(gdPath);
        this.gdPath = gdPath;
        this.gdContainingDirectory = gdPath.slice(0, gdPath.lastIndexOf("/") + 1);
        this.fsPath = sourceFilePath;
        this.tsRelativePath = sourceFilePath.slice(project_1.TsGdProjectClass.Paths.rootPath.length + 1);
        this.project = project;
        this._isAutoload = !!this.project.godotProject.autoloads.find((a) => a.resPath === this.resPath);
    }
    reload() { }
    getAst() {
        const ast = this.project.program.getProgram().getSourceFile(this.fsPath);
        if (!ast) {
            return {
                error: errors_1.ErrorName.PathNotFound,
                description: `
Referenced file ${this.fsPath} does not exist.
This is a ts2gd bug. Please create an issue on GitHub for it.`,
                location: this.fsPath,
            };
        }
        return ast;
    }
    getClassNode() {
        const ast = this.getAst();
        if ("error" in ast) {
            return ast;
        }
        const topLevelClasses = ast
            .getChildren()[0] // SyntaxList
            .getChildren()
            .filter((node) => node.kind === typescript_1.SyntaxKind.ClassDeclaration);
        if (topLevelClasses.length === 0) {
            return {
                error: errors_1.ErrorName.ClassNameNotFound,
                location: ast,
                description: "Every file must have a class.",
            };
        }
        if (topLevelClasses.length > 1) {
            return {
                error: errors_1.ErrorName.TooManyClassesFound,
                location: topLevelClasses[1],
                description: "Every file must have a class.",
            };
        }
        return topLevelClasses[0];
    }
    // This can be different than the Godot class name for autoload classes.
    exportedTsClassName() {
        const node = this.getClassNode();
        if ("error" in node) {
            return node;
        }
        const name = node?.name;
        if (!name) {
            return {
                error: errors_1.ErrorName.ClassCannotBeAnonymous,
                location: node ?? this.tsRelativePath,
                description: "This class cannot be anonymous",
            };
        }
        return name?.text ?? null;
    }
    extendedClassName() {
        const node = this.getClassNode();
        if (node === null || "error" in node) {
            return node;
        }
        if (node.heritageClauses) {
            // TODO: Ensure there's only one of each here
            const clause = node.heritageClauses[0];
            const type = clause.types[0];
            return type.getText();
        }
        return {
            error: errors_1.ErrorName.ClassDoesntExtendAnything,
            description: `The class in this file needs to extend another class: ${this.fsPath}

Hint: try ${chalk_1.default.blueBright(`export class ${node.name?.text ?? ""} extends Node {`)}
      `,
            location: node,
        };
    }
    getAutoloadNameFromExportedVariable() {
        const ast = this.getAst();
        if ("error" in ast) {
            return ast;
        }
        const topLevelDefinitions = ast.getChildren()[0]; // SyntaxList
        for (const d of topLevelDefinitions.getChildren()) {
            if (d.kind === typescript_1.SyntaxKind.VariableStatement) {
                const vs = d;
                const isExported = vs.modifiers?.find((mod) => mod.kind === typescript_1.SyntaxKind.ExportKeyword);
                if (isExported) {
                    return vs.declarationList.declarations[0].name.getText();
                }
            }
        }
        // TODO: Error could say the exact loc to write
        return {
            error: errors_1.ErrorName.CantFindAutoloadInstance,
            location: ast ?? this.tsRelativePath,
            description: `Can't find the autoload instance variable for this autoload class. All files with an autoload class must export an instance of that class. Here's an example:
        
@autoload
class MyAutoloadClass extends Node2D {
  public string hello = "hi"
}

${chalk_1.default.green("export const MyAutoload = new MyAutoloadClass()")} // This line is what you're missing!
`,
        };
    }
    isAutoload() {
        return this._isAutoload;
    }
    tsType() {
        const className = this.exportedTsClassName();
        if (className) {
            return `import('${this.fsPath.slice(0, -".ts".length)}').${className}`;
        }
        else {
            return null;
        }
    }
    isProjectAutoload() {
        return !!this.project.godotProject.autoloads.find((autoload) => autoload.resPath === this.resPath);
    }
    isDecoratedAutoload() {
        const classNode = this.getClassNode();
        if ("error" in classNode) {
            return classNode;
        }
        for (const dec of classNode.decorators ?? []) {
            if (dec.expression.getText() === "autoload") {
                return true;
            }
        }
        return false;
    }
    getAutoloadValidationErrors() {
        if (this.isProjectAutoload() && !this.isDecoratedAutoload()) {
            return {
                error: errors_1.ErrorName.AutoloadProjectButNotDecorated,
                description: `Godot thinks this is an AutoLoad, but it doesn't have an ${chalk_1.default.white("@autoload")} decorator. Either add the decorator or remove it from the Godot AutoLoad list.`,
                location: this.fsPath,
            };
        }
        if (!this.isProjectAutoload() && this.isDecoratedAutoload()) {
            return {
                error: errors_1.ErrorName.AutoloadProjectButNotDecorated,
                description: `This has an ${chalk_1.default.white("@autoload")} decorator, but Godot doesn't have it on the AutoLoad list. Either add it to the Godot AutoLoad list, or remove the decorator.`,
                location: this.fsPath,
            };
        }
        return null;
    }
    getEnumPath(enumName) {
        return this.gdPath.slice(0, -".gd".length) + "_" + enumName + ".gd";
    }
    static transformSourceFile(sourceFile) {
        const transformer = (context) => (rootNode) => {
            function visit(node) {
                if (node.kind === typescript_1.default.SyntaxKind.CallExpression) {
                    const call = node;
                    if (call.expression.kind === typescript_1.default.SyntaxKind.PropertyAccessExpression) {
                        const pae = call.expression;
                        // TODO: Could have null and non-null coalescing lib functions.
                        if (pae.name.text === "add" ||
                            pae.name.text === "sub" ||
                            pae.name.text === "mul" ||
                            pae.name.text === "div") {
                            return context.factory.createCallExpression(context.factory.createIdentifier(`${pae.name.text}_vec_lib`), [], [
                                typescript_1.default.visitNode(pae.expression, visit),
                                typescript_1.default.visitNode(call.arguments[0], visit),
                            ]);
                        }
                    }
                }
                return typescript_1.default.visitEachChild(node, visit, context);
            }
            return typescript_1.default.visitNode(rootNode, visit);
        };
        const transformResult = typescript_1.default.transform(sourceFile, [transformer], {});
        const transformedSourceFile = transformResult
            .transformed[0];
        // TODO: Error if >1 file results
        return transformedSourceFile;
    }
    async compile(watchProgram) {
        const oldAutoloadClassName = this.getAutoloadNameFromExportedVariable();
        let sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath);
        let tries = 0;
        while (!sourceFileAst && ++tries < 50) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath);
        }
        if (!sourceFileAst) {
            return {
                errors: [
                    {
                        description: `TS can't find source file ${this.fsPath} after waiting 1 second. Try saving your TypeScript file again.`,
                        error: errors_1.ErrorName.PathNotFound,
                        location: this.fsPath,
                    },
                ],
                result: null,
            };
        }
        // Since we use chokidar but TS uses something else to monitor files, sometimes
        // we can race ahead of the TS compiler. This is a hack to wait for them to
        // catch up with us.
        while (fs_1.default.readFileSync(this.fsPath, "utf-8") !== sourceFileAst.getFullText()) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath);
        }
        const transformedSourceFile = AssetSourceFile.transformSourceFile(sourceFileAst);
        const printer = typescript_1.default.createPrinter();
        const getNodeText = (node) => {
            return printer.printNode(typescript_1.default.EmitHint.Unspecified, node, transformedSourceFile);
        };
        const result = { result: null, errors: [] };
        const parsedNode = parse_node_1.parseNode(transformedSourceFile, {
            indent: "",
            isConstructor: false,
            scope: new scope_1.Scope(watchProgram.getProgram().getProgram()),
            project: this.project,
            mostRecentControlStructureIsSwitch: false,
            isAutoload: this.isProjectAutoload(),
            program: watchProgram.getProgram().getProgram(),
            // NOTE: We use thie OLD sourceFileAst because tsutils can't process our
            // new one after we used TS to transform it - it will crash if we do so.
            usages: utils.collectVariableUsage(sourceFileAst),
            addError: (newError) => result.errors.push(newError),
            sourceFile: sourceFileAst,
            getNodeText,
        });
        // TODO: Only do this once per program run max!
        fs_1.default.mkdirSync(path_1.default.dirname(this.gdPath), { recursive: true });
        fs_1.default.writeFileSync(this.gdPath, this.getFileHeader() + parsedNode.content);
        for (const { content, name } of parsedNode.enums ?? []) {
            fs_1.default.writeFileSync(this.getEnumPath(name), this.getFileHeader() + content);
        }
        const err = this.checkForAutoloadChanges();
        if (err !== null) {
            result.errors.push(err);
        }
        if (this.isAutoload()) {
            const error = this.validateAutoloadClass();
            if (error !== null) {
                result.errors.push(error);
            }
            const newAutoloadClassName = this.getAutoloadNameFromExportedVariable();
            if (typeof oldAutoloadClassName === "string" &&
                typeof newAutoloadClassName === "string") {
                // TODO: Somehow put this autoload logic elsewhere.
                // Check if they changed the name of the exported autoload variable.
                if (newAutoloadClassName !== oldAutoloadClassName) {
                    this.project.godotProject.removeAutoload(this.resPath);
                    this.project.godotProject.addAutoload(newAutoloadClassName, this.resPath);
                }
            }
        }
        return result;
    }
    getFileHeader() {
        return `# This file has been autogenerated by ts2gd. DO NOT EDIT!\n\n`;
    }
    validateAutoloadClass() {
        const classNode = this.getClassNode();
        if ("error" in classNode) {
            return classNode;
        }
        const result = this.getAutoloadNameFromExportedVariable();
        if (typeof result !== "string") {
            return {
                error: errors_1.ErrorName.AutoloadNotExported,
                description: `Be sure to export an instance of your autoload class, e.g.:

${chalk_1.default.white(`export const ${this.getGodotClassName()} = new ${this.exportedTsClassName()}()`)}        
        `,
                location: classNode ?? this.fsPath,
            };
        }
        return null;
    }
    getGodotClassName() {
        return this.fsPath.slice(this.fsPath.lastIndexOf("/") + 1, -".ts".length);
    }
    checkForAutoloadChanges() {
        let shouldBeAutoload;
        let prevAutoload = this.isAutoload();
        if (prevAutoload) {
            // Did we remove one?
            if (!this.isDecoratedAutoload() || !this.isProjectAutoload()) {
                shouldBeAutoload = false;
            }
            else {
                shouldBeAutoload = true;
            }
        }
        else {
            // Did we add one?
            if (this.isDecoratedAutoload() || this.isProjectAutoload()) {
                shouldBeAutoload = true;
            }
            else {
                shouldBeAutoload = false;
            }
        }
        if (!prevAutoload && shouldBeAutoload) {
            if (!this.isProjectAutoload()) {
                const autoloadClassName = this.getAutoloadNameFromExportedVariable();
                if (typeof autoloadClassName !== "string" &&
                    "error" in autoloadClassName) {
                    return autoloadClassName;
                }
                this.project.godotProject.addAutoload(autoloadClassName, this.resPath);
            }
            if (!this.isDecoratedAutoload()) {
                shouldBeAutoload = false;
                const classNode = this.getClassNode();
                return {
                    error: errors_1.ErrorName.AutoloadProjectButNotDecorated,
                    description: `Since this is an autoload class in Godot, you must put ${chalk_1.default.white("@autoload")} the line before the class declaration.`,
                    location: "error" in classNode ? this.fsPath : classNode,
                };
            }
        }
        if (prevAutoload && !shouldBeAutoload) {
            if (this.isProjectAutoload()) {
                this.project.godotProject.removeAutoload(this.resPath);
            }
            if (this.isDecoratedAutoload()) {
                shouldBeAutoload = true;
                const classNode = this.getClassNode();
                return {
                    error: errors_1.ErrorName.AutoloadDecoratedButNotProject,
                    description: `Since you removed this as an autoload class in Godot, you must remove ${chalk_1.default.white("@autoload")}.`,
                    location: "error" in classNode ? this.fsPath : classNode,
                };
            }
        }
        this._isAutoload = shouldBeAutoload;
        return null;
    }
    destroy() {
        // Delete the .gd file
        fs_1.default.rmSync(this.gdPath);
        // Delete the generated enum files
        const filesInDirectory = fs_1.default.readdirSync(this.gdContainingDirectory);
        const nameWithoutExtension = this.gdPath.slice(0, -".gd".length);
        for (const fileName of filesInDirectory) {
            const fullPath = this.gdContainingDirectory + fileName;
            if (fullPath.startsWith(nameWithoutExtension)) {
                fs_1.default.rmSync(fullPath);
            }
        }
        this.project.godotProject.removeAutoload(this.resPath);
    }
}
exports.AssetSourceFile = AssetSourceFile;
//# sourceMappingURL=asset_source_file.js.map