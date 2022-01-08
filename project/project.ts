import fs from "fs"
import path from "path"

import chalk from "chalk"
import chokidar from "chokidar"
import ts from "typescript"

import LibraryBuilder from "../generate_library_defs"
import { ParsedArgs } from "../parse_args"
import { displayErrors, TsGdError } from "../errors"

import { GodotProjectFile } from "./godot_project_file"
import { Paths } from "./paths"
import { AssetFont } from "./assets/asset_font"
import { AssetGlb } from "./assets/asset_glb"
import { AssetGodotScene } from "./assets/asset_godot_scene"
import { AssetImage } from "./assets/asset_image"
import { AssetSourceFile } from "./assets/asset_source_file"
import { BaseAsset } from "./assets/base_asset"
import DefinitionBuilder from "./generate_dynamic_defs"

// TODO: Instead of manually scanning to find all assets, i could just import
// all godot files, and then parse them for all their asset types. It would
// probably be easier to find the tscn and tres files.

export class TsGdProject {
  /** Parsed tsgd.json file. */
  readonly paths: Paths

  /** Master list of all Godot assets */
  assets: BaseAsset[] = []

  /** Parsed project.godot file. */
  godotProject: GodotProjectFile

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

  definitionBuilder = new DefinitionBuilder(this)

  constructor(
    watcher: chokidar.FSWatcher,
    initialFilePaths: string[],
    program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>,
    ts2gdJson: Paths,
    args: ParsedArgs
  ) {
    // Initial set up

    this.args = args
    this.paths = ts2gdJson
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
    //TODO: move these checks to the asset classes in static methods
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

    console.error(`unhandled asset type ${path}`)

    return null
  }

  monitor(watcher: chokidar.FSWatcher) {
    watcher
      .on("add", async (path) => {
        const message = await this.onAddAsset(path)

        displayErrors(this.args, message)
      })
      .on("change", async (path) => {
        const message = await this.onChangeAsset(path)

        displayErrors(this.args, message)
      })
      .on("unlink", async (path) => {
        await this.onRemoveAsset(path)
      })
  }

  async onAddAsset(path: string): Promise<string> {
    const newAsset = this.createAsset(path)

    // Do this first because some assets expect themselves to exist - e.g.
    // an enum inside a source file expects that source file to exist.
    if (newAsset instanceof BaseAsset) {
      this.assets.push(newAsset)
    }

    if (newAsset instanceof AssetSourceFile) {
      await newAsset.compile(this.program)
    } else if (newAsset instanceof AssetGodotScene) {
      this.definitionBuilder.buildSceneImports()
      this.definitionBuilder.buildGroupTypes()
    }

    this.definitionBuilder.buildAssetPathsType()

    return `${chalk.whiteBright("Compile:")} ${chalk.blueBright(path)}...`
  }

  async onChangeAsset(path: string): Promise<string> {
    let start = new Date().getTime()
    let showTime = false
    let message = ""

    // Just noisy, since it's not caused by a user action
    if (!path.endsWith(".d.ts")) {
      if (!this.args.debug) console.clear()

      if (path.endsWith(".ts")) {
        message = `${chalk.whiteBright("Compile:")} ${chalk.blueBright(
          path
        )}...`

        console.info(message)

        showTime = true
      } else {
        message = `${chalk.whiteBright("Change:")} ${chalk.blueBright(path)}...`

        console.info(message)
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
          await script.compile(this.program)
        }
      }
    }

    let oldAsset = this.assets.find((asset) => asset.fsPath === path)

    if (oldAsset) {
      let newAsset = this.createAsset(path) as any as BaseAsset
      this.assets = this.assets.filter((a) => a.fsPath !== path)
      this.assets.push(newAsset)

      if (newAsset instanceof AssetSourceFile) {
        await newAsset.compile(this.program)

        this.definitionBuilder.buildAssetPathsType()
        this.definitionBuilder.buildNodePathsTypeForScript(newAsset)
      } else if (newAsset instanceof AssetGodotScene) {
        for (const script of this.sourceFiles()) {
          this.definitionBuilder.buildNodePathsTypeForScript(script)
        }

        this.definitionBuilder.buildSceneImports()
      }
    }

    if (showTime) {
      const time = (new Date().getTime() - start) / 1000

      message += ` Done in ${time}s`
    }

    return message
  }

  async onRemoveAsset(path: string) {
    console.info("Delete:\t", path)

    const changedAsset = this.assets.find((asset) => asset.fsPath === path)

    if (!changedAsset) {
      return
    }

    if (changedAsset instanceof AssetSourceFile) {
      await changedAsset.destroy()
    }

    this.assets = this.assets.filter((asset) => asset !== changedAsset)
  }

  /**
   * Compile all current source files
   * @returns false if the compilation had errors, true otherwise
   */
  async compileAllSourceFiles(): Promise<boolean> {
    const assetsToCompile = this.assets.filter(
      (a): a is AssetSourceFile => a instanceof AssetSourceFile
    )
    await Promise.all(
      assetsToCompile.map((asset) => asset.compile(this.program))
    )
    return !displayErrors(this.args, "Compiling all source files...")
  }

  shouldBuildLibraryDefinitions(flags: ParsedArgs) {
    if (flags.buildLibraries) {
      return true
    }

    if (!fs.existsSync(this.paths.staticGodotDefsPath)) {
      return true
    }

    if (!fs.existsSync(this.paths.dynamicGodotDefsPath)) {
      return true
    }

    return false
  }

  async buildDynamicDefinitions() {
    await this.definitionBuilder.buildProject(this.sourceFiles())
  }

  async buildLibraryDefinitions() {
    await new LibraryBuilder(this.paths).buildProject()
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
  const [watcher, initialFiles] = await new Promise<
    [chokidar.FSWatcher, string[]]
  >((resolve) => {
    const initialFiles: string[] = []
    const watcher = chokidar
      .watch(ts2gdJson.rootPath, {
        // build only needs to scan once and then can turn off
        persistent: !args.buildOnly,
        ignored: ts2gdJson.ignoredPaths(),
      })
      .on("add", (path) => initialFiles.push(path))
      .on("ready", () => {
        watcher.removeAllListeners()
        resolve([watcher, initialFiles])
      })
  })

  return new TsGdProject(watcher, initialFiles, program, ts2gdJson, args)
}

export default TsGdProject
