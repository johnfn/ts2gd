import chokidar from "chokidar"
import path from "path"
import ts from "typescript"
import chalk from "chalk"
import fs from "fs"

import { GodotProjectFile } from "./godot_project_file"
import { Paths } from "./tsgd_json"
import { generateGodotLibraryDefinitions as buildLibraryDefinitions } from "../generate_library_defs/generate_library"
import { ParsedArgs } from "../parse_args"
import { buildActionNames } from "./generate_dynamic_defs/build_action_names"
import { buildAssetPathsType } from "./generate_dynamic_defs/build_asset_paths"
import { buildGroupTypes } from "./generate_dynamic_defs/build_group_types"
import { buildNodePathsTypeForScript } from "./generate_dynamic_defs/build_node_paths"
import { buildSceneImports } from "./generate_dynamic_defs/build_scene_imports"
import { AssetFont } from "./assets/asset_font"
import { AssetGlb } from "./assets/asset_glb"
import { AssetGodotScene } from "./assets/asset_godot_scene"
import { AssetImage } from "./assets/asset_image"
import { AssetSourceFile } from "./assets/asset_source_file"
import { BaseAsset } from "./assets/base_asset"
import { displayErrors, TsGdError, TsGdReturn } from "../errors"

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

  /** Each source file. */
  sourceFiles(): AssetSourceFile[] {
    return this.assets.filter(
      (a): a is AssetSourceFile => a instanceof AssetSourceFile
    )
  }

  /** Each Godot scene. */
  godotScenes(): AssetGodotScene[] {
    return this.assets.filter(
      (a): a is AssetGodotScene => a instanceof AssetGodotScene
    )
  }

  /** Each Godot font. */
  godotFonts(): AssetFont[] {
    return this.assets.filter((a): a is AssetFont => a instanceof AssetFont)
  }

  /** Each .glb file. */
  godotGlbs(): AssetGlb[] {
    return this.assets.filter((a): a is AssetGlb => a instanceof AssetGlb)
  }

  /** Each Godot image. */
  godotImages(): AssetImage[] {
    return this.assets.filter((a): a is AssetImage => a instanceof AssetImage)
  }

  mainScene: AssetGodotScene

  program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>

  args: ParsedArgs

  constructor(
    watcher: chokidar.FSWatcher,
    initialFilePaths: string[],
    program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>,
    ts2gdJson: Paths,
    args: ParsedArgs
  ) {
    // Initial set up

    this.args = args
    TsGdProjectClass.Paths = ts2gdJson
    this.program = program

    // Parse assets

    const projectGodot = initialFilePaths.filter((path) =>
      path.includes("project.godot")
    )[0]

    this.godotProject = this.createAsset(projectGodot)! as GodotProjectFile

    const initialAssets = initialFilePaths.map((path) => this.createAsset(path))

    for (const asset of initialAssets) {
      if (asset === null) {
        continue
      }

      if (asset instanceof BaseAsset) {
        console.log("initial asset", asset.fsPath)
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
    | AssetGodotScene
    | AssetFont
    | AssetImage
    | GodotProjectFile
    | AssetGlb
    | null {
    if (path.endsWith(".ts")) {
      return new AssetSourceFile(path, this)
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
      .on("add", async (path) => {
        const result = await this.onAddAsset(path)

        displayErrors(result.errors ?? [])
      })
      .on("change", async (path) => {
        const result = await this.onChangeAsset(path)

        displayErrors(result.errors ?? [])
      })
      .on("unlink", (path) => this.onRemoveAsset(path))
  }

  async onAddAsset(path: string): Promise<TsGdReturn<null>> {
    let result: TsGdReturn<null> = { result: null }

    const newAsset = this.createAsset(path)

    // Do this first because some assets expect themselves to exist - e.g.
    // an enum inside a source file expects that source file to exist.
    if (newAsset instanceof BaseAsset) {
      console.log("add", newAsset)

      this.assets.push(newAsset)
    }

    if (newAsset instanceof AssetSourceFile) {
      result = await newAsset.compile(this.program)
    } else if (newAsset instanceof AssetGodotScene) {
      buildSceneImports(this)
      buildGroupTypes(this)
    }

    buildAssetPathsType(this)

    return result
  }

  async onChangeAsset(path: string): Promise<TsGdReturn<null>> {
    let start = new Date().getTime()
    let showTime = false
    let result = {
      result: null,
      errors: [] as TsGdError[],
    }

    // Just noisy, since it's not caused by a user action
    if (!path.endsWith(".d.ts")) {
      if (!this.args.debug) console.clear()

      if (path.endsWith(".ts")) {
        console.info("Compile:", chalk.blueBright(path))

        showTime = true
      } else {
        console.info("Change:", chalk.blueBright(path))
      }
    }

    if (path.endsWith(".godot")) {
      const oldProjectFile = this.godotProject

      this.godotProject = new GodotProjectFile(path, this)

      const oldAutoloads = oldProjectFile.autoloads
      const newAutoloads = this.godotProject.autoloads
      const allAutoloads = [...oldAutoloads, ...newAutoloads]

      for (const { resPath } of allAutoloads) {
        const script = this.sourceFiles().find((sf) => sf.resPath === resPath)

        if (script) {
          const compileResult = await script.compile(this.program)

          result.errors = [...result.errors, ...(compileResult.errors ?? [])]
        }
      }

      return result
    }

    let oldAsset = this.assets.find((asset) => asset.fsPath === path)

    if (oldAsset) {
      let newAsset = (this.createAsset(path) as any) as BaseAsset
      this.assets = this.assets.filter((a) => a.fsPath !== path)
      this.assets.push(newAsset)

      if (newAsset instanceof AssetSourceFile) {
        const compileResult = await newAsset.compile(this.program)

        result.errors = [...result.errors, ...(compileResult.errors ?? [])]

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

    return result
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

    this.assets = this.assets.filter((asset) => asset !== changedAsset)
  }

  async compileAllSourceFiles() {
    const assetsToCompile = this.assets.filter(
      (a): a is AssetSourceFile => a instanceof AssetSourceFile
    )
    const result = await Promise.all(
      assetsToCompile.map((asset) => asset.compile(this.program))
    )
    const errors = result.flatMap(
      (compiledSourceFile) => compiledSourceFile.errors ?? []
    )

    if (errors.length === 0) {
      console.log("No errors in project.")
    } else {
      displayErrors(errors)
    }
  }

  shouldBuildLibraryDefinitions(flags: ParsedArgs) {
    if (flags.buildLibraries) {
      return true
    }

    if (!fs.existsSync(TsGdProjectClass.Paths.staticGodotDefsPath)) {
      return true
    }

    if (!fs.existsSync(TsGdProjectClass.Paths.dynamicGodotDefsPath)) {
      return true
    }

    return false
  }

  async buildDynamicDefinitions() {
    buildAssetPathsType(this)

    for (const script of this.sourceFiles()) {
      buildNodePathsTypeForScript(script, this)
    }

    buildSceneImports(this)
    buildGroupTypes(this)
    buildActionNames(this)
  }

  async buildLibraryDefinitions() {
    await buildLibraryDefinitions()
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

  /**
   * Returns any errors encountered while validating autoload classes
   */
  validateAutoloads(): TsGdError[] {
    return this.sourceFiles()
      .map((sf) => sf.getAutoloadValidationErrors())
      .filter((f): f is TsGdError => f !== null)
  }
}

export const makeTsGdProject = async (
  ts2gdJson: Paths,
  program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>,
  args: ParsedArgs
) => {
  const initialFiles: string[] = []

  let addFn!: (path: string) => void
  let readyFn!: () => void

  const watcher = await new Promise<chokidar.FSWatcher>((resolve) => {
    addFn = (path) => initialFiles.push(path)
    readyFn = () => resolve(watcher)

    const watcher: chokidar.FSWatcher = chokidar
      .watch(ts2gdJson.rootPath, {
        ignored: (path: string, stats: any) => {
          return !shouldIncludePath(path)
        },
      })
      .on("add", addFn)
      .on("ready", readyFn)
  })

  watcher.off("add", addFn)
  watcher.off("ready", readyFn)

  return new TsGdProjectClass(watcher, initialFiles, program, ts2gdJson, args)
}

const shouldIncludePath = (path: string): boolean => {
  if (path.includes("node_modules")) {
    return false
  }

  if (path.includes(".git")) {
    return false
  }

  if (path.endsWith(".gd")) {
    return false
  }

  if (!path.includes(".")) {
    // Folder (I hope)
    // TODO: Might be able to check stat to be more sure about this
    return true
  }

  if (path.includes("_godot_defs")) {
    return false
  }

  if (AssetFont.extensions().some((ext) => path.endsWith(ext))) {
    return true
  }

  if (AssetImage.extensions().some((ext) => path.endsWith(ext))) {
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
