import fs from "fs"
import { TsGdProjectClass } from "./project"

export class AssetGodotProjectFile {
  projectFileContent: string
  autoloads: { resPath: string }[]

  constructor(path: string) {
    this.projectFileContent = fs.readFileSync(path, "utf-8")
    this.autoloads = this.getAutoloadFiles()
  }

  getMainScene() {
    const re = /run\/main_scene="([^"]+)"/

    const match = re.exec(this.projectFileContent)

    if (match) {
      let resPath = match[1]
      let fsPath = TsGdProjectClass.ResPathToFsPath(resPath)

      return { resPath, fsPath }
    } else {
      throw new Error("No main scene found in project.godot!")
    }
  }

  getAutoloadFiles() {
    const lines = this.projectFileContent.split("\n")

    let inAutoloadSection = false
    let results: { resPath: string }[] = []

    for (const line of lines) {
      if (line.trim() == "[autoload]") {
        inAutoloadSection = true
        continue
      }

      if (line.startsWith("[")) {
        inAutoloadSection = false
      }

      if (inAutoloadSection) {
        const re = /.*="\*res:\/\/(.*).gd"/
        const match = re.exec(line)

        if (match) {
          const [line, className] = match

          results.push({
            resPath: `res://${className}.gd`,
          })
        }
      }
    }

    return results
  }
}
