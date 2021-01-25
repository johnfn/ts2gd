#!/usr/bin/env ts-node

// TODO: Rename "@globals" to globals or something
//   There is a clash betweeh us using @ to mean "generated d.ts based on project"
//   and Godot's somewhat-random use of @
// TODO: new assets aren't immediately imported.
// TODO: `load` is a godot keyword
// TODO: clash between this.foo and foo() since this is removed by godot
// TODO: ": float" in parameters is not respected
// TODO: we need to clean up old node_paths when we delete or rename a class.
// TODO: template strings
// TODO: str()
// TODO: Godot globals
// TODO: For autoload classes, create the global variable implicitly ? is this possible?  (b/c namespace problems)
// TODO: For autoload classes, marking them would then update the config file
//         - this would require being able to save back config files accurately.

// TODO: new Thing() should find the appropriate scene to initialize if there is one.
// TODO: new Something() should compile into Something.new() if possible!
// TODO: "a" + 1 doesnt work but prob should
// TODO: this.collision.connect("mouseexit", this, () => {})
// TODO: refactor resPath and tsPath and etc
// TODO: Find most commonly used godot functions etc and see if we can do anything w them.
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
import * as process from "process"

import { makeTsGdProject } from "./project/project"
import { Paths } from "./project/tsgd_json"

const setup = () => {
  const tsgdJson = new Paths()

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

  const onTsUpdate = {
    resolve: () => {},
  }

  const reportWatchStatusChanged = (
    diagnostic: ts.Diagnostic,
    newLine: string
  ) => {
    onTsUpdate.resolve()
  }

  const host = ts.createWatchCompilerHost(
    tsgdJson.tsconfigPath,
    {},
    ts.sys,
    ts.createEmitAndSemanticDiagnosticsBuilderProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  )
  const watchProgram = ts.createWatchProgram(host)
  const configFile = ts.readJsonConfigFile(
    tsgdJson.tsconfigPath,
    ts.sys.readFile
  )
  const opt = ts.parseConfigFileTextToJson(
    tsgdJson.tsconfigPath,
    configFile.text
  )
  opt.config.useCaseSensitiveFileNames = false

  return {
    watchProgram,
    tsgdJson,
    reportWatchStatusChanged,
    onTsUpdate,
  }
}

const main = async () => {
  const start = new Date().getTime()

  const { watchProgram, tsgdJson, onTsUpdate } = setup()

  let project = await makeTsGdProject(tsgdJson, watchProgram)

  await project.buildAllDefinitions()

  // This resolves a race condition where TS would not be aware of all the files
  // we just saved in buildAllDefinitions().
  await Promise.race([
    new Promise<void>((resolve) => setTimeout(resolve, 500)),
    new Promise<void>((resolve) => {
      onTsUpdate.resolve = resolve
    }),
  ])

  project.compileAllSourceFiles()

  console.info(
    "Initial compilation complete in",
    (new Date().getTime() - start) / 1000 + "s"
  )
}

if (!process.argv[1].includes("test")) {
  main()
}
