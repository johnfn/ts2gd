// HIGH

// Have a github action that auto publishes an html5 build

// Convert "throw new Error()" into a better failure

// change_scene_to takes a PackedScene but since it's a <T> it's treated as an any.
// regenerate asset_paths on restart

// Make a testing harness for project-related stuff.

// consider always running buildAllDefinitions. it might be safer

// TODO: I need to abstract over the TS and chokidar file watcher interface thingy.

// The onChange flow in project.ts delets the old obj and adds a new one - but then you lose
// local state. I should think of a way to address this.

// TODO: Could get best of both worlds with yield Yield() (although that looks stupid).

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

// TODO:
// Instead of doing stuff like         const script = this.sourceFiles().find((sf) => sf.resPath === resPath)
// just have autoloads stored as Assets

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
import { ParsedArgs, parseArgs, printHelp } from "./parse_args"
import chalk from "chalk"

const setup = (tsgdJson: Paths) => {
  const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: (path: string) => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
  }

  let tsUpdateResolve!: (value: void | PromiseLike<void>) => void

  const tsInitializationFinished = new Promise<void>((resolve) => {
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
    tsInitializationFinished,
  }
}

export const showLoadingMessage = (msg: string, done = false) => {
  console.clear()
  console.info(
    chalk.blueBright("ts2gd v" + packageJson.version),
    "-",
    msg + (done ? "" : "...")
  )
}

export const main = async (args: ParsedArgs) => {
  const start = new Date().getTime()

  const tsgdJson = new Paths(args)

  showLoadingMessage("Initializing TypeScript")
  const { watchProgram, tsInitializationFinished } = setup(tsgdJson)

  showLoadingMessage("Scanning project")
  let project = await makeTsGdProject(tsgdJson, watchProgram)

  if (project.shouldBuildDefinitions(args)) {
    showLoadingMessage("Building definition files")
    await project.buildAllDefinitions()
  }

  // This resolves a race condition where TS would not be aware of all the files
  // we just saved in buildAllDefinitions().
  showLoadingMessage("Waiting for TypeScript to finish")
  await tsInitializationFinished

  if (!project.validateAutoloads()) {
    process.exit(0)
  }

  showLoadingMessage("Compiling all source files")
  project.compileAllSourceFiles()

  showLoadingMessage(
    `Startup complete in ${(new Date().getTime() - start) / 1000 + "s"}`,
    true
  )
}

if (!process.argv[1].includes("test")) {
  const args = parseArgs()

  checkVersionAsync()

  if (args.help) {
    printHelp()
  } else {
    main(args)
  }
}
