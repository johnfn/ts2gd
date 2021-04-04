import path from "path"
import fs from "fs"
import { AssetSourceFile } from "./project/asset_source_file"
import { TsGdProjectClass } from "./project/project"
import { GodotNode } from "./project/asset_godot_scene"

export const getAllRelativePaths = (
  node: GodotNode,
  prefix = ""
): { path: string; node: GodotNode }[] => {
  let myPath = (prefix ? prefix + "/" : "") + node.name
  let result: { path: string; node: GodotNode }[] = [{ path: myPath, node }]

  for (const child of node.children()) {
    result = [...result, ...getAllRelativePaths(child, myPath)]
  }

  return result
}

export const buildNodePathsTypeForScript = (
  script: AssetSourceFile,
  project: TsGdProjectClass
) => {
  // Find all instances of this script in all scenes.

  const nodesWithScript: GodotNode[] = []

  for (const scene of project.godotScenes()) {
    for (const node of scene.nodes) {
      const nodeScript = node.getScript()

      if (
        nodeScript &&
        nodeScript.resPath === script.resPath &&
        // Skip instances. Their children are not stored in their scene.
        !node.instance()
      ) {
        nodesWithScript.push(node)
      }
    }
  }

  // For every potential relative path, validate that it can be found
  // in each instantiated node.

  const className = script.className()

  if (!className) {
    return []
  }

  let commonRelativePaths: {
    path: string
    node: GodotNode
  }[] = []

  let allPaths: string[] = []

  if (nodesWithScript.length === 0) {
    if (script.isAutoload()) {
      // Special logic for autoload classes.
      // TODO: Should we generate /root/ in the node path too?

      const rootScene = project.mainScene
      commonRelativePaths = getAllRelativePaths(rootScene.rootNode)
      allPaths = [
        `This is an autoload class. Your starting scene is: ${rootScene.resPath}`,
      ]
      commonRelativePaths = commonRelativePaths.map(({ path, node }) => ({
        path: `/root/${path}`,
        node,
      }))
    } else {
      // This class is never instantiated as a node.

      commonRelativePaths = []
      allPaths = []

      // TODO: Maybe flag it if it's also never used as a class.
      // Currently, this is just noise.

      // console.error("Unused class:", className)
    }
  } else {
    const relativePathsPerNode = nodesWithScript.map((i) =>
      i.children().flatMap((ch) => getAllRelativePaths(ch))
    )
    allPaths = nodesWithScript.map(
      (node) => node.scene.resPath + ":" + node.scenePath()
    )

    commonRelativePaths = relativePathsPerNode[0].filter((elem) =>
      relativePathsPerNode.every((pathsList) =>
        pathsList.map((pl) => pl.path).includes(elem.path)
      )
    )
  }

  // Normal case

  const pathToImport: { [key: string]: string } = {}

  for (const { path, node } of commonRelativePaths) {
    const script = node.getScript()

    if (script) {
      pathToImport[path] = `import("${script.fsPath.slice(
        0,
        -".ts".length
      )}").${script.className()}`
    } else {
      pathToImport[path] = node.tsType()
    }
  }

  let result = `${
    allPaths.length > 0 ? `\n// Uses of "${script.resPath}": \n` : ""
  }
${allPaths.map((x) => "// " + x).join("\n")}
declare type NodePathToType${className} = {
${Object.entries(pathToImport)
  .map(([path, importStr]) => `  "${path}": ${importStr},`)
  .join("\n")}
}    
`

  result += `
  
import ${className} from '${script.tsRelativePath.slice(0, -".ts".length)}'

declare module '${script.tsRelativePath.slice(0, -".ts".length)}' {
  interface ${className} {
    get_node<T extends keyof NodePathToType${className}>(path: T): NodePathToType${className}[T];
    connect<T extends SignalsOf<${className}>, U extends Node>(signal: T, node: U, method: keyof U): number;
  }

  namespace ${className} {
    export function _new(): ${className};

    export { _new as new };
  }
}
  `

  const destPath = path.join(
    TsGdProjectClass.Paths.dynamicGodotDefsPath,
    `@node_paths_${className}.d.ts`
  )

  fs.writeFileSync(destPath, result)
}
