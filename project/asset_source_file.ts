import fs from "fs"
import path from "path"

import { TsGdProjectClass } from "./project"

export class AssetSourceFile {
  className: string
  resPath: string
  tsFullPath: string
  tsRelativePath: string
  gdPath: string
  project: TsGdProjectClass

  constructor(sourceFilePath: string, project: TsGdProjectClass) {
    let tsFileContent = fs.readFileSync(sourceFilePath, "utf-8")
    // TODO: this is a bit brittle
    let classNameMatch = [
      ...tsFileContent.matchAll(/^(?:export )?class ([^ ]*?) /gm),
    ]
    let className = ""
    let gdPath = path.join(
      project.tsgdJson.destGdPath,
      sourceFilePath.slice(
        project.tsgdJson.sourceTsPath.length,
        -path.extname(sourceFilePath).length
      ) + ".gd"
    )

    if (classNameMatch && classNameMatch.length === 1) {
      className = classNameMatch[0][1]
    } else {
      if (classNameMatch.length > 1) {
        throw new Error(`Found too many exported classes in ${sourceFilePath}`)
      } else {
        throw new Error(`Couldn't find an exported class in ${sourceFilePath}`)
      }
    }

    this.className = className
    this.resPath = TsGdProjectClass.FsPathToResPath(gdPath)
    this.tsFullPath = sourceFilePath
    this.tsRelativePath = sourceFilePath.slice(
      TsGdProjectClass.tsgdPath.length + 1
    )
    this.gdPath = gdPath
    this.project = project
  }

  isAutoload(): boolean {
    return !!this.project.godotProject.autoloads.find(
      (autoload) => autoload.resPath === this.resPath
    )
  }
}
