import fs from "fs"
import path from "path"

import { GodotNode } from "../ts_utils"
import { BaseAsset } from "./base_asset"
import { TsGdProjectClass } from "./project"

export class AssetGodotScene extends BaseAsset {
  /** e.g. /Users/johnfn/GodotProject/Scenes/my_scene.tscn */
  fsPath: string

  /** e.g. res://Scenes/my_scene.tscn */
  resPath: string

  nodes: GodotNode[]

  resources: {
    resPath: string
    fsPath: string
    // TODO: Assumes that filename === classname
    // TODO: Best not to even use this.
    type: string
    id: number
  }[]

  /** e.g. my_scene.tscn */
  name: string

  rootNode: GodotNode

  project: TsGdProjectClass

  constructor(fsPath: string, project: TsGdProjectClass) {
    super()

    this.fsPath = fsPath
    this.project = project
    this.resPath = TsGdProjectClass.FsPathToResPath(fsPath)

    const content = fs.readFileSync(fsPath, "utf-8")
    const extResourceRe = /^\[ext_resource path="(.*)" type="(.*)" id=([0-9]+)\]$/gm
    const extResources = [...content.matchAll(extResourceRe)].map((match) => ({
      resPath: match[1],
      fsPath: TsGdProjectClass.ResPathToFsPath(match[1]),
      // TODO: Assumes that filename === classname
      type: match[1].slice(
        match[1].lastIndexOf("/") + 1,
        match[1].lastIndexOf(".")
      ),
      id: Number(match[3]),
    }))

    const nodeRe = /^\[node name="(?<name>[^"]+)"( type="(?<type>[^"]+)")?( parent="(?<parent>[^"]+)")?( instance=ExtResource\( (?<instanceId>[0-9]+) \))?( groups=\[(?<groups>[^\]]+)\])?\](?<rest>[^]*?)(\n\n|\n$)/gm
    const allNodes: GodotNode[] = [...content.matchAll(nodeRe)].map((match) => {
      const groups = match.groups!
      const scriptRe = /^script = ExtResource\( ([0-9]+) \)$/gm
      const scriptReResult = scriptRe.exec(groups.rest)
      const script = scriptReResult
        ? extResources.find(
            (resource) => resource.id === Number(scriptReResult[1])
          )
        : undefined

      let instanceId = groups.instanceId ? Number(groups.instanceId) : undefined

      if (instanceId) {
        const instanceResource = extResources.find(
          (res) => res.id === instanceId
        )
        const instancedSceneFsPath = instanceResource?.fsPath

        return new GodotNode({
          name: groups.name,
          type: groups.type,
          isRoot: !groups.parent,
          // script: groups.script,
          script: script,
          parent: groups.parent,
          groups: groups.groups,
          scenePath: "",
          rest: groups.rest,
          instancedSceneFsPath: instancedSceneFsPath,
          // Will be filled in in the next pass
          children: [],
        })
      }

      return new GodotNode({
        name: groups.name,
        type: groups.type,
        isRoot: !groups.parent,
        // script: groups.script,
        script: script,
        parent: groups.parent,
        groups: groups.groups,
        scenePath: "",
        rest: groups.rest,

        // Will be filled in in the next pass
        children: [],
      })
    })

    const rootNode = allNodes.find((node) => !node.parent)!

    for (const node of allNodes) {
      let path = ""

      if (node.parent === ".") {
        path = "/root/" + rootNode.name + "/" + node.name
      } else if (node.parent === undefined) {
        path = "/root/" + rootNode.name
      } else {
        path = "/root/" + rootNode.name + "/" + node.parent + "/" + node.name
      }

      node.scenePath = path
    }

    for (const node of allNodes) {
      // Find my children
      let pathThatAChildWouldHave = ""

      if (!node.parent) {
        pathThatAChildWouldHave = "."
      } else {
        if (node.parent === ".") {
          pathThatAChildWouldHave = node.name
        } else {
          pathThatAChildWouldHave = node.parent + "/" + node.name
        }
      }

      node.children = allNodes.filter(
        (node) => node.parent === pathThatAChildWouldHave
      )
    }

    this.nodes = allNodes
    this.resources = extResources
    this.name = path.basename(fsPath, ".tscn")
    this.rootNode = allNodes.find((node) => !node.parent)!
  }

  /** e.g. PackedScene<import('/Users/johnfn/GodotGame/scripts/Enemy').Enemy> */
  tsType(): string | null {
    const rootScript = this.rootNode.getScript(this.project.godotScenes)

    if (rootScript) {
      const rootSourceFile = this.project.sourceFiles.find(
        (sf) => sf.resPath === rootScript.resPath
      )

      if (!rootSourceFile) {
        throw new Error(
          `Failed to find root source file for ${rootScript.fsPath}`
        )
      }

      const className = rootSourceFile.className()

      if (!className) {
        return null
      }

      return `PackedScene<import('${rootSourceFile.fsPath.slice(
        0,
        -".ts".length
      )}').${rootSourceFile.className()}>`
    } else {
      return `PackedScene<${this.rootNode.type}>`
    }
  }
}
