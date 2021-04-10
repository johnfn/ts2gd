"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GodotProjectFile = void 0;
const godot_parser_1 = require("./godot_parser");
const project_1 = require("./project");
const fs_1 = __importDefault(require("fs"));
class GodotProjectFile {
    constructor(path, project) {
        this.rawConfig = godot_parser_1.parseGodotConfigFile(path, {
            autoload: [],
        });
        this.project = project;
        this.fsPath = path;
        this.autoloads = Object.values(this.rawConfig.autoload[0] ?? {})
            .filter((x) => typeof x === "string")
            .map((x) => ({
            // For some reason, the respath strings start with *, e.g. "*res://compiled/Enemy.gd"
            resPath: x.slice(1),
        }));
        this.actionNames = Object.keys(this.rawConfig.input ?? {});
    }
    addAutoload(className, resPath) {
        this.project.godotProject.autoloads = [
            ...this.project.godotProject.autoloads,
            { resPath: resPath },
        ];
        const lines = fs_1.default.readFileSync(this.fsPath, "utf-8").split("\n");
        const index = lines.indexOf("[autoload]");
        const autoloadLine = `${className}="*${resPath}"`;
        if (index > 0) {
            lines.splice(index + 2, 0, autoloadLine);
        }
        else {
            lines.push(`[autoload]\n\n${autoloadLine}`);
        }
        fs_1.default.writeFileSync(this.fsPath, lines.join("\n"));
    }
    removeAutoload(className, resPath) {
        this.project.godotProject.autoloads = this.project.godotProject.autoloads.filter((a) => a.resPath !== resPath);
        let lines = fs_1.default.readFileSync(this.fsPath, "utf-8").split("\n");
        const autoloadLine = `${className}="*${resPath}"`;
        lines = lines.filter((l) => l.trim() !== autoloadLine);
        fs_1.default.writeFileSync(this.fsPath, lines.join("\n"));
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