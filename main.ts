#!/usr/bin/env ts-node

// HIGH

// TODO: Godot doesnt allow shadowing tho TS does.
// TODO: max_by()
// TODO: Renaming files crashes (because imports are not found)
// TODO: new assets aren't immediately imported.
// TODO: There are bugs when you have both a constructor and an _ready() method.
// TODO: we need to clean up old node_paths when we delete or rename a class.
// TODO: Godot globals
// TODO: this.collision.connect("mouseexit", this, () => {})
// TODO: it's hard to compile ++/-- properly.
// TODO: Inline gdscript
// TODO: Resolve node paths even through instances.
// TODO: Fun idea: array[1-1] (or some other notation) could translate into slicing
//   Eh it wouldnt typecheck though...
//   Might be possible if an array had 2 index signatures and it was something like array["1:1"]
// TODO: Renaming in destructuring

// MED

// TODO: new Thing() should find the appropriate scene to initialize if there is one.
// TODO: template strings
// TODO: str()
// TODO: ": float" in parameters is not respected
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
