import { parseGodotConfigFile } from "./godot_parser"
import { TsGdProjectClass as TsGdProject } from "./project"

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

export class GodotProjectFile {
  rawConfig: IRawGodotConfig
  autoloads: { resPath: string }[]
  fsPath: string
  actionNames: string[]
  project: TsGdProject

  constructor(path: string, project: TsGdProject) {
    this.rawConfig = parseGodotConfigFile(path, {
      autoload: {},
    }) as IRawGodotConfig

    this.project = project
    this.fsPath = path

    this.autoloads = Object.values(this.rawConfig.autoload)
      .filter((x) => typeof x === "string")
      .map((x) => ({
        // For some reason, the respath strings start with *, e.g. "*res://compiled/Enemy.gd"
        resPath: x.slice(1),
      }))

    this.actionNames = Object.keys(this.rawConfig.input ?? {})
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
      fsPath: TsGdProject.ResPathToFsPath(mainSceneResPath),
    }
  }
}
