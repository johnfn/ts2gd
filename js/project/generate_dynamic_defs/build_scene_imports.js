"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSceneImports = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const project_1 = require("../project");
const buildSceneImports = (project) => {
    let result = ``;
    for (const scene of project.godotScenes()) {
        result += `export const ${path_1.default.basename(scene.fsPath, ".tscn")}Tscn: PackedScene<${scene.tsType() ?? "Node"}>;\n`;
    }
    const destPath = path_1.default.join(project_1.TsGdProjectClass.Paths.dynamicGodotDefsPath, "@scenes.d.ts");
    fs_1.default.writeFileSync(destPath, result);
};
exports.buildSceneImports = buildSceneImports;
//# sourceMappingURL=build_scene_imports.js.map