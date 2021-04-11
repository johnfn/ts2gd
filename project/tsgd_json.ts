import path from "path"
import fs from "fs"
import process from "process"
import { showLoadingMessage } from "../main"
import { defaultTsconfig } from "../generate_library_defs/generate_tsconfig"
import { ParsedArgs } from "../parse_args"

// TODO: Do sourceTsPath and destGdPath have to be relative?

export class Paths {
  /** Where the .ts files live, e.g. ./src */
  sourceTsPath: string

  /** Where the compiled .gd files go, e.g. ./compiled */
  destGdPath: string

  /** The root path of the project */
  rootPath: string

  /** The full path to the tsconfig file. e.g. /Users/johnfn/GodotProject/tsconfig.json */
  tsconfigPath: string

  /** The path to the Godot definitions folder for unchanging library definitions.
   * e.g. /Users/johnfn/GodotProject/_godot_defs/static */
  staticGodotDefsPath: string

  /** The path to the Godot definitions folder for definitions based off user files.
   * e.g. /Users/johnfn/GodotProject/_godot_defs/dynamic */
  dynamicGodotDefsPath: string

  /** The path to the Godot repository, e.g. /Users/johnfn/Godot */
  godotSourceRepoPath: string | undefined

  constructor(flags: ParsedArgs) {
    if (flags.init) {
      this.init()

      process.exit(0)
    }

    let ts2gdPath = ""

    let fullyQualifiedTs2gdPathWithFilename: string
    let fullyQualifiedTs2gdPath: string

    if (flags.tsgdPath) {
      ts2gdPath = flags.tsgdPath

      // relativeTs2gdPath is now a path of some sort, but it could be a relative path (e.g. "./ts2gd.json").
      // Let's make it fully qualified.

      if (ts2gdPath.startsWith("/")) {
        // absolute path

        fullyQualifiedTs2gdPathWithFilename = ts2gdPath
      } else if (ts2gdPath.startsWith(".")) {
        // some sort of relative path, so resolve it

        fullyQualifiedTs2gdPathWithFilename = path.join(
          __dirname,
          flags.tsgdPath
        )
      }
    } else {
      // Check if we can find the ts2gd.json in the current folder

      const ts2gdInCurrentFolderPath = path.join(process.cwd(), "ts2gd.json")

      if (!fs.existsSync(ts2gdInCurrentFolderPath)) {
        console.error("No ts2gd.json file found.")
        console.error("Try running ts2gd --init.")

        process.exit(0)
      }

      ts2gdPath = ts2gdInCurrentFolderPath
    }

    fullyQualifiedTs2gdPathWithFilename = ts2gdPath

    fullyQualifiedTs2gdPath = path.dirname(fullyQualifiedTs2gdPathWithFilename)

    const tsgdJson = JSON.parse(
      fs.readFileSync(fullyQualifiedTs2gdPathWithFilename, "utf-8")
    )

    // TODO: Assert that these are found on the json object
    this.sourceTsPath = path.join(fullyQualifiedTs2gdPath, tsgdJson.source)
    this.destGdPath = path.join(fullyQualifiedTs2gdPath, tsgdJson.destination)
    this.rootPath = fullyQualifiedTs2gdPath
    this.staticGodotDefsPath = path.join(this.rootPath, "_godot_defs", "static")
    this.dynamicGodotDefsPath = path.join(
      this.rootPath,
      "_godot_defs",
      "dynamic"
    )

    this.godotSourceRepoPath = tsgdJson.godotSourceRepoPath || undefined

    this.tsconfigPath = path.join(
      path.dirname(fullyQualifiedTs2gdPathWithFilename),
      "tsconfig.json"
    )

    if (!fs.existsSync(this.tsconfigPath)) {
      showLoadingMessage("Creating tsconfig.json")

      fs.writeFileSync(this.tsconfigPath, defaultTsconfig)
    }
  }

  /**
   * Called when a user types ts2gd --init
   */
  init() {
    let destPath = path.join(process.cwd(), "ts2gd.json")

    fs.writeFileSync(
      destPath,
      `{
  "destination": "./compiled",
  "source": "./src"
}`
    )

    // Can't hurt!
    fs.mkdirSync("compiled")
    fs.mkdirSync("src")
    fs.mkdirSync(".vscode")

    // TODO: Put in a separate file.
    fs.writeFileSync(
      path.join(process.cwd(), ".vscode", "launch.json"),
      `{
      "version": "0.2.0",
      "configurations": [
        {
          "name": "GDScript Godot",
          "type": "godot",
          "request": "launch",
          "project": "$\{workspaceFolder}",
          "port": 6007,
          "address": "127.0.0.1",
          "launch_game_instance": true,
          "launch_scene": false
        }
      ]
    }`
    )

    console.info("ts2gd.json created.")
    console.info("compiled/ created.")
    console.info("src/ created.")
  }
}
