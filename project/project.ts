import chokidar from "chokidar"
import path from "path"
import ts from "typescript"

import { AssetGodotClass as GodotFile } from "./asset_godot_class"
import { AssetGodotScene } from "./asset_godot_scene"
import { AssetFont } from "./asset_font"
import { AssetSourceFile } from "./asset_source_file"
import { GodotProjectFile } from "./godot_project_file"
import { TsGdJson } from "./tsgd_json"
import { BaseAsset } from "./base_asset"

// TODO: Instead of manually scanning to find all assets, i could just import
// all godot files, and then parse them for all their asset types. It would
// probably be easier to find the tscn and tres files.

export class TsGdProjectClass {
  /**
   * Path to the directory that contains the tsgd.json file.
   *
   * @example /Users/johnfn/GodotProject/
   */
  static tsgdPath: string

  /**
   * Path to the the tsgd.json file.
   *
   * @example /Users/johnfn/GodotProject/tsgd.json
   */
  static tsgdPathWithFilename: string

  /** Parsed tsgd.json file. */
  tsgdJson: TsGdJson

  /** Parsed project.godot file. */
  godotProject!: GodotProjectFile

  /** Info about each source file. */
  sourceFiles: AssetSourceFile[] = []

  /** Info about each Godot class. */
  godotClasses: GodotFile[] = []

  /** Info about each Godot scene. */
  godotScenes: AssetGodotScene[] = []

  mainScene: AssetGodotScene

  assets: BaseAsset[] = []

  /** Info about each Godot font. */
  godotFonts: AssetFont[] = []

  godotDefsPath: string

  program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>

  constructor(
    watcher: chokidar.FSWatcher,
    initialFilePaths: string[],
    program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>
  ) {
    // Initial set up

    const { tsgdPath, tsgdPathWithFilename } = getTsgdPath()

    TsGdProjectClass.tsgdPath = tsgdPath
    TsGdProjectClass.tsgdPathWithFilename = tsgdPathWithFilename
    this.tsgdJson = new TsGdJson()
    this.program = program
    this.godotDefsPath = path.join(tsgdPath, "godot_defs")

    // Parse assets

    const initialAssets = initialFilePaths.map((path) => this.getAsset(path))

    for (const asset of initialAssets) {
      if (asset === null) {
        continue
      }

      if (asset instanceof BaseAsset) {
        this.assets.push(asset)
      }

      if (asset instanceof GodotProjectFile) {
        this.godotProject = asset
      } else if (asset instanceof AssetSourceFile) {
        this.sourceFiles.push(asset)
      } else if (asset instanceof GodotFile) {
        this.godotClasses.push(asset)
      } else if (asset instanceof AssetGodotScene) {
        this.godotScenes.push(asset)
      } else if (asset instanceof AssetFont) {
        this.godotFonts.push(asset)
      } else {
        let x: never = asset

        throw new Error("Unhandled asset type!")
      }
    }

    this.mainScene = this.godotScenes.find(
      (scene) => scene.resPath === this.godotProject.mainScene.resPath
    )!

    this.monitor(watcher)
  }

  getAsset(
    path: string
  ):
    | AssetSourceFile
    | GodotFile
    | AssetGodotScene
    | AssetFont
    | GodotProjectFile
    | null {
    if (path.endsWith(".ts")) {
      return new AssetSourceFile(path, this)
    } else if (path.endsWith(".gd")) {
      return new GodotFile(path, this)
    } else if (path.endsWith(".tscn")) {
      return new AssetGodotScene(path, this)
    } else if (path.endsWith(".godot")) {
      return new GodotProjectFile(path)
    } else if (path.endsWith(".ttf")) {
      return new AssetFont(path, this)
    }

    throw new Error(`unhandled asset type ${path}`)
  }

  monitor(watcher: chokidar.FSWatcher) {
    watcher
      .on("add", (path) => this.onAddAsset(path))
      .on("change", (path) => this.onChangeAsset(path))
      .on("unlink", (path) => this.onRemoveAsset(path))
  }

