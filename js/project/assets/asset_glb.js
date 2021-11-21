"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetGlb = void 0;
const project_1 = require("../project");
const base_asset_1 = require("./base_asset");
class AssetGlb extends base_asset_1.BaseAsset {
    resPath;
    fsPath;
    project;
    constructor(path, project) {
        super();
        this.fsPath = path;
        this.resPath = project_1.TsGdProjectClass.FsPathToResPath(this.fsPath);
        this.project = project;
    }
    tsType() {
        return "Spatial";
    }
    static extensions() {
        return [".glb"];
    }
}
exports.AssetGlb = AssetGlb;
//# sourceMappingURL=asset_glb.js.map