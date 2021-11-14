"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNodePathsTypeForScript = exports.getAllChildPaths = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ts_utils_1 = require("../../ts_utils");
const project_1 = require("../project");
/**
 * Returns the paths to all children below this node, including grandchildren
 * etc.
 *
 * @param node
 * @param prefix
 */
const getAllChildPaths = (node, prefix = "") => {
    let myPath = (prefix ? prefix + "/" : "") + node.name;
    let result = [{ path: myPath, node }];
    for (const child of node.children()) {
        result = [...result, ...exports.getAllChildPaths(child, myPath)];
    }
    return result;
};
exports.getAllChildPaths = getAllChildPaths;
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
    const className = script.exportedTsClassName();
    const extendedClassName = script.extendedClassName();
    if (!className) {
        return [];
    }
    let commonRelativePaths = [];
    let references = [];
    if (nodesWithScript.length === 0) {
        if (script.isAutoload()) {
            // Special logic for autoload classes.
            const rootScene = project.mainScene;
            commonRelativePaths = exports.getAllChildPaths(rootScene.rootNode);
            references = [{ type: "autoload" }];
            commonRelativePaths = commonRelativePaths.map(({ path, node }) => ({
                path: `/root/${path}`,
                node,
            }));
        }
        else {
            // This class is never instantiated as a node.
            commonRelativePaths = [];
            references = [];
            // TODO: Maybe flag it if it's also never used as a class.
            // Currently, this is just noise.
            // console.error("Unused class:", className)
        }
    }
    else {
        const relativePathsPerNode = nodesWithScript.map((i) => i.children().flatMap((ch) => exports.getAllChildPaths(ch)));
        references = nodesWithScript.map((node) => ({
            type: "script",
            use: node.scene.resPath + ":" + node.scenePath(),
            children: exports.getAllChildPaths(node).map((o) => o.path),
        }));
        commonRelativePaths = ts_utils_1.getCommonElements(relativePathsPerNode, (a, b) => a.path === b.path);
        const instancedScene = nodesWithScript.find((node) => node.isRoot)?.scene;
        if (instancedScene) {
            const allScenes = project.godotScenes();
            let scenesThatContainInstance = [];
            let moreReferences = [];
            for (const scene of allScenes) {
                for (const node of scene.nodes) {
                    if (node.instance() === instancedScene) {
                        moreReferences.push({
                            type: "instance",
                            use: scene.resPath + ":" + node.scenePath(),
                        });
                        scenesThatContainInstance.push(scene);
                    }
                }
            }
            references = [...references, ...moreReferences];
            scenesThatContainInstance = [...new Set(scenesThatContainInstance)];
            const allScenePaths = scenesThatContainInstance.map((scene) => exports.getAllChildPaths(scene.rootNode));
            const commonScenePaths = ts_utils_1.getCommonElements(allScenePaths, (a, b) => a.path === b.path);
            commonRelativePaths = [
                ...commonRelativePaths,
                ...commonScenePaths.map((obj) => ({
                    node: obj.node,
                    path: "/root/" + obj.path,
                })),
            ];
        }
    }
    // Normal case
    const pathToImport = {};
    for (const { path, node } of commonRelativePaths) {
        const script = node.getScript();
        if (script) {
            pathToImport[path] = `import("${script.fsPath.slice(0, -".ts".length)}").${script.exportedTsClassName()}`;
        }
        else {
            pathToImport[path] = node.tsType();
        }
    }
    const obj = {
        type: "",
        name: "",
        children: {},
    };
    for (const { path, node } of commonRelativePaths) {
        if (path.startsWith("/")) {
            continue;
        }
        const names = path.split("/");
        let cur = obj;
        for (const name of names) {
            if (!cur.children[name]) {
                cur.children[name] = {
                    type: "",
                    name: name,
                    children: {},
                };
            }
            cur = cur.children[name];
        }
        cur.type = pathToImport[path];
        cur.name = names[names.length - 1];
    }
    function process(obj, indent = "") {
        let result = "";
        result += indent + obj.name + ": " + obj.type + " & {\n";
        for (const childName of Object.keys(obj.children)) {
            result += process(obj.children[childName], indent + "  ");
        }
        result += indent + "}\n";
        return result;
    }
    const directNodeAccessPaths = Object.values(obj.children)
        .map((c) => process(c))
        .join("\n");
    let result = `${references.length > 0 ? `// Uses of "${script.resPath}": \n` : ""}
${references
        .map((ref) => {
        if (ref.type === "autoload") {
            return "// This is an autoload class\n";
        }
        else if (ref.type === "script") {
            return ("// As a script:\n" +
                "//   " +
                ref.use +
                "\n" +
                ref.children.map((c) => "//     - " + c + " \n").join(""));
        }
        else if (ref.type === "instance") {
            return "// As an instance:\n" + "//  " + ref.use + "\n";
        }
    })
        .join("")}
declare type NodePathToType${className} = {
${Object.entries(pathToImport)
        .map(([path, importStr]) => `  "${path}": ${importStr},`)
        .join("\n")}
}    
`;
    result += `
  
import { ${className} } from '${script.tsRelativePath.slice(0, -".ts".length)}'

declare module '${script.tsRelativePath.slice(0, -".ts".length)}' {
  interface ${className} {
    get_node<T extends keyof NodePathToType${className}>(path: T): NodePathToType${className}[T];
    get_node_unsafe<T>(path: string): T

  }

  namespace ${className} {
    export function _new(): ${className};

    export { _new as new };
  }
}
`;
    const destPath = path_1.default.join(project_1.TsGdProjectClass.Paths.dynamicGodotDefsPath, `@node_paths_${script.getGodotClassName()}.d.ts`);
    fs_1.default.writeFileSync(destPath, result);
};
exports.buildNodePathsTypeForScript = buildNodePathsTypeForScript;
//# sourceMappingURL=build_node_paths.js.map