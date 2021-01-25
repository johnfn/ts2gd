"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GodotProjectFile = void 0;
const godot_parser_1 = require("./godot_parser");
const project_1 = require("./project");
class GodotProjectFile {
    constructor(path, project) {
        this.rawConfig = godot_parser_1.parseGodotConfigFile(path, {
            autoload: [],
        });
        this.project = project;
        this.fsPath = path;
        this.autoloads = Object.values(this.rawConfig.autoload[0])
            .filter((x) => typeof x === "string")
            .map((x) => ({
            // For some reason, the respath strings start with *, e.g. "*res://compiled/Enemy.gd"
            resPath: x.slice(1),
        }));
        this.actionNames = Object.keys(this.rawConfig.input ?? {});
    }
    mainScene() {
        let mainSceneResPath = this.rawConfig.application?.["run/main_scene"];
        if (!mainSceneResPath) {
            // If they don't have one, just take the first one
            const allScenes = this.project.godotScenes();
            if (allScenes.length > 1) {
                console.warn("No main scene defined and more than one scene found! Choosing one arbitrarily.");
                console.warn("Please set a main scene in the Godot project settings.");
                console.warn("\n");
                console.warn("Scenes found:");
                console.warn(allScenes.map((s) => s.fsPath).join("\n"));
            }
            mainSceneResPath = allScenes[0].resPath;
        }
        return {
            resPath: mainSceneResPath,
            fsPath: project_1.TsGdProjectClass.ResPathToFsPath(mainSceneResPath),
        };
    }
}
exports.GodotProjectFile = GodotProjectFile;
//# sourceMappingURL=godot_project_file.js.map