  onAddAsset(path: string) {
    const newAsset = this.getAsset(path)

    if (newAsset instanceof AssetSourceFile) {
      newAsset.compile()
    }
  }

  onChangeAsset(path: string) {
    let changedAsset = this.assets.find((asset) => asset.fsPath === path)

    // NOTE: The initial add can fail (e.g. a TS file w/o a class)
    // so we need to readd, maybe.
    // TODO: The initial add shouldn't fail.
    if (!changedAsset) {
      const asset = this.getAsset(path)

      if (asset && asset instanceof BaseAsset) {
        this.assets.push(asset)

        changedAsset = asset
      } else {
        return
      }
    }

    if (changedAsset instanceof AssetSourceFile) {
      changedAsset.compile()
    }
  }

  onRemoveAsset(path: string) {
    const changedAsset = this.assets.find((asset) => asset.fsPath === path)

    if (!changedAsset) {
      return
    }

    console.log("Deleting", path)

    if (changedAsset instanceof AssetSourceFile) {
      changedAsset.destroy()
    }
  }

  compileAllSourceFiles() {
    for (const asset of this.assets) {
      if (asset instanceof AssetSourceFile) {
        asset.compile()
      }
    }
  }

  static ResPathToFsPath(resPath: string) {
    return path.join(this.tsgdPath, resPath.slice("res://".length))
  }

  static FsPathToResPath(fsPath: string) {
    return "res://" + fsPath.slice(this.tsgdPath.length + 1)
  }
}

export const makeTsGdProject = async (
  program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>
) => {
  const { tsgdPath } = getTsgdPath()
  const initialFiles: string[] = []

  let addFn!: (path: string) => void
  let readyFn!: () => void

  const watcher = await new Promise<chokidar.FSWatcher>((resolve) => {
    addFn = (path) => initialFiles.push(path)
    readyFn = () => resolve(watcher)

    const watcher: chokidar.FSWatcher = chokidar
      .watch(tsgdPath, {
        ignored: (path: string, stats: any) => {
          return !shouldIncludePath(path)
        },
      })
      .on("add", addFn)
      .on("ready", readyFn)
  })

  watcher.off("add", addFn)
  watcher.off("ready", readyFn)

  return new TsGdProjectClass(watcher, initialFiles, program)
}

const shouldIncludePath = (path: string): boolean => {
  if (!path.includes(".")) {
    // Folder (i hope)
    // TODO: Might be able to check stat to be more sure about this
    return true
  }

  if (path.includes("godot_defs")) {
    return false
  }

  if (path.includes(".git")) {
    return false
  }

  if (path.endsWith(".ttf")) {
    return true
  }

  if (path.endsWith(".gd")) {
    return true
  }

  // Note ordering (re: .ts)
  if (path.endsWith(".d.ts")) {
    return false
  }

  if (path.endsWith(".ts")) {
    return true
  }

  if (path.endsWith(".tscn")) {
    return true
  }

  if (path.endsWith(".godot")) {
    return true
  }

  return false
}

const getTsgdPath = () => {
  let verbose = false
  const inputPath = process.argv[2]
  let tsgdPathWithFilename: string
  let tsgdPath: string

  if (!inputPath) {
    console.error(
      "Please specify a tsgd.json file on the command line. Thanks!"
    )
    process.exit(0)
  }

  if (inputPath.startsWith("/")) {
    // absolute path

    tsgdPathWithFilename = inputPath
  } else if (inputPath.startsWith(".")) {
    // some sort of relative path, so resolve it

    tsgdPathWithFilename = path.join(process.execPath, inputPath)
  } else {
    console.error("That appears to be an invalid path.")
    process.exit(0)
  }

  tsgdPath = path.dirname(tsgdPathWithFilename)

  return { tsgdPath, tsgdPathWithFilename }
}
