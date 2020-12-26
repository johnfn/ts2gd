// TODO: Remove TsGdProject; SourceFile
// TODO: refactor resPath and tsPath and etc

// TODO: change_scene should accept a AssetPath filtered on tscn
// TODO: Move get/set to the same hoisting thing - and then classes - and then functions.
// TODO: Modulo expects int instead of float and will error if it sees the wrong one...
// TODO: sanitize variable and function name generation
// TODO: There's a bug where cleaning up self. can cause variable name collisions.
// TODO: Clean up TS errors and output - only output if something is
// seriously wrong!
// TODO: this.blah.add() doesnt parse right
// TODO: Because I consider Dictionary = {}, it considers everything
// to be a Dictionary... even Node2D
// TODO: SUbtracting vectors gives a number for some reason
// TODO: Workout SpontaneousDialog.instance()
// TODO: Handle the case when a class exists in multiple scenes - probably just error at this point.
// TODO: Mark things as onready with @onready

// TODO: You can have _ready() and constructor
// TODO: _prefixed names could possibly clash
// TODO: Discarded return values from function calls?
// TODO: The whole Class() thing is clearly possible - see String() for
//       an example!
// TODO: I don't know how to do { [key: Vector2]: value }. except maybe not
//       using {}, which is kind of lame.
// TODO: Node2D has a size() property.
// TODO: tile_get_shapes is any[] when it shouldn't be
// TODO: Use chokidar rather than my ... thing.
// TODO: Labeled break??? See SpontaneousDialog.ts say() for an example
// TODO: Use AST transformers?

import ts from "typescript"
import fs from "fs"
import path from "path"

import * as process from "process"
import { generateGodotLibraryDefinitions } from "./generate_library"
import { parseNode } from "./parse_node"
import { buildNodePathsTypeForScript } from "./build_paths_for_node"
import { buildSceneImports } from "./build_scene_imports"
import { makeTsGdProject, TsGdProjectClass } from "./project/project"
import { AssetSourceFile } from "./project/asset_source_file"

let verbose = false
const inputPath = process.argv[2]
let tsgdPathWithFilename: string
let project: TsGdProjectClass // needs to be initialized async

if (!inputPath) {
  console.error("Please specify a tsgd.json file on the command line. Thanks!")
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

const configPath = ts.findConfigFile(
  path.dirname(tsgdPathWithFilename),
  ts.sys.fileExists,
  "tsconfig.json"
)

if (!configPath) {
  console.error(
    "tsconfig.json must be in the same folder as tsgd.json. Thanks!"
  )
  process.exit(0)
}

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  const errorMessage = ts.flattenDiagnosticMessageText(
    diagnostic.messageText,
    formatHost.getNewLine()
  )

  // Quiet the errors which are not really errors.

  if (
    errorMessage.match(
      /Operator '[+\-*/]=?' cannot be applied to types 'Vector[23]' and '(Vector[23]|number)'/
    )
  ) {
    return
  }

  if (
    errorMessage.match(
      /The left-hand side of an 'in' expression must be of type/
    )
  ) {
    return
  }

  // console.error("Error", diagnostic.code, ":", errorMessage);
  // console.log(diagnostic.file?.fileName, diagnostic.start);
}

export let program: ts.Program

const host = ts.createWatchCompilerHost(
  configPath,
  {},
  ts.sys,
  ts.createEmitAndSemanticDiagnosticsBuilderProgram,
  reportDiagnostic,
  reportWatchStatusChanged
)
const watchProgram = ts.createWatchProgram(host)
program = watchProgram.getProgram().getProgram() // This API i tell you...
const configFile = ts.readJsonConfigFile(configPath, ts.sys.readFile)
const opt = ts.parseConfigFileTextToJson(configPath, configFile.text)

opt.config.useCaseSensitiveFileNames = false

function reportWatchStatusChanged(diagnostic: ts.Diagnostic, newLine: string) {
  if (!program) {
    return
  }

  const sourcePath = diagnostic.file?.fileName

  if (sourcePath && !sourcePath.endsWith(".d.ts") && project) {
    compile(
      project.sourceFiles.find((file) => file.tsFullPath === sourcePath)!,
      project
    )
  }
}

function compile(sourceFile: AssetSourceFile, project: TsGdProjectClass): void {
  const source = watchProgram.getProgram().getSourceFile(sourceFile.tsFullPath)

  if (!source) {
    console.error("invalid path to source file!")
    process.exit()
  }

  let id = 0
  const genUniqueName = () => `func${++id}`

  const result = parseNode(source, {
    indent: "",
    isConstructor: false,
    genUniqueName,
    project,
    mostRecentControlStructureIsSwitch: false,
    isAutoload: false,
    program: program,
    usages: new Map(),
  })

  fs.mkdirSync(path.dirname(sourceFile.fsPath), { recursive: true })
  fs.writeFileSync(sourceFile.fsPath, result.content)

  for (const { content, name } of result.enums ?? []) {
    fs.writeFileSync(sourceFile.getEnumPath(name), content)
  }

  if (verbose) console.log("[write]:", sourceFile.fsPath)
}

async function* walkCo(
  dir: string
): AsyncGenerator<string, undefined, undefined> {
  for await (const entry of await fs.promises.opendir(dir)) {
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      yield* walkCo(entryPath)
    } else if (entry.isFile()) {
      yield entryPath
    }
  }

  return
}

async function walk(dir: string): Promise<string[]> {
  const result: string[] = []

  for await (const f of walkCo(dir)) {
    result.push(f)
  }

  return result
}

async function buildAssetPathsType(project: TsGdProjectClass) {
  const assetFileContents = `
declare type AssetType = {
${project.assets
  .map((obj) => `  '${obj.resPath}': ${obj.tsImportName()}`)
  .join(",\n")}
}

declare type AssetPath = keyof AssetType;
  `

  const destPath = path.join(project.godotDefsPath, "@asset_paths.d.ts")
  fs.writeFileSync(destPath, assetFileContents)
}

export type ParsedSourceFile = {
  /** Path like res://src/MyFile.gd */
  resPath: string

  /** Path like /Users/johnfn/MyGame/src/file.gd */
  gdPath: string

  /** Name of the class declared in the source file */
  className: string

  /** Path like /Users/johnfn/MyGame/src/file.ts */
  tsFullPath: string

  /** Path like src/file.ts, relative to tsgd.json */
  tsRelativePath: string

  /** Unused? */
  tsFileContent: string

  /** Is this an autoload class? */
  isAutoload: boolean
}

const main = async () => {
  let project = await makeTsGdProject()

  const start = new Date().getTime()

  // project = await getProjectProperties()

  buildAssetPathsType(project)

  for (const script of project.sourceFiles) {
    buildNodePathsTypeForScript(script, project)
  }

  buildSceneImports(project)
  generateGodotLibraryDefinitions(project)

  for (const sourceFile of project.sourceFiles) {
    compile(sourceFile, project)

    fs.watchFile(
      sourceFile.tsFullPath,
      { persistent: true, interval: 250 },
      (curr, prev) => {
        if (+curr.mtime <= +prev.mtime) {
          return
        }

        const compileTs = new Date().getTime()

        compile(sourceFile, project)

        console.log(
          `Compiled ${sourceFile.tsRelativePath} in`,
          (new Date().getTime() - compileTs) / 1000 + "s"
        )
      }
    )
  }

  console.log(
    "Initial compilation complete in",
    (new Date().getTime() - start) / 1000 + "s"
  )
}

main()
