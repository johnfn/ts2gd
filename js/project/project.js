"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTsGdProject = exports.TsGdProjectClass = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const godot_project_file_1 = require("./godot_project_file");
const generate_library_1 = require("../generate_library_defs/generate_library");
const build_action_names_1 = require("./generate_dynamic_defs/build_action_names");
const build_asset_paths_1 = require("./generate_dynamic_defs/build_asset_paths");
const build_group_types_1 = require("./generate_dynamic_defs/build_group_types");
const build_node_paths_1 = require("./generate_dynamic_defs/build_node_paths");
const build_scene_imports_1 = require("./generate_dynamic_defs/build_scene_imports");
const asset_font_1 = require("./assets/asset_font");
const asset_glb_1 = require("./assets/asset_glb");
const asset_godot_scene_1 = require("./assets/asset_godot_scene");
const asset_image_1 = require("./assets/asset_image");
const asset_source_file_1 = require("./assets/asset_source_file");
const base_asset_1 = require("./assets/base_asset");
const errors_1 = require("../errors");
const ts_utils_1 = require("../ts_utils");
// TODO: Instead of manually scanning to find all assets, i could just import
// all godot files, and then parse them for all their asset types. It would
// probably be easier to find the tscn and tres files.
class TsGdProjectClass {
    constructor(watcher, initialFilePaths, program, ts2gdJson, args) {
        // Initial set up
        /** Master list of all Godot assets */
        this.assets = [];
        this.args = args;
        TsGdProjectClass.Paths = ts2gdJson;
        this.program = program;
        // Parse assets
        const projectGodot = initialFilePaths.filter((path) => path.includes("project.godot"))[0];
        this.godotProject = this.createAsset(projectGodot);
        const initialAssets = initialFilePaths.map((path) => this.createAsset(path));
        for (const asset of initialAssets) {
            if (asset === null) {
                continue;
            }
            if (asset instanceof base_asset_1.BaseAsset) {
                this.assets.push(asset);
            }
            if (asset instanceof godot_project_file_1.GodotProjectFile) {
                this.godotProject = asset;
            }
        }
        this.mainScene = this.godotScenes().find((scene) => scene.resPath === this.godotProject.mainScene().resPath);
        this.monitor(watcher);
    }
    /** Each source file. */
    sourceFiles() {
        return this.assets.filter((a) => a instanceof asset_source_file_1.AssetSourceFile);
    }
    /** Each Godot scene. */
    godotScenes() {
        return this.assets.filter((a) => a instanceof asset_godot_scene_1.AssetGodotScene);
    }
    /** Each Godot font. */
    godotFonts() {
        return this.assets.filter((a) => a instanceof asset_font_1.AssetFont);
    }
    /** Each .glb file. */
    godotGlbs() {
        return this.assets.filter((a) => a instanceof asset_glb_1.AssetGlb);
    }
    /** Each Godot image. */
    godotImages() {
        return this.assets.filter((a) => a instanceof asset_image_1.AssetImage);
    }
    createAsset(path) {
        if (path.endsWith(".ts")) {
            return new asset_source_file_1.AssetSourceFile(path, this);
        }
        else if (path.endsWith(".tscn")) {
            return new asset_godot_scene_1.AssetGodotScene(path, this);
        }
        else if (path.endsWith(".godot")) {
            return new godot_project_file_1.GodotProjectFile(path, this);
        }
        else if (path.endsWith(".ttf")) {
            return new asset_font_1.AssetFont(path, this);
        }
        else if (path.endsWith(".glb")) {
            return new asset_glb_1.AssetGlb(path, this);
        }
        else if (path.endsWith(".png") ||
            path.endsWith(".gif") ||
            path.endsWith(".bmp") ||
            path.endsWith(".jpg")) {
            return new asset_image_1.AssetImage(path, this);
        }
        console.log(`unhandled asset type ${path}`);
        return null;
    }
    monitor(watcher) {
        watcher
            .on("add", async (path) => {
            const result = await this.onAddAsset(path);
            errors_1.displayErrors(result.errors ?? []);
        })
            .on("change", async (path) => {
            const result = await this.onChangeAsset(path);
            errors_1.displayErrors(result.errors ?? []);
        })
            .on("unlink", (path) => this.onRemoveAsset(path));
    }
    async onAddAsset(path) {
        let result = { result: null };
        const newAsset = this.createAsset(path);
        // Do this first because some assets expect themselves to exist - e.g.
        // an enum inside a source file expects that source file to exist.
        if (newAsset instanceof base_asset_1.BaseAsset) {
            console.log("add", newAsset);
            this.assets.push(newAsset);
        }
        if (newAsset instanceof asset_source_file_1.AssetSourceFile) {
            result = await newAsset.compile(this.program);
        }
        else if (newAsset instanceof asset_godot_scene_1.AssetGodotScene) {
            build_scene_imports_1.buildSceneImports(this);
            build_group_types_1.buildGroupTypes(this);
        }
        build_asset_paths_1.buildAssetPathsType(this);
        return result;
    }
    async onChangeAsset(path) {
        let start = new Date().getTime();
        let showTime = false;
        let result = {
            result: null,
            errors: [],
        };
        // Just noisy, since it's not caused by a user action
        if (!path.endsWith(".d.ts")) {
            if (!this.args.debug)
                console.clear();
            if (path.endsWith(".ts")) {
                console.info("Compile:", chalk_1.default.blueBright(path));
                showTime = true;
            }
            else {
                console.info("Change:", chalk_1.default.blueBright(path));
            }
        }
        if (path.endsWith(".godot")) {
            const oldProjectFile = this.godotProject;
            this.godotProject = new godot_project_file_1.GodotProjectFile(path, this);
            const oldAutoloads = oldProjectFile.autoloads;
            const newAutoloads = this.godotProject.autoloads;
            const allAutoloads = [...oldAutoloads, ...newAutoloads];
            for (const { resPath } of allAutoloads) {
                const script = this.sourceFiles().find((sf) => sf.resPath === resPath);
                if (script) {
                    const compileResult = await script.compile(this.program);
                    result.errors = [...result.errors, ...(compileResult.errors ?? [])];
                }
            }
            return result;
        }
        let oldAsset = this.assets.find((asset) => asset.fsPath === path);
        if (oldAsset) {
            let newAsset = this.createAsset(path);
            this.assets = this.assets.filter((a) => a.fsPath !== path);
            this.assets.push(newAsset);
            if (newAsset instanceof asset_source_file_1.AssetSourceFile) {
                const compileResult = await newAsset.compile(this.program);
                result.errors = [...result.errors, ...(compileResult.errors ?? [])];
                build_asset_paths_1.buildAssetPathsType(this);
                build_node_paths_1.buildNodePathsTypeForScript(newAsset, this);
            }
            else if (newAsset instanceof asset_godot_scene_1.AssetGodotScene) {
                for (const script of this.sourceFiles()) {
                    build_node_paths_1.buildNodePathsTypeForScript(script, this);
                }
                build_scene_imports_1.buildSceneImports(this);
            }
        }
        if (showTime) {
            const time = (new Date().getTime() - start) / 1000;
            console.info();
            console.info(`${chalk_1.default.gray(ts_utils_1.getTimestamp())} Done in ${time}s`);
        }
        return result;
    }
    onRemoveAsset(path) {
        console.info("Delete:\t", path);
        const changedAsset = this.assets.find((asset) => asset.fsPath === path);
        if (!changedAsset) {
            return;
        }
        if (changedAsset instanceof asset_source_file_1.AssetSourceFile) {
            changedAsset.destroy();
        }
        this.assets = this.assets.filter((asset) => asset !== changedAsset);
    }
    async compileAllSourceFiles() {
        const assetsToCompile = this.assets.filter((a) => a instanceof asset_source_file_1.AssetSourceFile);
        const result = await Promise.all(assetsToCompile.map((asset) => asset.compile(this.program)));
        const errors = result.flatMap((compiledSourceFile) => compiledSourceFile.errors ?? []);
        if (errors.length === 0) {
            console.log("No errors in project.");
        }
        else {
            errors_1.displayErrors(errors);
        }
    }
    shouldBuildLibraryDefinitions(flags) {
        console.log(flags);
        if (flags.buildLibraries) {
            return true;
        }
        if (!fs_1.default.existsSync(TsGdProjectClass.Paths.staticGodotDefsPath)) {
            return true;
        }
        if (!fs_1.default.existsSync(TsGdProjectClass.Paths.dynamicGodotDefsPath)) {
            return true;
        }
        return false;
    }
    async buildDynamicDefinitions() {
        build_asset_paths_1.buildAssetPathsType(this);
        for (const script of this.sourceFiles()) {
            build_node_paths_1.buildNodePathsTypeForScript(script, this);
        }
        build_scene_imports_1.buildSceneImports(this);
        build_group_types_1.buildGroupTypes(this);
        build_action_names_1.buildActionNames(this);
    }
    async buildLibraryDefinitions() {
        await generate_library_1.generateGodotLibraryDefinitions();
    }
    static ResPathToFsPath(resPath) {
        return path_1.default.join(TsGdProjectClass.Paths.rootPath, resPath.slice("res://".length));
    }
    static FsPathToResPath(fsPath) {
        return "res://" + fsPath.slice(TsGdProjectClass.Paths.rootPath.length + 1);
    }
    /**
     * Returns any errors encountered while validating autoload classes
     */
    validateAutoloads() {
        return this.sourceFiles()
            .map((sf) => sf.getAutoloadValidationErrors())
            .filter((f) => f !== null);
    }
}
exports.TsGdProjectClass = TsGdProjectClass;
const makeTsGdProject = async (ts2gdJson, program, args) => {
    const initialFiles = [];
    let addFn;
    let readyFn;
    const watcher = await new Promise((resolve) => {
        addFn = (path) => initialFiles.push(path);
        readyFn = () => resolve(watcher);
        const watcher = chokidar_1.default
            .watch(ts2gdJson.rootPath, {
            ignored: (path, stats) => {
                return !shouldIncludePath(path);
            },
        })
            .on("add", addFn)
            .on("ready", readyFn);
    });
    watcher.off("add", addFn);
    watcher.off("ready", readyFn);
    return new TsGdProjectClass(watcher, initialFiles, program, ts2gdJson, args);
};
exports.makeTsGdProject = makeTsGdProject;
const shouldIncludePath = (path) => {
    if (path.includes("node_modules")) {
        return false;
    }
    if (path.includes(".git")) {
        return false;
    }
    if (path.endsWith(".gd")) {
        return false;
    }
    if (!path.includes(".")) {
        // Folder (I hope)
        // TODO: Might be able to check stat to be more sure about this
        return true;
    }
    if (path.includes("_godot_defs")) {
        return false;
    }
    if (asset_font_1.AssetFont.extensions().some((ext) => path.endsWith(ext))) {
        return true;
    }
    if (asset_image_1.AssetImage.extensions().some((ext) => path.endsWith(ext))) {
        return true;
    }
    // Note ordering (re: .ts)
    if (path.endsWith(".d.ts")) {
        return false;
    }
    if (path.endsWith(".ts")) {
        return true;
    }
    if (asset_godot_scene_1.AssetGodotScene.extensions().some((ext) => path.endsWith(ext))) {
        return true;
    }
    if (asset_glb_1.AssetGlb.extensions().some((ext) => path.endsWith(ext))) {
        return true;
    }
    if (path.endsWith(".godot")) {
        return true;
    }
    return false;
};
//# sourceMappingURL=project.js.map