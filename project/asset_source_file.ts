import fs from "fs"
import ts from "typescript"
import path from "path"
import { watchProgram } from "../main"
import { parseNode } from "../parse_node"
import { BaseAsset } from "./base_asset"

import { TsGdProjectClass } from "./project"

export class AssetSourceFile extends BaseAsset {
  className: string

  /** Like res://src/main.gd */
  resPath: string

  /** Like main.gd */
  gdPath: string

  /** Like /Users/johnfn/GodotProject/src/main.ts */
  fsPath: string

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
    this.gdPath = gdPath
    this.fsPath = sourceFilePath
    this.tsRelativePath = sourceFilePath.slice(
      TsGdProjectClass.tsgdPath.length + 1
    )
    this.project = project

    this._tsImportName = `import('${this.fsPath.slice(0, -".ts".length)}').${
      this.className
    }`
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

  async compile(): Promise<void> {
    let sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)

    if (!sourceFileAst) {
      console.error("invalid path to source file!")
      process.exit()
    }

    // Since we use chokidar but TS uses something else to monitor files, sometimes
    // we can race ahead of the TS compiler. This is a hack to wait for them to
    // catch up with us.
    while (
      fs.readFileSync(this.fsPath, "utf-8") !== sourceFileAst.getFullText()
    ) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)!
    }

    let id = 0
    const genUniqueName = () => `func${++id}`

    const result = parseNode(sourceFileAst, {
      indent: "",
      isConstructor: false,
      genUniqueName,
      project: this.project,
      mostRecentControlStructureIsSwitch: false,
      isAutoload: false,
      program: watchProgram.getProgram().getProgram(),
      usages: new Map(),
    })

    // TODO: Only do this once per program run max!
    fs.mkdirSync(path.dirname(this.gdPath), { recursive: true })
    fs.writeFileSync(this.gdPath, result.content)

    for (const { content, name } of result.enums ?? []) {
      fs.writeFileSync(this.getEnumPath(name), content)
    }
  }
}
