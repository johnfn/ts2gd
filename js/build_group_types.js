"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGroupTypes = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const project_1 = require("./project/project");
const buildGroupTypes = (project) => {
    const groupNameToTypes = {};
    for (const scene of project.godotScenes()) {
        for (const node of scene.nodes) {
            const script = node.getScript();
            if (!script) {
                continue;
            }
            const type = script.className();
            if (!type) {
                continue;
            }
            for (const group of node.groups) {
                groupNameToTypes[group] = [...(groupNameToTypes[group] ?? []), script];
            }
        }
    }
    let result = `declare type Groups = {`;
    for (const [group, commonTypes] of Object.entries(groupNameToTypes)) {
        result += `  '${group}': ${commonTypes
            .map((type) => type.tsType())
            .join(" | ")}\n`;
    }
    result += `}`;
    const destPath = path_1.default.join(project_1.TsGdProjectClass.Paths.dynamicGodotDefsPath, "@groups.d.ts");
    fs_1.default.writeFileSync(destPath, result);
};
exports.buildGroupTypes = buildGroupTypes;
//# sourceMappingURL=build_group_types.js.map