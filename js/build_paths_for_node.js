"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNodePathsTypeForScript = exports.getAllRelativePaths = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const project_1 = require("./project/project");
const getAllRelativePaths = (node, prefix = "") => {
    let myPath = (prefix ? prefix + "/" : "") + node.name;
    let result = [{ path: myPath, node }];
    for (const child of node.children()) {
        result = [...result, ...exports.getAllRelativePaths(child, myPath)];
    }
    return result;
};
exports.getAllRelativePaths = getAllRelativePaths;
const buildNodePathsTypeForScript = (script, project) => {
    // Find all instances of this script in all scenes.
    const nodesWithScript = [];
    for (const scene of project.godotScenes()) {
        for (const node of scene.nodes) {
            const nodeScript = node.getScript();
            if (nodeScript &&
                nodeScript.resPath === script.resPath &&
                // Skip instances. Their children are not stored in their scene.
                !node.instance()) {
                nodesWithScript.push(node);
            }
        }
    }
    // For every potential relative path, validate that it can be found
    // in each instantiated node.
    const className = script.className();
    if (!className) {
        return [];
    }
    let commonRelativePaths = [];
    if (nodesWithScript.length === 0) {
        if (script.isAutoload()) {
            // Special logic for autoload classes.
            // TODO: Should we generate /root/ in the node path too?
            const rootScene = project.mainScene;
            commonRelativePaths = exports.getAllRelativePaths(rootScene.rootNode);
            commonRelativePaths = commonRelativePaths.map(({ path, node }) => ({
                path: `/root/${path}`,
                node,
            }));
        }
        else {
            // This class is never instantiated as a node.
            commonRelativePaths = [];
            // TODO: Maybe flag it if it's also never used as a class.
            // Currently, this is just noise.
            // console.error("Unused class:", className)
        }
    }
    else {
        const relativePathsPerNode = nodesWithScript.map((i) => i.children().flatMap((ch) => exports.getAllRelativePaths(ch)));
        commonRelativePaths = relativePathsPerNode[0].filter((elem) => relativePathsPerNode.every((pathsList) => pathsList.map((pl) => pl.path).includes(elem.path)));
    }
    // Normal case
    const pathToImport = {};
    for (const { path, node } of commonRelativePaths) {
        const script = node.getScript();
        if (script) {
            pathToImport[path] = `import("${script.fsPath.slice(0, -".ts".length)}").${script.className()}`;
        }
        else {
            pathToImport[path] = node.tsType();
        }
    }
    let result = `declare type NodePathToType${className} = {
${Object.entries(pathToImport)
        .map(([path, importStr]) => `  "${path}": ${importStr},`)
        .join("\n")}
}    
`;
    result += `
  
import ${className} from './../${project_1.TsGdProjectClass.Paths.sourceTsPath}/${path_1.default.basename(script.fsPath).slice(0, -".ts".length)}'

declare module './../${script.tsRelativePath.slice(0, -".ts".length)}' {
  interface ${className} {
    get_node<T extends keyof NodePathToType${className}>(path: T): NodePathToType${className}[T];
    connect<T extends SignalsOf<${className}>, U extends Node>(signal: T, node: U, method: keyof U): number;
  }

  namespace ${className} {
    export function _new(): ${className};

    export { _new as new };
  }
}
  `;
    const destPath = path_1.default.join(project_1.TsGdProjectClass.Paths.godotDefsPath, `@node_paths_${className}.d.ts`);
    fs_1.default.writeFileSync(destPath, result);
};
exports.buildNodePathsTypeForScript = buildNodePathsTypeForScript;
//# sourceMappingURL=build_paths_for_node.js.map