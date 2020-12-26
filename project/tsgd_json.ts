import path from "path"
import fs from "fs"

// TODO: Do sourceTsPath and destGdPath have to be relative?

export class TsGdJson {
  /** Where the .ts files live, e.g. ./src */
  sourceTsPath: string

  /** Where the compiled .gd files go, e.g. ./compiled */
  destGdPath: string

  constructor() {
    const inputPath = process.argv[2]

    // TODO: Clean up erroring here

    if (!inputPath) {
      console.error(
        "Please specify a tsgd.json file on the command line. Thanks!"
      )
      process.exit(0)
    }

    let tsgdPathWithFilename: string
    let tsgdPath: string

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

    tsgdPath = path.dirname(tsgdPathWithFilename)

    const tsgdJson = JSON.parse(fs.readFileSync(tsgdPathWithFilename, "utf-8"))

    // TODO: Assert that these are found on the json object
    this.sourceTsPath = path.join(tsgdPath, tsgdJson.source)
    this.destGdPath = path.join(tsgdPath, tsgdJson.destination)
  }
}
