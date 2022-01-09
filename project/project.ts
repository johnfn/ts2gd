import fs from "fs"
import path from "path"

import _ from "lodash"
import chalk from "chalk"
import chokidar from "chokidar"
import ts, { parseJsonText } from "typescript"

import LibraryBuilder from "../generate_library_defs"
import { ParsedArgs } from "../parse_args"

import Errors, { TsGdError } from "./errors"
import {
  AssetBase,
  AssetGodotProjectFile,
  AssetFont,
  AssetGlb,
  AssetGodotScene,
  AssetImage,
  AssetSourceFile,
  AssetConstructor,
} from "./assets"
import { Paths } from "./paths"
import DefinitionBuilder from "./generate_dynamic_defs"

// not static to wait for module load
const AssetLookup = _.memoize(() =>
  [
    AssetFont,
    AssetGlb,
    AssetGodotProjectFile,
    AssetGodotScene,
    AssetImage,
    AssetSourceFile,
  ].reduce((acc, current) => {
    current.extensions.forEach((ext) => acc.set(ext, current))
    return acc
  }, new Map<string, AssetConstructor<AssetSourceFile | AssetGodotScene | AssetGodotProjectFile | AssetFont | AssetGlb | AssetImage>>())
)

// TODO: Instead of manually scanning to find all assets, i could just import
// all godot files, and then parse them for all their asset types. It would
// probably be easier to find the tscn and tres files.

export class TsGdProject {
  /** Parsed tsgd.json file. */
  readonly paths: Paths

  /** Master list of all Godot assets */
  assets: AssetBase[] = []

  /** Parsed project.godot file. */
  godotProject: AssetGodotProjectFile

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

  //program: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>
  program: ts.Program

  public readonly args: ParsedArgs

  public readonly definitionBuilder: DefinitionBuilder

  public readonly errors: Errors

  constructor(options: {
    watcher?: chokidar.FSWatcher
    initialFilePaths: string[]
    program: ts.Program
    ts2gdJson: Paths
    args: ParsedArgs
  }) {
    // Initial set up

    this.args = options.args
    this.paths = options.ts2gdJson
    this.program = options.program

    this.errors = new Errors(this.args)

    this.definitionBuilder = new DefinitionBuilder(this)

    // Parse assets

    const [projectFilePaths, otherAssetPaths] = _.partition(
      options.initialFilePaths,
      (path) => path.includes("project.godot")
    )

    if (projectFilePaths.length !== 1) {
      throw new Error(
        `Need exactly one project.godot file, but found ${projectFilePaths.length}!`
      )
    } else {
      const project = this.createGodotProject(projectFilePaths[0])
      if (project) {
        this.godotProject = project
      } else {
        throw new Error(
          `Couldn't parse godot project from ${projectFilePaths[0]}`
        )
      }
    }

    this.assets = _.compact(
      otherAssetPaths.map((path) => this.createAsset(path))
    )

    const mainScene = this.godotScenes().find(
      (scene) => scene.resPath === this.godotProject.mainScene().resPath
    )

    if (!mainScene) {
      throw new Error("Main scene not found, check your Godot project!")
    }

    this.mainScene = mainScene

    this.monitor(options.watcher)
  }

  createGodotProject(path: string): AssetGodotProjectFile | null {
    if (path.endsWith(".godot")) {
      return new AssetGodotProjectFile(path, this)
    }

    console.error(`unhandled asset type ${path}`)
    return null
  }

  createAsset(fsPath: string) {
    const ext = path.extname(fsPath)
    const constructor = AssetLookup().get(ext)
    if (constructor) {
      return new constructor(fsPath, this)
    }

    console.error(`unhandled asset type ${fsPath}`)
    return null
  }

  monitor(watcher?: chokidar.FSWatcher) {
    watcher
      ?.on("add", async (path) => {
        const message = await this.onAddAsset(path)

        this.errors.display(message)
      })
      .on("change", async (path) => {
        const message = await this.onChangeAsset(path)

        this.errors.display(message)
      })
      .on("unlink", async (path) => {
        await this.onRemoveAsset(path)
      })
  }

  async onAddAsset(path: string): Promise<string> {
    const newAsset = this.createAsset(path)

    // Do this first because some assets expect themselves to exist - e.g.
    // an enum inside a source file expects that source file to exist.
    if (newAsset instanceof AssetBase) {
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

      this.godotProject = new AssetGodotProjectFile(path, this)

      const oldAutoloads = oldProjectFile.autoloads
      const newAutoloads = this.godotProject.autoloads
      const allAutoloads = [...oldAutoloads, ...newAutoloads]

      for (const { resPath } of allAutoloads) {
        const script = this.sourceFiles().find((sf) => sf.resPath === resPath)

        if (script) {
          await script.compile(this.program)
        }
      }
    } else {
      let oldAsset = this.assets.find((asset) => asset.fsPath === path)

      if (oldAsset) {
        let newAsset = this.createAsset(path) as any as AssetBase
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
    return !this.errors.display("Compiling all source files...")
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
  program: ts.Program,
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

  return new TsGdProject({
    watcher,
    initialFilePaths: initialFiles,
    program,
    ts2gdJson,
    args,
  })
}

export default TsGdProject
