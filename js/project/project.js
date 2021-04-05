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
const asset_godot_class_1 = require("./asset_godot_class");
const asset_godot_scene_1 = require("./asset_godot_scene");
const asset_font_1 = require("./asset_font");
const asset_source_file_1 = require("./asset_source_file");
const godot_project_file_1 = require("./godot_project_file");
const base_asset_1 = require("./base_asset");
const build_paths_for_node_1 = require("../build_paths_for_node");
const build_scene_imports_1 = require("../build_scene_imports");
const build_asset_paths_1 = require("../build_asset_paths");
const build_group_types_1 = require("../build_group_types");
const build_action_names_1 = require("../build_action_names");
const asset_image_1 = require("./asset_image");
const asset_glb_1 = require("./asset_glb");
const generate_library_1 = require("../generators/generate_library");
// TODO: Instead of manually scanning to find all assets, i could just import
// all godot files, and then parse them for all their asset types. It would
// probably be easier to find the tscn and tres files.
class TsGdProjectClass {
    constructor(watcher, initialFilePaths, program, ts2gdJson) {
        // Initial set up
        /** Master list of all Godot assets */
        this.assets = [];
        TsGdProjectClass.Paths = ts2gdJson;
        this.program = program;
        // Parse assets
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
    /** Info about each source file. */
    sourceFiles() {
        return this.assets.filter((a) => a instanceof asset_source_file_1.AssetSourceFile);
    }
    /** Info about each Godot class. */
    godotClasses() {
        return this.assets.filter((a) => a instanceof asset_godot_class_1.AssetGodotClass);
    }
    /** Info about each Godot scene. */
    godotScenes() {
        return this.assets.filter((a) => a instanceof asset_godot_scene_1.AssetGodotScene);
    }
    /** Info about each Godot font. */
    godotFonts() {
        return this.assets.filter((a) => a instanceof asset_font_1.AssetFont);
    }
    /** Info about each .glb file. */
    godotGlbs() {
        return this.assets.filter((a) => a instanceof asset_glb_1.AssetGlb);
    }
    /** Info about each Godot image. */
    godotImages() {
        return this.assets.filter((a) => a instanceof asset_image_1.AssetImage);
    }
    createAsset(path) {
        if (path.endsWith(".ts")) {
            return new asset_source_file_1.AssetSourceFile(path, this);
        }
        else if (path.endsWith(".gd")) {
            return new asset_godot_class_1.AssetGodotClass(path, this);
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
            .on("add", (path) => this.onAddAsset(path))
            .on("change", (path) => this.onChangeAsset(path))
            .on("unlink", (path) => this.onRemoveAsset(path));
    }
    onAddAsset(path) {
        const newAsset = this.createAsset(path);
        if (newAsset instanceof asset_source_file_1.AssetSourceFile) {
            newAsset.compile(this.program);
        }
        else if (newAsset instanceof asset_godot_scene_1.AssetGodotScene) {
            build_scene_imports_1.buildSceneImports(this);
            build_group_types_1.buildGroupTypes(this);
        }
        build_asset_paths_1.buildAssetPathsType(this);
        if (newAsset instanceof base_asset_1.BaseAsset) {
            this.assets.push(newAsset);
        }
    }
    onChangeAsset(path) {
        let start = new Date().getTime();
        let showTime = false;
        // Just noisy, since it's not caused by a user action
        if (!path.endsWith(".gd") && !path.endsWith(".d.ts")) {
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
            this.godotProject = new godot_project_file_1.GodotProjectFile(path, this);
            console.log(this.godotProject.autoloads);
            return;
        }
        let oldAsset = this.assets.find((asset) => asset.fsPath === path);
        if (oldAsset) {
            let newAsset = this.createAsset(path);
            this.assets = this.assets.filter((a) => a.fsPath !== path);
            this.assets.push(newAsset);
            if (newAsset instanceof asset_source_file_1.AssetSourceFile) {
                newAsset.compile(this.program);
                build_asset_paths_1.buildAssetPathsType(this);
                build_paths_for_node_1.buildNodePathsTypeForScript(newAsset, this);
            }
            else if (newAsset instanceof asset_godot_scene_1.AssetGodotScene) {
                for (const script of this.sourceFiles()) {
                    build_paths_for_node_1.buildNodePathsTypeForScript(script, this);
                }
                build_scene_imports_1.buildSceneImports(this);
            }
        }
        if (showTime) {
            console.info();
            console.info("Done in", (new Date().getTime() - start) / 1000 + "s");
        }
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
    }
    compileAllSourceFiles() {
        for (const asset of this.assets) {
            if (asset instanceof asset_source_file_1.AssetSourceFile) {
                asset.compile(this.program);
            }
        }
    }
    shouldBuildDefinitions(flags) {
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
    async buildAllDefinitions() {
        await generate_library_1.generateGodotLibraryDefinitions();
        build_asset_paths_1.buildAssetPathsType(this);
        for (const script of this.sourceFiles()) {
            build_paths_for_node_1.buildNodePathsTypeForScript(script, this);
        }
        build_scene_imports_1.buildSceneImports(this);
        build_group_types_1.buildGroupTypes(this);
        build_action_names_1.buildActionNames(this);
    }
    static ResPathToFsPath(resPath) {
        return path_1.default.join(TsGdProjectClass.Paths.rootPath, resPath.slice("res://".length));
    }
    static FsPathToResPath(fsPath) {
        return "res://" + fsPath.slice(TsGdProjectClass.Paths.rootPath.length + 1);
    }
}
exports.TsGdProjectClass = TsGdProjectClass;
const makeTsGdProject = async (ts2gdJson, program) => {
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
    return new TsGdProjectClass(watcher, initialFiles, program, ts2gdJson);
};
exports.makeTsGdProject = makeTsGdProject;
const shouldIncludePath = (path) => {
    if (path.includes("node_modules")) {
        return false;
    }
    if (!path.includes(".")) {
        // Folder (i hope)
        // TODO: Might be able to check stat to be more sure about this
        return true;
    }
    if (path.includes("godot_defs")) {
        return false;
    }
    if (path.includes(".git")) {
        return false;
    }
    if (asset_font_1.AssetFont.extensions().some((ext) => path.endsWith(ext))) {
        return true;
    }
    if (asset_image_1.AssetImage.extensions().some((ext) => path.endsWith(ext))) {
        return true;
    }
    if (path.endsWith(".gd")) {
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