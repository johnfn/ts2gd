"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAssetPathsType = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const asset_godot_scene_1 = require("../assets/asset_godot_scene");
const asset_source_file_1 = require("../assets/asset_source_file");
const project_1 = require("../project");
function buildAssetPathsType(project) {
    const assetFileContents = `
declare type AssetType = {
${project.assets
        .filter((obj) => obj.tsType() !== null)
        .map((obj) => {
        if (obj instanceof asset_source_file_1.AssetSourceFile || obj instanceof asset_godot_scene_1.AssetGodotScene) {
            return `  '${obj.resPath}': PackedScene<${obj.tsType()}>`;
        }
        return `  '${obj.resPath}': ${obj.tsType()}`;
    })
        .join(",\n")}
}

declare type SceneName =
${project.assets
        .filter((obj) => obj instanceof asset_godot_scene_1.AssetGodotScene)
        .map((obj) => `  | '${obj.resPath}'`)
        .join("\n")}

declare type AssetPath = keyof AssetType;
  `;
    const destPath = path_1.default.join(project_1.TsGdProjectClass.Paths.dynamicGodotDefsPath, "@asset_paths.d.ts");
    fs_1.default.writeFileSync(destPath, assetFileContents);
}
exports.buildAssetPathsType = buildAssetPathsType;
//# sourceMappingURL=build_asset_paths.js.map