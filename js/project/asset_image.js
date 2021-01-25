"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetImage = void 0;
const base_asset_1 = require("./base_asset");
const project_1 = require("./project");
class AssetImage extends base_asset_1.BaseAsset {
    constructor(path, project) {
        super();
        this.fsPath = path;
        this.resPath = project_1.TsGdProjectClass.FsPathToResPath(this.fsPath);
        this.project = project;
    }
    tsType() {
        return "StreamTexture";
    }
    static extensions() {
        return [".gif", ".png", ".jpg", ".bmp"];
    }
}
exports.AssetImage = AssetImage;
//# sourceMappingURL=asset_image.js.map