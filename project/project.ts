import chokidar from "chokidar"
import path from "path"
import ts from "typescript"
import chalk from "chalk"

import { AssetGodotClass as GodotFile } from "./asset_godot_class"
import { AssetGodotScene } from "./asset_godot_scene"
import { AssetFont } from "./asset_font"
import { AssetSourceFile } from "./asset_source_file"
import { GodotProjectFile } from "./godot_project_file"
import { Paths } from "./tsgd_json"
import { BaseAsset } from "./base_asset"
import { buildNodePathsTypeForScript } from "../build_paths_for_node"
import { buildSceneImports } from "../build_scene_imports"
import { generateGodotLibraryDefinitions } from "../generate_library"
import { buildAssetPathsType } from "../build_asset_paths"
import { buildGroupTypes } from "../build_group_types"
import { buildActionNames } from "../build_action_names"
import { AssetImage } from "./asset_image"
import { AssetGlb } from "./asset_glb"

// TODO: Instead of manually scanning to find all assets, i could just import
// all godot files, and then parse them for all their asset types. It would
// probably be easier to find the tscn and tres files.

export class TsGdProjectClass {
  /** Parsed tsgd.json file. */
  static Paths: Paths

  /** Master list of all Godot assets */
  assets: BaseAsset[] = []

  /** Parsed project.godot file. */
  godotProject!: GodotProjectFile

  /** Info about each source file. */
  sourceFiles(): AssetSourceFile[] {
    return this.assets.filter(
      (a): a is AssetSourceFile => a instanceof AssetSourceFile
    )
  }

  /** Info about each Godot class. */
  godotClasses(): GodotFile[] {
    return this.assets.filter((a): a is GodotFile => a instanceof GodotFile)
  }

  /** Info about each Godot scene. */
  godotScenes(): AssetGodotScene[] {
    return this.assets.filter(
      (a): a is AssetGodotScene => a instanceof AssetGodotScene
    )
  }

  /** Info about each Godot font. */
  godotFonts(): AssetFont[] {
    return this.assets.filter((a): a is AssetFont => a instanceof AssetFont)
  }

  /** Info about each .glb file. */
  godotGlbs(): AssetGlb[] {
    return this.assets.filter((a): a is AssetGlb => a instanceof AssetGlb)
  }

  /** Info about each Godot image. */
  godotImages(): AssetImage[] {
    return this.assets.filter((a): a is AssetImage => a instanceof AssetImage)
  }

  mainScene: AssetGodotScene

  program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>

  constructor(
    watcher: chokidar.FSWatcher,
    initialFilePaths: string[],
    program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>,
    ts2gdJson: Paths
  ) {
    // Initial set up

    TsGdProjectClass.Paths = ts2gdJson
    this.program = program

    // Parse assets

    const initialAssets = initialFilePaths.map((path) => this.createAsset(path))

    for (const asset of initialAssets) {
      if (asset === null) {
        continue
      }

      if (asset instanceof BaseAsset) {
        this.assets.push(asset)
      }

      if (asset instanceof GodotProjectFile) {
        this.godotProject = asset
      }
    }

    this.mainScene = this.godotScenes().find(
      (scene) => scene.resPath === this.godotProject.mainScene().resPath
    )!

    this.monitor(watcher)
  }

  createAsset(
    path: string
  ):
    | AssetSourceFile
    | GodotFile
    | AssetGodotScene
    | AssetFont
    | AssetImage
    | GodotProjectFile
    | AssetGlb
    | null {
    if (path.endsWith(".ts")) {
      return new AssetSourceFile(path, this)
    } else if (path.endsWith(".gd")) {
      return new GodotFile(path, this)
    } else if (path.endsWith(".tscn")) {
      return new AssetGodotScene(path, this)
    } else if (path.endsWith(".godot")) {
      return new GodotProjectFile(path, this)
    } else if (path.endsWith(".ttf")) {
      return new AssetFont(path, this)
    } else if (path.endsWith(".glb")) {
      return new AssetGlb(path, this)
    } else if (
      path.endsWith(".png") ||
      path.endsWith(".gif") ||
      path.endsWith(".bmp") ||
      path.endsWith(".jpg")
    ) {
      return new AssetImage(path, this)
    }

    console.log(`unhandled asset type ${path}`)

    return null
  }

