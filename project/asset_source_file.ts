import fs from "fs"
import path from "path"
import { BaseAsset } from "./base_asset"

import { TsGdProjectClass } from "./project"

export class AssetSourceFile extends BaseAsset {
  className: string

  /** Like res://src/main.gd */
  resPath: string

  /** Like main.gd */
  fsPath: string

  /** Like /Users/johnfn/GodotProject/src/main.ts */
  tsFullPath: string

  /** Like ./src/main.ts */
  tsRelativePath: string

  project: TsGdProjectClass

  // Don't use this!
  _tsImportName: string

  constructor(sourceFilePath: string, project: TsGdProjectClass) {
    super()

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
    this.fsPath = gdPath
    this.tsFullPath = sourceFilePath
    this.tsRelativePath = sourceFilePath.slice(
      TsGdProjectClass.tsgdPath.length + 1
    )
    this.project = project

    this._tsImportName = `import('${this.tsFullPath.slice(
      0,
      -".ts".length
    )}').${this.className}`
  }

  tsImportName(): string {
    return this._tsImportName
  }

  isAutoload(): boolean {
    return !!this.project.godotProject.autoloads.find(
      (autoload) => autoload.resPath === this.resPath
    )
  }

  getEnumPath(enumName: string): string {
    return this.fsPath.slice(0, -".gd".length) + "_" + enumName + ".gd"
  }
}
