"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildActionNames = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const project_1 = require("./project/project");
const buildActionNames = (project) => {
    let result = `declare type Action = ${project.godotProject.actionNames
        .filter((name) => name !== "$section")
        .map((name) => `'${name}'`)
        .join(" | ")}`;
    const destPath = path_1.default.join(project_1.TsGdProjectClass.Paths.godotDefsPath, "@actions.d.ts");
    fs_1.default.writeFileSync(destPath, result);
};
exports.buildActionNames = buildActionNames;
//# sourceMappingURL=build_action_names.js.map