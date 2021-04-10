import path from "path"
import fs from "fs"
import { getCommonElements } from "../../ts_utils"
import { TsGdProjectClass } from "../project"
import { GodotNode, AssetGodotScene } from "../assets/asset_godot_scene"
import { AssetSourceFile } from "../assets/asset_source_file"

/**
 * Returns the paths to all children below this node, including grandchildren
 * etc.
 *
 * @param node
 * @param prefix
 */
export const getAllChildPaths = (
  node: GodotNode,
  prefix = ""
): { path: string; node: GodotNode }[] => {
  let myPath = (prefix ? prefix + "/" : "") + node.name
  let result: { path: string; node: GodotNode }[] = [{ path: myPath, node }]

  for (const child of node.children()) {
    result = [...result, ...getAllChildPaths(child, myPath)]
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

  let references: (
    | { use: string; children: string[]; type: "script" }
    | { use: string; type: "instance" }
    | { type: "autoload" }
  )[] = []

  if (nodesWithScript.length === 0) {
    if (script.isAutoload()) {
      // Special logic for autoload classes.
      // TODO: Should we generate /root/ in the node path too?

      const rootScene = project.mainScene
      commonRelativePaths = getAllChildPaths(rootScene.rootNode)
      references = [{ type: "autoload" }]
      commonRelativePaths = commonRelativePaths.map(({ path, node }) => ({
        path: `/root/${path}`,
        node,
      }))
    } else {
      // This class is never instantiated as a node.

      commonRelativePaths = []
      references = []

      // TODO: Maybe flag it if it's also never used as a class.
      // Currently, this is just noise.

      // console.error("Unused class:", className)
    }
  } else {
    const relativePathsPerNode = nodesWithScript.map((i) =>
      i.children().flatMap((ch) => getAllChildPaths(ch))
    )

    references = nodesWithScript.map((node) => ({
      type: "script",
      use: node.scene.resPath + ":" + node.scenePath(),
      children: getAllChildPaths(node).map((o) => o.path),
    }))

    commonRelativePaths = getCommonElements(
      relativePathsPerNode,
      (a, b) => a.path === b.path
    )

    const instancedScene = nodesWithScript.find((node) => node.isRoot)?.scene

    if (instancedScene) {
      const allScenes = project.godotScenes()
      let scenesThatContainInstance: AssetGodotScene[] = []

      let moreReferences: {
        type: "instance"
        use: string
      }[] = []

      for (const scene of allScenes) {
        for (const node of scene.nodes) {
          if (node.instance() === instancedScene) {
            moreReferences.push({
              type: "instance",
              use: scene.resPath + ":" + node.scenePath(),
            })
            scenesThatContainInstance.push(scene)
          }
        }
      }

      references = [...references, ...moreReferences]

      scenesThatContainInstance = [...new Set(scenesThatContainInstance)]

      const allScenePaths = scenesThatContainInstance.map((scene) =>
        getAllChildPaths(scene.rootNode)
      )

      const commonScenePaths = getCommonElements(
        allScenePaths,
        (a, b) => a.path === b.path
      )

      commonRelativePaths = [
        ...commonRelativePaths,
        ...commonScenePaths.map((obj) => ({
          node: obj.node,
          path: "/root/" + obj.path,
        })),
      ]
    }
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
    references.length > 0 ? `\n// Uses of "${script.resPath}": \n` : ""
  }
${references
  .map((ref) => {
    if (ref.type === "autoload") {
      return "// This is an autoload class\n"
    } else if (ref.type === "script") {
      return (
        "// script: " +
        ref.use +
        "\n" +
        ref.children.map((c) => "//  - " + c + " \n").join("")
      )
    } else if (ref.type === "instance") {
      return "// instance: " + ref.use + "\n"
    }
  })
  .join("")}
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
    get_node_safe<T extends keyof NodePathToType${className}>(path: T): NodePathToType${className}[T];
    get_node(path: string): Node
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
