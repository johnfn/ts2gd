#!/usr/bin/env ts-node

// how do u access global label
// str()

/*
/Users/johnfn/code/tsgd/ts2gd/project/godot_parser.ts:77
    while (file[nextNonemptyIndex].trim() === "") {
                                   ^
TypeError: Cannot read property 'trim' of undefined
    at eof (/Users/johnfn/code/tsgd/ts2gd/project/godot_parser.ts:77:36)
    at Object.parseGodotConfigFile (/Users/johnfn/code/tsgd/ts2gd/project/godot
*/

// HIGH

// TODO: Better print() output, with spacing
// TODO: Document @exports

// TODO: parseGodotConfigFile() can fail if the config is in a bad state, e.g.
// merge conflicts. should just retry after a while.

// TODO: change_scene should autocomplete .tscn files only

// TODO: "cannot find module typescript"
// TODO: if you dont have a tsconfig.json it just goes into an infinite loop
// and we need to generate one for the skipping library stuff

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

// TODO: Add __filter and __map to symbol table
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

import packageJson from "./package.json"
import ts from "typescript"
import * as process from "process"

import { makeTsGdProject } from "./project/project"
import { Paths } from "./project/tsgd_json"
import https from "https"
import chalk from "chalk"

const setup = () => {
  const tsgdJson = new Paths()

  const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: (path: string) => path,
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

const checkVersionAsync = async () => {
  console.log(chalk.blue("ts2gd", "v" + packageJson.version))

  const options = {
    hostname: "registry.npmjs.org",
    path: "/ts2gd",
  }

  let response = ""

  await new Promise<void>((resolve) => {
    const req = https.request(options, (res) => {
      res.on("data", (d: Buffer) => {
        response += d
      })

      res.on("end", () => {
        resolve()
      })
    })

    req.end()
  })

  const versionNameDate: [string, Date][] = Object.entries(
    JSON.parse(response).time as { [key: string]: string }
  )
    .sort(
      (first: [string, string], second: [string, string]) =>
        new Date(second[1]).getTime() - new Date(first[1]).getTime()
    )
    .map(([a, b]) => [a, new Date(b)])

  let latestPublishedVersion = ""
  for (const [versionName, date] of versionNameDate) {
    if (versionName === "modified") {
      continue
    }

    latestPublishedVersion = versionName
    break
  }

  if (latestPublishedVersion !== packageJson.version) {
    console.log(`There is a new version of ts2gd: ${latestPublishedVersion}`)
    console.log(`install it with`)
    console.log(``)
    console.log(chalk.blue(`npm install --global ts2gd`))
  }
}

if (!process.argv[1].includes("test")) {
  checkVersionAsync()
  main()
}
