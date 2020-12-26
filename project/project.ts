import chokidar from "chokidar"
import path from "path"

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

  constructor(watcher: chokidar.FSWatcher, initialFilePaths: string[]) {
    // Initial set up

    const { tsgdPath, tsgdPathWithFilename } = getTsgdPath()

    TsGdProjectClass.tsgdPath = tsgdPath
    TsGdProjectClass.tsgdPathWithFilename = tsgdPathWithFilename
    this.tsgdJson = new TsGdJson()
    this.godotDefsPath = path.join(tsgdPath, "godot_defs")

    // Parse assets

    const initialAssets = initialFilePaths.map((path) => this.getAsset(path))

    for (const asset of initialAssets) {
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

  getAsset(path: string) {
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
      .on("add", (path) => {
        console.log("add", path)
        // this.add(this.getAsset(path))
      })
      .on("change", (path) => console.log("updated", path))
      .on("unlink", (path) => console.log("updated", path))
  }

  add(asset: string) {
    // if (asset.type === "typescript") {
    //   this.sourceFiles.push(new TsGdSourceFile(asset.path, this));
    // }
    // if (asset.type === "godotscript") {
    //   this.classes.push(new GodotClass(asset.path));
    // }
    // console.log(this)
  }

  static ResPathToFsPath(resPath: string) {
    return path.join(this.tsgdPath, resPath.slice("res://".length))
  }

  static FsPathToResPath(fsPath: string) {
    return "res://" + fsPath.slice(this.tsgdPath.length + 1)
  }
}

export const makeTsGdProject = async () => {
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

  return new TsGdProjectClass(watcher, initialFiles)
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
