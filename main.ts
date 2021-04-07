#!/usr/bin/env ts-node

// HIGH

// * set up a local autobuilder to HTML5 so we can use liveshare

// Convert "throw new Error()" into a better failure

// Adding a new autoload updates project.godot, but doesn't
// recompile the files

// change_scene_to takes a PackedScene but since it's a <T> it's treated as an any.
// regenerate asset_paths on restart

/*
When deleting a scene:

/Users/johnfn/code/tsgd/ts2gd/project/asset_godot_scene.ts:154
    throw new Error("I dont know the type of that thing.")
          ^
Error: I dont know the type of that thing.
    at GodotNode.tsType (/Users/johnfn/code/tsgd/ts2gd/project/asset_godot_scene.ts:154:11)
    at Object.buildNodePathsTypeForScript (/Users/johnfn/code/tsgd/ts2gd/build_paths_for_node.ts:137:33)
    at TsGdProjectClass.onChangeAsset (/Users/johnfn/code/tsgd/ts2gd/project/project.ts:212:11)
    at FSWatcher.<anonymous> (/Users/johnfn/code/tsgd/ts2gd/project/project.ts:152:36)
    at FSWatcher.emit (node:events:376:20)
*/

/*
/Users/johnfn/code/tsgd/ts2gd/project/godot_parser.ts:77
    while (file[nextNonemptyIndex].trim() === "") {
                                   ^
TypeError: Cannot read property 'trim' of undefined
    at eof (/Users/johnfn/code/tsgd/ts2gd/project/godot_parser.ts:77:36)
    at Object.parseGodotConfigFile (/Users/johnfn/code/tsgd/ts2gd/project/godot
*/

// TODO: Better print() output, with spacing
// TODO: Document @exports

// have a way to compile all files, and collate all errors.

// TODO: parseGodotConfigFile() can fail if the config is in a bad state, e.g.
// merge conflicts. should just retry after a while.

// TODO: change_scene should autocomplete .tscn files only

// TODO: "cannot find module typescript"

// TODO: we need to clean up old node_paths when we delete or rename a class.

// TODO: Import constants from other files.
// TODO: Taking in funcrefs and calling them.
//   specifically for mapping over my 2d board.

// TODO: Godot doesnt allow shadowing tho TS does.
// TODO: Renaming files crashes when the previously named thing was imported somewhere.
// TODO: new assets aren't immediately imported.
// TODO: There are bugs when you have both a constructor and an _ready() method.
// TODO: this.collision.connect("mouseexit", this, () => {})
// TODO: Inline gdscript
// TODO: Resolve node paths even through instances.
// TODO: Fun idea: array[1-1] (or some other notation) could translate into slicing
//   Eh it wouldnt typecheck though...
//   Might be possible if an array had 2 index signatures and it was something like array["1:1"]

// MED

// Do I even handle nested folders?
// TODO: str() with no arguments is technically an error
// TODO: Add __filter and __map to symbol table
// TODO: new Thing() should find the appropriate scene to initialize if there is one.
// TODO: template strings
// TODO: change_scene should accept a AssetPath filtered on tscn
// TODO: parse_json return type.
// TODO: Why is car.tscn a Node, not a Spatial?
// TODO: Can prob autowrite "extends Object" if we dont write an explicit extends
// TODO: Labeled break??? See SpontaneousDialog.ts say() for an example
// TODO: better support for int and float types.
//   TODO: Modulo expects int instead of float and will error if it sees the wrong one...
// TODO: Rename "@globals" to globals or something
//   There is a clash betweeh us using @ to mean "generated d.ts based on project"
//   and Godot's somewhat-random use of @
// TODO: "a" + 1 doesnt work but prob should
// TODO: refactor resPath and tsPath and etc
// TODO: Find most commonly used godot functions etc and see if we can do anything w them.
// TODO: The whole Class() thing is clearly possible - see String() for
//       an example!
// TODO: SUbtracting vectors gives a number for some reason

// LOW

// TODO: Move get/set to the same hoisting thing - and then classes - and then functions.
// TODO: For autoload classes, marking them @autoload would then update the config file
//         - this would require being able to save back config files accurately.

import ts from "typescript"
import * as process from "process"

import packageJson from "./package.json"
import { makeTsGdProject } from "./project/project"
import { Paths } from "./project/tsgd_json"
import { checkVersionAsync } from "./check_version"
import { Flags, parseArgs, printHelp } from "./parse_args"
import chalk from "chalk"
import fs from "fs"
import { defaultTsconfig } from "./generators/generate_tsconfig"

const setup = () => {
  const tsgdJson = new Paths()

  const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: (path: string) => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
  }

  let tsUpdateResolve!: (value: void | PromiseLike<void>) => void

  const tsInitialLoad = new Promise<void>((resolve) => {
    tsUpdateResolve = resolve
  })

  let watchProgram: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>

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

  const reportWatchStatusChanged = (
    diagnostic: ts.Diagnostic,
    newLine: string
  ) => {}

  // Wait until we've definitely loaded in the definitions
  let interval = setInterval(() => {
    let allSourceFiles =
      watchProgram
        ?.getProgram()
        .getSourceFiles()
        .map((x) => x.fileName) ?? []

    if (allSourceFiles.find((name) => name.includes("@globals.d.ts"))) {
      clearInterval(interval)
      tsUpdateResolve()
    }
  }, 100)

  const host = ts.createWatchCompilerHost(
    tsgdJson.tsconfigPath,
    {},
    ts.sys,
    ts.createEmitAndSemanticDiagnosticsBuilderProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  )
  watchProgram = ts.createWatchProgram(host)
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
    tsInitialLoad,
  }
}

export const showLoadingMessage = (msg: string) => {
  console.clear()
  console.info(
    chalk.blueBright("ts2gd v" + packageJson.version),
    "-",
    msg + "..."
  )
}

const main = async (flags: Flags) => {
  const start = new Date().getTime()

  showLoadingMessage("Initializing TypeScript")
  const { watchProgram, tsgdJson, tsInitialLoad } = setup()

  showLoadingMessage("Scanning project")
  let project = await makeTsGdProject(tsgdJson, watchProgram)

  if (project.shouldBuildDefinitions(flags)) {
    showLoadingMessage("Building definition files")
    await project.buildAllDefinitions()
  }

  // This resolves a race condition where TS would not be aware of all the files
  // we just saved in buildAllDefinitions().
  showLoadingMessage("Waiting for TypeScript to finish")
  await tsInitialLoad

  showLoadingMessage("Compiling all source files")
  project.compileAllSourceFiles()

  showLoadingMessage(
    `Startup complete in ${(new Date().getTime() - start) / 1000 + "s"}`
  )
}

if (!process.argv[1].includes("test")) {
  const flags = parseArgs()

  checkVersionAsync()

  if (flags.help) {
    printHelp()
  } else {
    main(flags)
  }
}
