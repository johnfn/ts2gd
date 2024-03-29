"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetGodotClass = void 0;
const project_1 = require("../project");
const base_asset_1 = require("./base_asset");
// TODO - I don't think this is needed. You should be able to derive it strictly from
// TS files
class AssetGodotClass extends base_asset_1.BaseAsset {
    constructor(path, project) {
        super();
        this.fsPath = path;
        this.resPath = project_1.TsGdProjectClass.FsPathToResPath(this.fsPath);
        this.project = project;
        this.isEnum = false;
        if (this.fsPath.endsWith("_enum.gd")) {
            this.isEnum = true;
        }
    }
    sourceFile() {
        const result = this.project
            .sourceFiles()
            .find((file) => file.resPath === this.resPath);
        if (!result) {
            return null;
        }
        return result;
    }
    tsType() {
        const sourceFile = this.sourceFile();
        if (!sourceFile) {
            return null;
        }
        const className = sourceFile.exportedTsClassName();
        if (!className) {
            return null;
        }
        return `import('${sourceFile.fsPath.slice(0, -".ts".length)}').${sourceFile.exportedTsClassName()}`;
    }
    static extensions() {
        return [".gd"];
    }
}
exports.AssetGodotClass = AssetGodotClass;
//# sourceMappingURL=asset_godot_class.js.map