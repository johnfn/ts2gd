import { ParsedSourceFile, TsGdProject, Node } from "./main";
import path from 'path';
import fs from 'fs';

export const getAllRelativePaths = (node: Node, prefix = ""): { path: string, node: Node }[] => {
  let myPath = (prefix ? (prefix + "/") : "") + node.name
  let result: { path: string; node: Node }[] = [
    { path: myPath, node },
  ];

  for (const child of node.children) {
    result = [
      ...result,
      ...getAllRelativePaths(child, myPath)]
  }

  return result;
}

export const buildNodePathsTypeForScript = (script: ParsedSourceFile, project: TsGdProject) => {
  // Find all instances of this script in all scenes.

  const instances: Node[] = [];

  for (const scene of project.scenes) {
    for (const node of scene.nodes) {
      const nodeScript = node.getScript(project.scenes);

      if (nodeScript && nodeScript.resPath === script.resPath) {
        instances.push(node);
      }
    }
  }

  // For every potential relative path, validate that it can be found
  // in each instantiated node.

  const className = script.className;
  let commonRelativePaths: {
    path: string;
    node: Node;
  }[] = [];

  if (instances.length === 0) {
    if (script.isAutoload) {
      // Special logic for autoload classes.

      const rootScene = project.scenes.find(s => project.mainScene.resPath === s.resPath)!;
      commonRelativePaths = getAllRelativePaths(rootScene.rootNode);
      commonRelativePaths = commonRelativePaths.map(({ path, node }) => ({ path: `/root/${path}`, node }));
    } else {
      // This class is never instantiated as a node.

      commonRelativePaths = [];
    }
  } else {
    const relativePathsPerNode = instances.map(i => i.children.flatMap(ch => getAllRelativePaths(ch)));
    commonRelativePaths = relativePathsPerNode[0].filter(elem => relativePathsPerNode.every(pathsList => pathsList.map(pl => pl.path).includes(elem.path)));
  }

  // Normal case

  let result = `declare type NodePathToType${className} = {\n`

  for (const { path, node } of commonRelativePaths) {
    const script = node.getScript(project.scenes);

    if (script) {
      const associatedClass = project.sourceFiles.find(source => {
        return source.className === script.type;
      })!;

      if (!associatedClass) {
        throw new Error(`\nCan't find the class for ${script.type}
script.type=${script.type}
`)
      }

      result += `  '${path}': import("${associatedClass.tsFullPath.slice(0, -'.ts'.length)}").${script.type},\n`;
    } else {
      result += `  '${path}': ${node.type},\n`;
    }
  }

  result += `}
  
import ${className} from './../${project.sourcePath}/${path.basename(script.tsFullPath).slice(0, -'.ts'.length)}'

declare module './../${script.tsRelativePath.slice(0, -'.ts'.length)}' {
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

  const destPath = path.join(project.tsgdPath, "godot_defs", `@node_paths_${className}.d.ts`)
  fs.writeFileSync(destPath, result);
};