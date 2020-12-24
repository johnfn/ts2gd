import fs from "fs"

export class AssetGodotProjectFile {
  projectFileContent: string
  autoloads: { resPath: string }[]

  constructor(path: string) {
    this.projectFileContent = fs.readFileSync(path, "utf-8")
    this.autoloads = this.getAutoloadFiles()
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
