"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetSourceFile = void 0;
const fs_1 = __importDefault(require("fs"));
const typescript_1 = require("typescript");
const path_1 = __importDefault(require("path"));
const base_asset_1 = require("./base_asset");
const parse_node_1 = require("../../parse_node");
const scope_1 = require("../../scope");
const ts_utils_1 = require("../../ts_utils");
const project_1 = require("../project");
// TODO: We currently allow for invalid states (e.g. className() is undefined)
// because we only create AssetSourceFiles on a chokidar 'add' operation (we
// dont make them on edit).
// Can we just create them on edit as well (if it doesn't exist but is valid)?
class AssetSourceFile extends base_asset_1.BaseAsset {
    constructor(sourceFilePath, project) {
        super();
        // TODO: Fix up test.ts
        // DONT USE THIS!
        this._lastCompilationResult = undefined;
        let gdPath = path_1.default.join(project_1.TsGdProjectClass.Paths.destGdPath, sourceFilePath.slice(project_1.TsGdProjectClass.Paths.sourceTsPath.length, -path_1.default.extname(sourceFilePath).length) + ".gd");
        this.resPath = project_1.TsGdProjectClass.FsPathToResPath(gdPath);
        this.gdPath = gdPath;
        this.gdContainingDirectory = gdPath.slice(0, gdPath.lastIndexOf("/") + 1);
        this.fsPath = sourceFilePath;
        this.tsRelativePath = sourceFilePath.slice(project_1.TsGdProjectClass.Paths.rootPath.length + 1);
        this.project = project;
    }
    reload() { }
    className() {
        let ast = this.project.program.getProgram().getSourceFile(this.fsPath);
        if (!ast) {
            console.error(`Referenced file ${this.fsPath} does not exist.`);
            console.error(`This is a ts2gd bug. Please create an issue on GitHub for it.`);
            return null;
        }
        const topLevelClasses = ast
            .getChildren()[0] // SyntaxList
            .getChildren()
            .filter((node) => node.kind === typescript_1.SyntaxKind.ClassDeclaration);
        if (topLevelClasses.length > 1) {
            ts_utils_1.logErrorAtNode(topLevelClasses[1], "You can't declare more than one class per file.");
        }
        if (topLevelClasses.length === 0) {
            ts_utils_1.logErrorAtNode(ast, "Every file must have a class.");
            return null;
        }
        const name = topLevelClasses[0].name;
        if (!name) {
            ts_utils_1.logErrorAtNode(topLevelClasses[0], "This class cannot be anonymous.");
        }
        return name?.text ?? null;
    }
    tsType() {
        const className = this.className();
        if (className) {
            return `import('${this.fsPath.slice(0, -".ts".length)}').${className}`;
        }
        else {
            return null;
        }
    }
    isAutoload() {
        return !!this.project.godotProject.autoloads.find((autoload) => autoload.resPath === this.resPath);
    }
    getEnumPath(enumName) {
        return this.gdPath.slice(0, -".gd".length) + "_" + enumName + ".gd";
    }
    async compile(watchProgram) {
        let sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath);
        let tries = 0;
        while (!sourceFileAst && ++tries < 10) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath);
        }
        if (!sourceFileAst) {
            console.error(`TS can't find source file ${this.fsPath} - this is almost certainly a bug with ts2gd.`);
            process.exit();
        }
        // Since we use chokidar but TS uses something else to monitor files, sometimes
        // we can race ahead of the TS compiler. This is a hack to wait for them to
        // catch up with us.
        while (fs_1.default.readFileSync(this.fsPath, "utf-8") !== sourceFileAst.getFullText()) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath);
        }
        let id = 0;
        const genUniqueName = () => `func${++id}`;
        const result = parse_node_1.parseNode(sourceFileAst, {
            indent: "",
            isConstructor: false,
            genUniqueName,
            scope: new scope_1.Scope(watchProgram.getProgram().getProgram()),
            project: this.project,
            mostRecentControlStructureIsSwitch: false,
            isAutoload: this.isAutoload(),
            program: watchProgram.getProgram().getProgram(),
            usages: new Map(),
        });
        this._lastCompilationResult = result;
        // TODO: Only do this once per program run max!
        fs_1.default.mkdirSync(path_1.default.dirname(this.gdPath), { recursive: true });
        fs_1.default.writeFileSync(this.gdPath, result.content);
        for (const { content, name } of result.enums ?? []) {
            fs_1.default.writeFileSync(this.getEnumPath(name), content);
        }
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
    }
}
exports.AssetSourceFile = AssetSourceFile;
//# sourceMappingURL=asset_source_file.js.map