import { parseGodotConfigFile } from "./godot_parser"
import { TsGdProjectClass } from "./project"

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

  application: {
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

  input: {
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
  mainScene: {
    resPath: string
    fsPath: string
  }

  constructor(path: string) {
    this.rawConfig = parseGodotConfigFile(path) as any

    const mainSceneResPath = this.rawConfig.application["run/main_scene"]
    this.autoloads = Object.values(this.rawConfig.autoload).map((x) => ({
      // For some reason, the respath strings start with *, e.g. "*res://compiled/Enemy.gd"
      resPath: x.slice(1),
    }))
    console.log(this.autoloads)
    this.mainScene = {
      resPath: mainSceneResPath,
      fsPath: TsGdProjectClass.ResPathToFsPath(mainSceneResPath),
    }
  }
}
