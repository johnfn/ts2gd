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
): void => {
  // Find all instances of this script in all scenes.

  const nodesWithScript: GodotNode[] = []

  for (const scene of project.godotScenes()) {
    for (const node of scene.nodes) {
      const nodeScript = node.getScript()

      if (nodeScript && nodeScript.resPath === script.resPath) {
        const instance = node.instance()
        let isValid = false

        if (!instance) {
          isValid = true
        } else {
          // We want to skip instances of this scene, because instances are not
          // stored with their children in .tscn files.
          isValid = instance.resPath === nodeScript.resPath
        }

        if (isValid) {
          nodesWithScript.push(node)
        }
      }
    }
  }

  // For every potential relative path, validate that it can be found
  // in each instantiated node.

  const className = script.exportedTsClassName()
  const extendedClassName = script.extendedClassName()

  if (!className) {
    return
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
      )}").${script.exportedTsClassName()}`
    } else {
      pathToImport[path] = node.tsType()
    }
  }

  type RecursivePath = {
    type: string
    name: string
    children: { [name: string]: RecursivePath }
  }
  const obj: RecursivePath = {
    type: "",
    name: "",
    children: {},
  }

  for (const { path, node } of commonRelativePaths) {
    if (path.startsWith("/")) {
      continue
    }

    const names = path.split("/")
    let cur = obj

    for (const name of names) {
      if (!cur.children[name]) {
        cur.children[name] = {
          type: "",
          name: name,
          children: {},
        }
      }

      cur = cur.children[name]
    }

    cur.type = pathToImport[path]
    cur.name = names[names.length - 1]
  }

  function process(obj: RecursivePath, indent = "") {
    let result = ""

    result += indent + obj.name + ": " + obj.type + " & {\n"

    for (const childName of Object.keys(obj.children)) {
      result += process(obj.children[childName], indent + "  ")
    }

    result += indent + "}\n"

    return result
  }

  const directNodeAccessPaths = Object.values(obj.children)
    .map((c) => process(c))
    .join("\n")

  let result = `${
    references.length > 0
      ? `// Uses of "${script.resPath}": \n`
      : `// No uses of "${script.resPath}" found.\n`
  }
${references
  .map((ref) => {
    if (ref.type === "autoload") {
      return "// This is an autoload class\n"
    } else if (ref.type === "script") {
      return (
        "// As a script:\n" +
        "//   " +
        ref.use +
        "\n" +
        ref.children.map((c) => "//     - " + c + " \n").join("")
      )
    } else if (ref.type === "instance") {
      return "// As an instance:\n" + "//  " + ref.use + "\n"
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
  
import { ${className} } from '${script.tsRelativePath.slice(0, -".ts".length)}'

declare module '${script.tsRelativePath.slice(0, -".ts".length)}' {
  enum ADD_A_GENERIC_TYPE_TO_GET_NODE_FOR_THIS_TO_WORK {}

  interface ${className} {
    /**
     * Gets a node by a string path. There are two ways to use this function:
     * 
     * 1. this.get_node("KnownNode") - Use this when ts2gd can prove there's a
     * node at the path you provide
     * 
     * 2. this.get_node\<Label\>("DynamicNode") - Use this when ts2gd can't prove
     * there's a node at the provided path, but you know that it is there. Be
     * sure to add the type parameter (e.g. <Label>) to indicate to ts2gd what
     * type of node you're retrieving - otherwise there will be an error!
     * 
     * N.B. It *should* be possible to use ts2gd without *ever* having to revert
     * to the second get_node call with the type parameter. Please open a GitHub
     * issue if you feel this isn't the case.
     */
    get_node<T extends keyof NodePathToType${className}>(path: T): (
      NodePathToType${className}[T]
    );
    get_node<T extends Node | ADD_A_GENERIC_TYPE_TO_GET_NODE_FOR_THIS_TO_WORK = ADD_A_GENERIC_TYPE_TO_GET_NODE_FOR_THIS_TO_WORK>(path: string & (T extends ADD_A_GENERIC_TYPE_TO_GET_NODE_FOR_THIS_TO_WORK ? ADD_A_GENERIC_TYPE_TO_GET_NODE_FOR_THIS_TO_WORK : string)): T;

    /**
     * @deprecated - please use get_node<T> instead.
     */
    get_node_unsafe<T>(path: string): T
  }

  namespace ${className} {
    export function _new(): ${className};

    export { _new as new };
  }
}
`

  const destPath = path.join(
    TsGdProjectClass.Paths.dynamicGodotDefsPath,
    `@node_paths_${script.getGodotClassName()}.d.ts`
  )

  fs.writeFileSync(destPath, result)
}
