import fs from "fs"
import ts from "typescript"
import path from "path"

import { parseNode, ParseNodeType, ParseState } from "../parse_node"
import { BaseAsset } from "./base_asset"
import { TsGdProjectClass } from "./project"
import { Scope } from "../scope"
import { watch } from "chokidar"

// TODO: We currently allow for invalid states (e.g. className() is undefined)
// because we only create AssetSourceFiles on a chokidar 'add' operation (we
// dont make them on edit).
// Can we just create them on edit as well (if it doesn't exist but is valid)?

export class AssetSourceFile extends BaseAsset {
  /** Like res://src/main.gd */
  resPath: string

  /** Like main.gd */
  gdPath: string

  /** Like /Users/johnfn/GodotProject/src/main.ts */
  fsPath: string

  /** Like ./src/main.ts */
  tsRelativePath: string

  project: TsGdProjectClass

  constructor(sourceFilePath: string, project: TsGdProjectClass) {
    super()

    let gdPath = path.join(
      TsGdProjectClass.Paths.destGdPath,
      sourceFilePath.slice(
        TsGdProjectClass.Paths.sourceTsPath.length,
        -path.extname(sourceFilePath).length
      ) + ".gd"
    )

    this.resPath = TsGdProjectClass.FsPathToResPath(gdPath)
    this.gdPath = gdPath
    this.fsPath = sourceFilePath
    this.tsRelativePath = sourceFilePath.slice(
      TsGdProjectClass.Paths.rootPath.length + 1
    )
    this.project = project
  }

  reload() {
    this._cachedClassName = null
  }

  // TODO: Fix up test.ts
  // DONT USE THIS!
  _cachedClassName: string | null = null

  className(): string | null {
    if (this._cachedClassName) {
      return this._cachedClassName
    }

    let tsFileContent = fs.readFileSync(this.fsPath, "utf-8")
    // TODO: this is a bit brittle
    let classNameMatch = [
      ...tsFileContent.matchAll(/^(?:export )?class ([^ ]*?) /gm),
    ]

    let className: string

    if (classNameMatch && classNameMatch.length === 1) {
      className = classNameMatch[0][1]
    } else {
      if (classNameMatch.length > 1) {
        throw new Error(`Found too many exported classes in ${this.fsPath}`)
      } else {
        return null
      }
    }

    this._cachedClassName = className

    return this._cachedClassName
  }

  tsType(): string | null {
    const className = this.className()

    if (className) {
      return `import('${this.fsPath.slice(0, -".ts".length)}').${className}`
    } else {
      return null
    }
  }

  isAutoload(): boolean {
    return !!this.project.godotProject.autoloads.find(
      (autoload) => autoload.resPath === this.resPath
    )
  }

  getEnumPath(enumName: string): string {
    return this.gdPath.slice(0, -".gd".length) + "_" + enumName + ".gd"
  }

  // TODO: Fix up test.ts
  // DONT USE THIS!
  _lastCompilationResult: ParseNodeType | undefined = undefined

  async compile(
    watchProgram: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>
  ): Promise<void> {
    let sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)
    let tries = 0

    while (!sourceFileAst && ++tries < 10) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)!
    }

    if (!sourceFileAst) {
      console.error(
        `TS can't find source file ${this.fsPath} - this is almost certainly a bug with ts2gd.`
      )
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
      scope: new Scope(watchProgram.getProgram().getProgram()),
      project: this.project,
      mostRecentControlStructureIsSwitch: false,
      isAutoload:
        this.project.godotProject.autoloads.find(
          (autoload) => autoload.resPath === this.resPath
        ) !== undefined,
      program: watchProgram.getProgram().getProgram(),
      usages: new Map(),
    })

    this._lastCompilationResult = result

    // TODO: Only do this once per program run max!
    fs.mkdirSync(path.dirname(this.gdPath), { recursive: true })
    fs.writeFileSync(this.gdPath, result.content)

    for (const { content, name } of result.enums ?? []) {
      fs.writeFileSync(this.getEnumPath(name), content)
    }
  }

  destroy() {
    fs.rmSync(this.gdPath)

    if (!this._lastCompilationResult) {
      return
    }

    for (const { content, name } of this._lastCompilationResult.enums ?? []) {
      fs.writeFileSync(this.getEnumPath(name), content)
    }
  }
}
