import fs from "fs"

import { parseGodotConfigFile } from "../godot_parser"
import TsGdProject from "../project"

import { AssetBase } from "./asset_base"

interface IRawGodotConfig {
  globals: {
    config_version: number
    _global_script_classes: {
      base: string
      class: string
      language: string
      path: string
    }[]

    _global_script_class_icons: { [key: string]: string }
  }

  application?: {
    "config/name": string
    "run/main_scene": string
    "config/icon": string
  }

  autoload: { [key: string]: string }
  debug: {
    "gdscript/warnings/unsafe_property_access": string
    "gdscript/warnings/unsafe_method_access": string
    "gdscript/warnings/unsafe_cast": string
    "gdscript/warnings/unsafe_call_argument": string
  }

  input?: {
    [name: string]: {
      deadzone: number
      events: any[]
    }
  }

  rendering: {
    "environment/default_environment": string
  }
}

export class AssetGodotProjectFile extends AssetBase {
  static extensions = [".godot"]

  rawConfig: IRawGodotConfig
  autoloads: { resPath: string }[]
  actionNames: string[]

  constructor(fsPath: string, project: TsGdProject) {
    super(fsPath, project)
    this.rawConfig = parseGodotConfigFile(fsPath, {
      autoload: [],
    }) as IRawGodotConfig

    this.autoloads = Object.values(this.rawConfig.autoload[0] ?? {})
      .filter((x) => typeof x === "string")
      .map((x) => ({
        // For some reason, the respath strings start with *, e.g. "*res://compiled/Enemy.gd"
        resPath: x.slice(1),
      }))

    this.actionNames = Object.keys(this.rawConfig.input ?? {})
  }

  addAutoload(className: string, resPath: string) {
    this.project.godotProject.autoloads = [
      ...this.project.godotProject.autoloads,
      { resPath: resPath },
    ]

    const lines = fs.readFileSync(this.fsPath, "utf-8").split("\n")
    const index = lines.indexOf("[autoload]")
    const autoloadLine = `${className}="*${resPath}"`

    if (index > 0) {
      lines.splice(index + 2, 0, autoloadLine)
    } else {
      lines.push(`[autoload]\n\n${autoloadLine}`)
    }

    fs.writeFileSync(this.fsPath, lines.join("\n"))
  }

  removeAutoload(resPath: string) {
    this.project.godotProject.autoloads =
      this.project.godotProject.autoloads.filter((a) => a.resPath !== resPath)

    // TODO: This is a big hack
    let lines = fs.readFileSync(this.fsPath, "utf-8").split("\n")
    let resultLines = []
    let inAutoloadSection = false
    const autoloadLine = `="*${resPath}"`

    for (const line of lines) {
      if (line.trim().startsWith("[") && line.trim().endsWith("]")) {
        if (line.trim() === "[autoload]") {
          inAutoloadSection = true
        } else {
          inAutoloadSection = false
        }
      }

      if (inAutoloadSection && line.trim().endsWith(autoloadLine)) {
        continue
      }

      resultLines.push(line)
    }

    fs.writeFileSync(this.fsPath, resultLines.join("\n"))
  }

  mainScene() {
    let mainSceneResPath = this.rawConfig.application?.["run/main_scene"]

    if (!mainSceneResPath) {
      // If they don't have one, just take the first one

      const allScenes = this.project.godotScenes()

      if (allScenes.length > 1) {
        console.warn(
          "No main scene defined and more than one scene found! Choosing one arbitrarily."
        )
        console.warn("Please set a main scene in the Godot project settings.")
        console.warn("\n")
        console.warn("Scenes found:")

        console.warn(allScenes.map((s) => s.fsPath).join("\n"))
      }

      mainSceneResPath = allScenes[0].resPath
    }

    return {
      resPath: mainSceneResPath,
      fsPath: this.project.paths.resPathToFsPath(mainSceneResPath),
    }
  }

  get tsType() {
    return null as never
  }
}

export default AssetGodotProjectFile
