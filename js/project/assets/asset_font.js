"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetFont = void 0;
const base_asset_1 = require("./base_asset");
const project_1 = require("../project");
class AssetFont extends base_asset_1.BaseAsset {
    constructor(path, project) {
        super();
        this.fsPath = path;
        this.resPath = project_1.TsGdProjectClass.FsPathToResPath(this.fsPath);
        this.project = project;
    }
    static extensions() {
        return [".ttf"];
    }
    tsType() {
        return "DynamicFontData";
    }
}
exports.AssetFont = AssetFont;
//# sourceMappingURL=asset_font.js.map