import chokidar from "chokidar"
import path from "path"

import { AssetGodotClass } from "./asset_godot_class"
import { AssetGodotScene } from "./asset_godot_scene"
import { AssetFont } from "./asset_font"
import { AssetSourceFile } from "./asset_source_file"
import { AssetGodotProjectFile } from "./asset_godot_project_file"
import { TsGdJson } from "./tsgd_json"

// TODO: Instead of manually scanning to find all assets, i could just import
// all godot files, and then parse them for all their asset types. It would
// probably be easier to find the tscn and tres files.

export class TsGdProjectClass {
  /** Path to the tsgd.json file. */
  static tsgdPath: string

  /** Parsed tsgd.json file. */
  tsgdJson: TsGdJson

  /** Parsed project.godot file. */
  godotProject!: AssetGodotProjectFile

  /** Info about each source file. */
  sourceFiles: AssetSourceFile[] = []

  /** Info about each Godot class. */
  godotClasses: AssetGodotClass[] = []

  /** Info about each Godot scene. */
  godotScenes: AssetGodotScene[] = []

  /** Info about each Godot font. */
  godotFonts: AssetFont[] = []

  constructor(
    tsgdPath: string,
    watcher: chokidar.FSWatcher,
    initialFilePaths: string[]
  ) {
    // Initial set up

    TsGdProjectClass.tsgdPath = tsgdPath
    this.tsgdJson = new TsGdJson()

    // Parse assets

    const initialAssets = initialFilePaths.map((path) => this.getAsset(path))

    for (const asset of initialAssets) {
      if (asset instanceof AssetGodotProjectFile) {
        this.godotProject = asset
      } else if (asset instanceof AssetSourceFile) {
        this.sourceFiles.push(asset)
      } else if (asset instanceof AssetGodotClass) {
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

    this.monitor(watcher)
  }

  getAsset(path: string) {
    if (path.endsWith(".ts")) {
      return new AssetSourceFile(path, this)
    } else if (path.endsWith(".gd")) {
      return new AssetGodotClass(path, this)
    } else if (path.endsWith(".tscn")) {
      return new AssetGodotScene(path, this)
    } else if (path.endsWith(".godot")) {
      return new AssetGodotProjectFile(path)
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
      .on("change", (path) => console.log("added", path))
      .on("unlink", (path) => console.log("deleted", path))
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

export const makeTsGdProject = async (tsgdPath: string) => {
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

  return new TsGdProjectClass(tsgdPath, watcher, initialFiles)
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

  if (path.endsWith(".ts")) {
    return true
  }

  // Note ordering (re: .ts)
  if (path.endsWith(".d.ts")) {
    return false
  }

  if (path.endsWith(".tscn")) {
    return true
  }

  if (path.endsWith(".godot")) {
    return true
  }

  return false
}
