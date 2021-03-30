"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAssetPathsType = void 0;
const project_1 = require("./project/project");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function buildAssetPathsType(project) {
    const assetFileContents = `
declare type AssetType = {
${project.assets
        .filter((obj) => obj.tsType() !== null)
        .map((obj) => `  '${obj.resPath}': ${obj.tsType()}`)
        .join(",\n")}
}

declare type AssetPath = keyof AssetType;
  `;
    const destPath = path_1.default.join(project_1.TsGdProjectClass.Paths.dynamicGodotDefsPath, "@asset_paths.d.ts");
    fs_1.default.writeFileSync(destPath, assetFileContents);
}
exports.buildAssetPathsType = buildAssetPathsType;
//# sourceMappingURL=build_asset_paths.js.map