  monitor(watcher: chokidar.FSWatcher) {
    watcher
      .on("add", (path) => this.onAddAsset(path))
      .on("change", (path) => this.onChangeAsset(path))
      .on("unlink", (path) => this.onRemoveAsset(path))
  }

  onAddAsset(path: string) {
    const newAsset = this.createAsset(path)

    if (newAsset instanceof AssetSourceFile) {
      newAsset.compile(this.program)
    } else if (newAsset instanceof AssetGodotScene) {
      buildSceneImports(this)
      buildGroupTypes(this)
    }

    buildAssetPathsType(this)

    if (newAsset instanceof BaseAsset) {
      this.assets.push(newAsset)
    }
  }

  onChangeAsset(path: string) {
    let start = new Date().getTime()
    let showTime = false

    // Just noisy, since it's not caused by a user action
    if (!path.endsWith(".gd") && !path.endsWith(".d.ts")) {
      console.clear()

      if (path.endsWith(".ts")) {
        console.info("Compile:", chalk.blueBright(path))

        showTime = true
      } else {
        console.info("Change:", chalk.blueBright(path))
      }
    }

    let oldAsset = this.assets.find((asset) => asset.fsPath === path)

    if (oldAsset) {
      let newAsset = (this.createAsset(path) as any) as BaseAsset
      this.assets = this.assets.filter((a) => a.fsPath !== path)
      this.assets.push(newAsset)

      if (newAsset instanceof AssetSourceFile) {
        newAsset.compile(this.program)

        buildAssetPathsType(this)
        buildNodePathsTypeForScript(newAsset, this)
      } else if (newAsset instanceof AssetGodotScene) {
        for (const script of this.sourceFiles()) {
          buildNodePathsTypeForScript(script, this)
        }

        buildSceneImports(this)
      }
    }

    if (showTime) {
      console.info()
      console.info("Done in", (new Date().getTime() - start) / 1000 + "s")
    }
  }

  onRemoveAsset(path: string) {
    console.info("Delete:\t", path)

    const changedAsset = this.assets.find((asset) => asset.fsPath === path)

    if (!changedAsset) {
      return
    }

    if (changedAsset instanceof AssetSourceFile) {
      changedAsset.destroy()
    }
  }

  compileAllSourceFiles() {
    for (const asset of this.assets) {
      if (asset instanceof AssetSourceFile) {
        asset.compile(this.program)
      }
    }
  }

  async buildAllDefinitions() {
    await generateGodotLibraryDefinitions(this)
    buildAssetPathsType(this)

    for (const script of this.sourceFiles()) {
      buildNodePathsTypeForScript(script, this)
    }

    buildSceneImports(this)
    buildGroupTypes(this)
    buildActionNames(this)
  }

  static ResPathToFsPath(resPath: string) {
    return path.join(
      TsGdProjectClass.Paths.rootPath,
      resPath.slice("res://".length)
    )
  }

  static FsPathToResPath(fsPath: string) {
    return "res://" + fsPath.slice(TsGdProjectClass.Paths.rootPath.length + 1)
  }
}

export const makeTsGdProject = async (
  ts2gdJson: Paths,
  program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>
) => {
  const initialFiles: string[] = []

  let addFn!: (path: string) => void
  let readyFn!: () => void

  console.log("start")
  const watcher = await new Promise<chokidar.FSWatcher>((resolve) => {
    addFn = (path) => initialFiles.push(path)
    readyFn = () => resolve(watcher)

    console.log(initialFiles)

    const watcher: chokidar.FSWatcher = chokidar
      .watch(ts2gdJson.rootPath, {
        ignored: (path: string, stats: any) => {
          return !shouldIncludePath(path)
        },
      })
      .on("add", addFn)
      .on("ready", readyFn)
  })
  console.log("end")

  watcher.off("add", addFn)
  watcher.off("ready", readyFn)

  return new TsGdProjectClass(watcher, initialFiles, program, ts2gdJson)
}

const shouldIncludePath = (path: string): boolean => {
  if (path.includes("node_modules")) {
    return false
  }

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

  if (AssetFont.extensions().some((ext) => path.endsWith(ext))) {
    return true
  }

  if (AssetImage.extensions().some((ext) => path.endsWith(ext))) {
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

  if (AssetGodotScene.extensions().some((ext) => path.endsWith(ext))) {
    return true
  }

  if (AssetGlb.extensions().some((ext) => path.endsWith(ext))) {
    return true
  }

  if (path.endsWith(".godot")) {
    return true
  }

  return false
}
