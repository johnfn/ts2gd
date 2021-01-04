import fs from "fs"
import util from "util"
import path from "path"

import { BaseAsset } from "./base_asset"
import { parseGodotConfigFile } from "./godot_parser"
import { TsGdProjectClass } from "./project"
import { AssetSourceFile } from "./asset_source_file"

interface IGodotSceneFile {
  gd_scene: {
    $section: {
      load_steps: number
      format: number
    }
  }

  ext_resource?: {
    $section: {
      identifier: "ext_resource"
      path: string
      type: string
      id: number
    }
  }[]

  sub_resource: {
    $section: {
      identifier: "sub_resource"
      type: string
      id: number
    }
  }[]

  node: {
    $section: {
      identifier: "node"
      name: string
      type: string
      parent?: string
      groups?: string[]
      instance?: {
        args: [number]
        identifier: string // 'ExtResource' most likely
      }
    }
    position?: {
      args: [number, number]
      identifier: string
    }
    script?: {
      args: [number]
      identifier: string
    }

    [key: string]: any
  }[]
}

export class GodotNode2 {
  name: string
  type: string
  isRoot: boolean
  // parent: groups.parent;
  groups: string[]

  parent: string | undefined
  $section: IGodotSceneFile["node"][0]["$section"]
  scene: AssetGodotScene
  project: TsGdProjectClass
  script: IGodotSceneFile["node"][0]["script"] | undefined

  constructor(
    props: IGodotSceneFile["node"][0],
    scene: AssetGodotScene,
    project: TsGdProjectClass
  ) {
    this.name = props.$section.name
    this.project = project
    this.scene = scene
    this.type = props.$section.type
    this.isRoot = props.$section.parent ? false : true
    this.groups = props.$section.groups ?? []
    this.$section = props.$section
    this.parent = props.$section.parent ?? undefined
    this.script = props.script ?? undefined
  }

  /**
   * e.g. "Player" for a node on the root
   * e.g. "Player/Arm" for a nested node
   * e.g. "." for the root
   */
  scenePath(): string {
    if (!this.parent) {
      return "."
    } else {
      if (this.parent === ".") {
        return this.name
      } else {
        return this.parent + "/" + this.name
      }
    }
  }

  children(): GodotNode2[] {
    const path = this.scenePath()

    return this.scene.nodes.filter((node) => node.parent === path)
  }

  instancedScene(): AssetGodotScene | undefined {
    let instanceId = this.$section.instance?.args[0]

    if (!instanceId && instanceId !== 0) {
      return undefined
    }

    const res = this.scene.resources.find((res) => res.id === instanceId)

    if (!res) {
      throw new Error(
        `Can't find associated scene for id ${instanceId} on ${this.scenePath()}`
      )
    }

    return this.project
      .godotScenes()
      .find((scene) => scene.fsPath === res?.fsPath)
  }

  getScript(): AssetSourceFile | undefined {
    let script = this.script
    let sceneContainingScript: AssetGodotScene | undefined = this.scene

    if (!script) {
      script = this.instancedScene()?.rootNode.script
      sceneContainingScript = this.instancedScene()
    }

    if (!script || !sceneContainingScript) {
      return undefined
    }

    const tempResourceThing = sceneContainingScript.resources.find(
      (obj) => obj.id === script!.args[0]
    )

    if (!tempResourceThing) {
      throw new Error(
        `expected to be able to find a resource for id ${
          script!.args[0]
        } in script ${this.scene.fsPath}, but did not.`
      )
    }

    let res = this.scene.project.assets.find(
      (sf) =>
        sf instanceof AssetSourceFile &&
        sf.resPath === tempResourceThing?.resPath
    ) as AssetSourceFile

    return res
  }
}

type ResourceTemp = {
  resPath: string
  fsPath: string
  // TODO: Assumes that filename === classname
  // TODO: Best not to even use this.
  type: string
  id: number
}

export class AssetGodotScene extends BaseAsset {
  /** e.g. /Users/johnfn/GodotProject/Scenes/my_scene.tscn */
  fsPath: string

  /** e.g. res://Scenes/my_scene.tscn */
  resPath: string

  nodes: GodotNode2[]

  resources: ResourceTemp[]

  /** e.g. my_scene.tscn */
  name: string

  rootNode: GodotNode2

  project: TsGdProjectClass

  constructor(fsPath: string, project: TsGdProjectClass) {
    super()

    const sceneFile = parseGodotConfigFile(fsPath, {
      ext_resource: [],
    }) as IGodotSceneFile

    this.fsPath = fsPath
    this.project = project
    this.resPath = TsGdProjectClass.FsPathToResPath(fsPath)

    this.resources = (sceneFile.ext_resource ?? []).map((resource) => {
      return {
        resPath: resource.$section.path,
        fsPath: TsGdProjectClass.ResPathToFsPath(resource.$section.path),
        id: resource.$section.id,
        type: resource.$section.type,
      }
    })

    this.nodes = sceneFile.node.map(
      (node) => new GodotNode2(node, this, this.project)
    )

    this.name = path.basename(fsPath, ".tscn")
    this.rootNode = this.nodes.find((node) => !node.parent)!
  }

  /** e.g. PackedScene<import('/Users/johnfn/GodotGame/scripts/Enemy').Enemy> */
  tsType(): string | null {
    const rootScript = this.rootNode.getScript()

    if (rootScript) {
      const rootSourceFile = this.project
        .sourceFiles()
        .find((sf) => sf.resPath === rootScript.resPath)

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
