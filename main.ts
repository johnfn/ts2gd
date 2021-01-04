// TODO: refactor resPath and tsPath and etc
// TODO: it's hard to compile ++/-- properly.
// TODO: Resolve node paths even through instances.
// TODO: Inline gdscript

// TODO: "collision/safe_margin"
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
// TODO: Labeled break??? See SpontaneousDialog.ts say() for an example
// TODO: Use AST transformers?

import ts from "typescript"
import path from "path"
import * as process from "process"

import { makeTsGdProject } from "./project/project"

const setup = () => {
  const inputPath = process.argv[2]
  let tsgdPathWithFilename: string

  if (!inputPath) {
    throw new Error(
      "Please specify a tsgd.json file on the command line. Thanks!"
    )
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
  }

  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    ts.createEmitAndSemanticDiagnosticsBuilderProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  )
  const watchProgram = ts.createWatchProgram(host)
  const configFile = ts.readJsonConfigFile(configPath, ts.sys.readFile)
  const opt = ts.parseConfigFileTextToJson(configPath, configFile.text)
  opt.config.useCaseSensitiveFileNames = false

  function reportWatchStatusChanged(
    diagnostic: ts.Diagnostic,
    newLine: string
  ) {}

  return watchProgram
}

const main = async () => {
  const start = new Date().getTime()

  const watchProgram = setup()

  let project = await makeTsGdProject(watchProgram)

  project.buildAllDefinitions()
  project.compileAllSourceFiles()

  console.log(
    "Initial compilation complete in",
    (new Date().getTime() - start) / 1000 + "s"
  )
}

if (process.argv[1] === "main.ts") {
  main()
}
