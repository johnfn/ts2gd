import fs from "fs"
import ts, { SyntaxKind } from "typescript"
import path from "path"

import { BaseAsset } from "./base_asset"
import { ParseNodeType, parseNode } from "../../parse_node"
import { Scope } from "../../scope"
import { logErrorAtNode, syntaxKindToString } from "../../ts_utils"
import { TsGdProjectClass } from "../project"
import chalk from "chalk"
import { setFlagsFromString } from "v8"

// TODO: We currently allow for invalid states (e.g. className() is undefined)
// because we only create AssetSourceFiles on a chokidar 'add' operation (we
// dont make them on edit).
// Can we just create them on edit as well (if it doesn't exist but is valid)?

export class AssetSourceFile extends BaseAsset {
  /** Like "res://src/main.gd" */
  resPath: string

  /** Like "/Users/johnfn/GodotProject/compiled/main.gd" */
  gdPath: string

  /** Like "/Users/johnfn/GodotProject/compiled/ " */
  gdContainingDirectory: string

  /** Like "/Users/johnfn/GodotProject/src/main.ts" */
  fsPath: string

  /** Like "src/main.ts" */
  tsRelativePath: string

  project: TsGdProjectClass

  private _isAutoload: boolean

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
    this.gdContainingDirectory = gdPath.slice(0, gdPath.lastIndexOf("/") + 1)
    this.fsPath = sourceFilePath
    this.tsRelativePath = sourceFilePath.slice(
      TsGdProjectClass.Paths.rootPath.length + 1
    )
    this.project = project
    this._isAutoload = !!this.project.godotProject.autoloads.find(
      (a) => a.resPath === this.resPath
    )
  }

  reload() {}

  private getAst() {
    const ast = this.project.program.getProgram().getSourceFile(this.fsPath)

    if (!ast) {
      console.error(`Referenced file ${this.fsPath} does not exist.`)
      console.error(
        `This is a ts2gd bug. Please create an issue on GitHub for it.`
      )

      return null
    }

    return ast
  }

  private getClassNode(): ts.ClassDeclaration | null {
    const ast = this.getAst()

    if (!ast) {
      return null
    }

    const topLevelClasses = ast
      .getChildren()[0] // SyntaxList
      .getChildren()
      .filter(
        (node): node is ts.ClassDeclaration =>
          node.kind === SyntaxKind.ClassDeclaration
      )

    if (topLevelClasses.length === 0) {
      logErrorAtNode(ast, "Every file must have a class.")

      return null
    }

    if (topLevelClasses.length > 1) {
      logErrorAtNode(
        topLevelClasses[1],
        "You can't declare more than one class per file."
      )
    }

    return topLevelClasses[0]
  }

  className(): string | null {
    const node = this.getClassNode()
    const name = node?.name

    if (!name) {
      logErrorAtNode(
        node ?? this.tsRelativePath,
        "This class cannot be anonymous."
      )
    }

    return name?.text ?? null
  }

  getAutoloadInstanceName(): string | null {
    const ast = this.getAst()

    if (!ast) {
      return null
    }

    const topLevelDefinitions = ast.getChildren()[0] // SyntaxList

    for (const d of topLevelDefinitions.getChildren()) {
      if (d.kind === SyntaxKind.VariableStatement) {
        const vs = d as ts.VariableStatement

        return vs.declarationList.declarations[0].name.getText()
      }
    }

    return null
  }

  isAutoload() {
    return this._isAutoload
  }

  tsType(): string | null {
    const className = this.className()

    if (className) {
      return `import('${this.fsPath.slice(0, -".ts".length)}').${className}`
    } else {
      return null
    }
  }

  private isProjectAutoload(): boolean {
    return !!this.project.godotProject.autoloads.find(
      (autoload) => autoload.resPath === this.resPath
    )
  }

  private isDecoratedAutoload(): boolean | false {
    const classNode = this.getClassNode()

    if (!classNode) {
      return false
    }

    for (const dec of classNode.decorators ?? []) {
      if (dec.expression.getText() === "autoload") {
        return true
      }
    }

    return false
  }

  validateAutoload(): boolean {
    if (this.isProjectAutoload() && !this.isDecoratedAutoload()) {
      logErrorAtNode(
        this.tsRelativePath,
        `This file is an autoload, so it needs an ${chalk.blueBright(
          "@autoload"
        )} decorator.\n\nIf that was unintentional, you can remove it from the Godot autoload list.`
      )

      return false
    }

    if (!this.isProjectAutoload() && this.isDecoratedAutoload()) {
      logErrorAtNode(
        this.tsRelativePath,
        `This file has an @autoload decorator, so it needs to be marked as an autoload in Godot.\n\nIf that was unintentional, you can remove the "@autoload" decorator.`
      )

      return false
    }

    return true
  }

  getEnumPath(enumName: string): string {
    return this.gdPath.slice(0, -".gd".length) + "_" + enumName + ".gd"
  }

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
      isAutoload: this.isProjectAutoload(),
      program: watchProgram.getProgram().getProgram(),
      usages: new Map(),
    })

    // TODO: Only do this once per program run max!
    fs.mkdirSync(path.dirname(this.gdPath), { recursive: true })
    fs.writeFileSync(this.gdPath, result.content)

    for (const { content, name } of result.enums ?? []) {
      fs.writeFileSync(this.getEnumPath(name), content)
    }

    this.checkForAutoloadChanges()
  }

  autoloadClassName(): string {
    return this.fsPath.slice(this.fsPath.lastIndexOf("/") + 1, -".ts".length)
  }

  checkForAutoloadChanges() {
    const autoloadClassName = this.autoloadClassName()
    let shouldBeAutoload: boolean
    let prevAutoload = this.isAutoload()

    if (prevAutoload) {
      // Did we remove one?
      if (!this.isDecoratedAutoload() || !this.isProjectAutoload()) {
        shouldBeAutoload = false
      } else {
        shouldBeAutoload = true
      }
    } else {
      // Did we add one?
      if (this.isDecoratedAutoload() || this.isProjectAutoload()) {
        shouldBeAutoload = true
      } else {
        shouldBeAutoload = false
      }
    }

    // TODO: Forcibly add decorator in the case of a project.godot update.

    if (!prevAutoload && shouldBeAutoload) {
      if (!this.isProjectAutoload()) {
        this.project.godotProject.addAutoload(autoloadClassName, this.resPath)
      }
    }

    if (prevAutoload && !shouldBeAutoload) {
      if (this.isProjectAutoload()) {
        this.project.godotProject.removeAutoload(
          autoloadClassName,
          this.resPath
        )
      }
    }

    this._isAutoload = shouldBeAutoload
  }

  destroy() {
    // Delete the .gd file
    fs.rmSync(this.gdPath)

    // Delete the generated enum files

    const filesInDirectory = fs.readdirSync(this.gdContainingDirectory)
    const nameWithoutExtension = this.gdPath.slice(0, -".gd".length)

    for (const fileName of filesInDirectory) {
      const fullPath = this.gdContainingDirectory + fileName

      if (fullPath.startsWith(nameWithoutExtension)) {
        fs.rmSync(fullPath)
      }
    }

    this.project.godotProject.removeAutoload(
      this.autoloadClassName(),
      this.resPath
    )
  }
}
