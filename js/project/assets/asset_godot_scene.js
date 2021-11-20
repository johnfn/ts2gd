"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetGodotScene = exports.GodotNode = void 0;
const path_1 = __importDefault(require("path"));
const base_asset_1 = require("./base_asset");
const project_1 = require("../project");
const asset_source_file_1 = require("./asset_source_file");
const godot_parser_1 = require("../godot_parser");
class GodotNode {
    name;
    _type;
    isRoot;
    groups;
    parent;
    $section;
    scene;
    project;
    scriptExtResourceId;
    constructor(props, scene, project) {
        this.name = props.$section.name;
        this.project = project;
        this.scene = scene;
        this._type = props.$section.type;
        this.isRoot = props.$section.parent ? false : true;
        this.groups = props.$section.groups ?? [];
        this.$section = props.$section;
        this.parent = props.$section.parent ?? undefined;
        this.scriptExtResourceId = props.script?.args?.[0] ?? undefined;
    }
    /**
     * e.g. "Player" for a node on the root
     * e.g. "Player/Arm" for a nested node
     * e.g. "." for the root
     */
    scenePath() {
        if (!this.parent) {
            return ".";
        }
        if (this.parent === ".") {
            return this.name;
        }
        return this.parent + "/" + this.name;
    }
    children() {
        const path = this.scenePath();
        return this.scene.nodes.filter((node) => node.parent === path);
    }
    instance() {
        let instanceId = this.$section.instance?.args[0];
        if (!instanceId && instanceId !== 0) {
            return undefined;
        }
        const res = this.scene.resources.find((res) => res.id === instanceId);
        if (!res) {
            throw new Error(`Can't find associated scene for id ${instanceId} on ${this.scenePath()}`);
        }
        const matchingScene = this.project
            .godotScenes()
            .find((scene) => scene.fsPath === res?.fsPath);
        if (matchingScene) {
            return matchingScene;
        }
        const matchingGlb = this.project
            .godotGlbs()
            .find((glb) => glb.fsPath === res?.fsPath);
        if (matchingGlb) {
            return matchingGlb;
        }
        return undefined;
    }
    tsType() {
        if (this._type) {
            return this._type;
        }
        const instancedSceneType = this.instance()?.tsType();
        if (instancedSceneType) {
            return instancedSceneType;
        }
        throw new Error("I dont know the type of that thing.");
    }
    getScript() {
        let scriptId = this.scriptExtResourceId;
        let sceneContainingScript = this.scene;
        if (!scriptId) {
            // This is made complicated because instanced scenes do not have scripts
            // stored on them as external resources in the scene in which they are instanced,
            // but act as if the script on their root node is their script.
            let instance = this.instance();
            if (instance && instance instanceof AssetGodotScene) {
                scriptId = instance.rootNode.scriptExtResourceId;
                sceneContainingScript = instance;
            }
        }
        if (!scriptId || !sceneContainingScript) {
            return undefined;
        }
        const externalResource = sceneContainingScript.resources.find((obj) => obj.id === scriptId);
        if (!externalResource) {
            throw new Error(`expected to be able to find a resource with id ${scriptId} in script ${this.scene.fsPath}, but did not.`);
        }
        let res = this.scene.project.assets.find((sf) => sf instanceof asset_source_file_1.AssetSourceFile &&
            sf.resPath === externalResource?.resPath);
        return res;
    }
}
exports.GodotNode = GodotNode;
class AssetGodotScene extends base_asset_1.BaseAsset {
    /** e.g. /Users/johnfn/GodotProject/Scenes/my_scene.tscn */
    fsPath;
    /** e.g. res://Scenes/my_scene.tscn */
    resPath;
    nodes;
    resources;
    /** e.g. my_scene.tscn */
    name;
    rootNode;
    project;
    constructor(fsPath, project) {
        super();
        const sceneFile = godot_parser_1.parseGodotConfigFile(fsPath, {
            ext_resource: [],
            node: [],
        });
        this.fsPath = fsPath;
        this.project = project;
        this.resPath = project_1.TsGdProjectClass.FsPathToResPath(fsPath);
        this.resources = (sceneFile.ext_resource ?? []).map((resource) => {
            return {
                resPath: resource.$section.path,
                fsPath: project_1.TsGdProjectClass.ResPathToFsPath(resource.$section.path),
                id: resource.$section.id,
            };
        });
        this.nodes = (sceneFile.node ?? []).map((node) => new GodotNode(node, this, this.project));
        this.name = path_1.default.basename(fsPath, ".tscn");
        this.rootNode = this.nodes.find((node) => !node.parent);
    }
    /** e.g. import('/Users/johnfn/GodotGame/scripts/Enemy').Enemy */
    tsType() {
        const rootScript = this.rootNode.getScript();
        if (rootScript) {
            const rootSourceFile = this.project
                .sourceFiles()
                .find((sf) => sf.resPath === rootScript.resPath);
            if (!rootSourceFile) {
                throw new Error(`Failed to find root source file for ${rootScript.fsPath}`);
            }
            const className = rootSourceFile.exportedTsClassName();
            if (!className) {
                return null;
            }
            return `import('${rootSourceFile.fsPath.slice(0, -".ts".length)}').${rootSourceFile.exportedTsClassName()}`;
        }
        else {
            return `${this.rootNode.tsType()}`;
        }
    }
    static extensions() {
        return [".tscn"];
    }
}
exports.AssetGodotScene = AssetGodotScene;
//# sourceMappingURL=asset_godot_scene.js.map