import { promises as fs } from "fs"
import path from "path"

import ts, { SyntaxKind } from "typescript"
import * as utils from "tsutils"
import chalk from "chalk"

import { ErrorName, TsGdError } from "../errors"
import { Scope } from "../../scope"
import TsGdProject from "../project"
import { parseNode } from "../../parse_node"

import { BaseAsset } from "./base_asset"

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

  name: string

  /** Like "src/main.ts" */
  tsRelativePath: string

  /**
   * List of all files that were written when compiling this source file.
   */
  writtenFiles: string[] = []

  project: TsGdProject

  private _isAutoload: boolean

  constructor(sourceFilePath: string, project: TsGdProject) {
    super()

    let gdPath = path.join(
      project.paths.destGdPath,
      sourceFilePath.slice(
        project.paths.sourceTsPath.length,
        -path.extname(sourceFilePath).length
      ) + ".gd"
    )

    this.resPath = project.paths.fsPathToResPath(gdPath)
    this.gdPath = gdPath
    this.gdContainingDirectory = gdPath.slice(0, gdPath.lastIndexOf("/") + 1)
    this.fsPath = sourceFilePath
    this.tsRelativePath = sourceFilePath.slice(
      project.paths.rootPath.length + 1
    )
    this.name = this.gdPath.slice(
      this.gdContainingDirectory.length,
      -".gd".length
    )
    this.project = project
    this._isAutoload = !!this.project.godotProject.autoloads.find(
      (a) => a.resPath === this.resPath
    )
  }

  reload() {}

  private getAst(): TsGdError | ts.SourceFile {
    const ast = this.project.program.getProgram().getSourceFile(this.fsPath)

    if (!ast) {
      return {
        error: ErrorName.PathNotFound,
        description: `
Referenced file ${this.fsPath} does not exist.
This is a ts2gd bug. Please create an issue on GitHub for it.`,
        location: this.fsPath,
        stack: new Error().stack ?? "",
      }
    }

    return ast
  }

  private getClassNode(): ts.ClassDeclaration | TsGdError {
    const ast = this.getAst()

    if ("error" in ast) {
      return ast
    }

    const topLevelClasses = ast
      .getChildren()[0] // SyntaxList
      .getChildren()
      .filter(
        (node): node is ts.ClassDeclaration =>
          node.kind === SyntaxKind.ClassDeclaration
      )

    if (topLevelClasses.length === 0) {
      return {
        error: ErrorName.ClassNameNotFound,
        location: ast,
        description: "Every file must have a class.",
        stack: new Error().stack ?? "",
      }
    }

    if (topLevelClasses.length > 1) {
      return {
        error: ErrorName.TooManyClassesFound,
        location: topLevelClasses[1],
        description:
          "Every file must have exactly one class. Consider moving this class into a new file.",
        stack: new Error().stack ?? "",
      }
    }

    return topLevelClasses[0]
  }

  // This can be different than the Godot class name for autoload classes.
  exportedTsClassName(): string | TsGdError {
    const node = this.getClassNode()

    if ("error" in node) {
      return node
    }

    const name = node?.name

    if (!name) {
      return {
        error: ErrorName.ClassCannotBeAnonymous,
        location: node ?? this.tsRelativePath,
        description: "This class cannot be anonymous",
        stack: new Error().stack ?? "",
      }
    }

    return name?.text ?? null
  }

  extendedClassName(): string | TsGdError {
    const node = this.getClassNode()

    if (node === null || "error" in node) {
      return node
    }

    if (node.heritageClauses) {
      // TODO: Ensure there's only one of each here

      const clause = node.heritageClauses[0] as ts.HeritageClause
      const type = clause.types[0]

      return type.getText()
    }

    return {
      error: ErrorName.ClassDoesntExtendAnything,
      description: `The class in this file needs to extend another class: ${
        this.fsPath
      }

Hint: try ${chalk.blueBright(
        `export class ${node.name?.text ?? ""} extends Node {`
      )}
      `,
      location: node,
      stack: new Error().stack ?? "",
    }
  }

  private getAutoloadNameFromExportedVariable(): string | TsGdError {
    const ast = this.getAst()

    if ("error" in ast) {
      return ast
    }

    const topLevelDefinitions = ast.getChildren()[0] // SyntaxList

    for (const d of topLevelDefinitions.getChildren()) {
      if (d.kind === SyntaxKind.VariableStatement) {
        const vs = d as ts.VariableStatement
        const isExported = vs.modifiers?.find(
          (mod) => mod.kind === SyntaxKind.ExportKeyword
        )

        if (isExported) {
          return vs.declarationList.declarations[0].name.getText()
        }
      }
    }

    // TODO: Error could say the exact loc to write
    return {
      error: ErrorName.CantFindAutoloadInstance,
      location: ast ?? this.tsRelativePath,
      stack: new Error().stack ?? "",
      description: `Can't find the autoload instance variable for this autoload class. All files with an autoload class must export an instance of that class. Here's an example:

@autoload
class MyAutoloadClass extends Node2D {
  public string hello = "hi"
}

${chalk.green(
  "export const MyAutoload = new MyAutoloadClass()"
)} // This line is what you're missing!
`,
    }
  }

  isAutoload() {
    return this._isAutoload
  }

  tsType(): string {
    const className = this.exportedTsClassName()

    if (className) {
      return `import('${this.fsPath.slice(0, -".ts".length)}').${className}`
    } else {
      this.project.errors.add({
        description: `Failed to find className for ${this.fsPath}`,
        error: ErrorName.Ts2GdError,
        location: this.fsPath,
        stack: new Error().stack ?? "",
      })

      return "any"
    }
  }

  private isProjectAutoload(): boolean {
    return !!this.project.godotProject.autoloads.find(
      (autoload) => autoload.resPath === this.resPath
    )
  }

  private isDecoratedAutoload(): boolean {
    const classNode = this.getClassNode()

    if ("error" in classNode) {
      return false
    }

    for (const dec of classNode.decorators ?? []) {
      if (dec.expression.getText() === "autoload") {
        return true
      }
    }

    return false
  }

  getAutoloadValidationErrors(): TsGdError | null {
    if (this.isProjectAutoload() && !this.isDecoratedAutoload()) {
      return {
        error: ErrorName.AutoloadProjectButNotDecorated,
        stack: new Error().stack ?? "",
        description: `Godot thinks this is an AutoLoad, but it doesn't have an ${chalk.white(
          "@autoload"
        )} decorator. Either add the decorator or remove it from the Godot AutoLoad list.`,
        location: this.fsPath,
      }
    }

    if (!this.isProjectAutoload() && this.isDecoratedAutoload()) {
      return {
        error: ErrorName.AutoloadProjectButNotDecorated,
        stack: new Error().stack ?? "",
        description: `This has an ${chalk.white(
          "@autoload"
        )} decorator, but Godot doesn't have it on the AutoLoad list. Either add it to the Godot AutoLoad list, or remove the decorator.`,
        location: this.fsPath,
      }
    }

    return null
  }

  checkForNoDuplicateClassNames(sourceFile: ts.SourceFile) {
    for (const sf of this.project.sourceFiles()) {
      if (sf === this) {
        continue
      }

      for (const theirFile of sf.writtenFiles) {
        for (const ourFile of this.writtenFiles) {
          if (theirFile === ourFile) {
            this.project.errors.add({
              description: `You have two classes named ${
                this.name
              } in the same folder. ts2gd saves every class as "class_name.gd", so they will overwrite each other. We recommend renaming one, but you can also move it into a new directory.

First path:  ${chalk.yellow(this.fsPath)}
Second path: ${chalk.yellow(sf.fsPath)}`,
              error: ErrorName.TwoClassesWithSameName,
              location: sourceFile,
              stack: new Error().stack ?? "",
            })

            return
          }
        }
      }
    }
  }

  async compile(
    watchProgram: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>
  ): Promise<void> {
    const oldAutoloadClassName = this.getAutoloadNameFromExportedVariable()

    let sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)
    let tries = 0

    while (!sourceFileAst && ++tries < 50) {
      await new Promise((resolve) => setTimeout(resolve, 10))

      sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)!
    }

    if (!sourceFileAst) {
      this.project.errors.add({
        description: `TS can't find source file ${this.fsPath} after waiting 1 second. Try saving your TypeScript file again.`,
        error: ErrorName.PathNotFound,
        location: this.fsPath,
        stack: new Error().stack ?? "",
      })

      return
    }

    // Since we use chokidar but TS uses something else to monitor files, sometimes
    // we can race ahead of the TS compiler. This is a hack to wait for them to
    // catch up with us.
    // We can skip that in a build only context is chokidar only generates the initial file list.
    while (
      !this.project.args.buildOnly &&
      (await fs.readFile(this.fsPath, "utf-8")) !== sourceFileAst.getFullText()
    ) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)!
    }

    const parsedNode = parseNode(sourceFileAst, {
      indent: "",
      isConstructor: false,
      scope: new Scope(watchProgram.getProgram().getProgram()),
      project: this.project,
      mostRecentControlStructureIsSwitch: false,
      isAutoload: this.isProjectAutoload(),
      program: watchProgram.getProgram().getProgram(),
      usages: utils.collectVariableUsage(sourceFileAst),
      sourceFile: sourceFileAst,
      sourceFileAsset: this,
    })

    // TODO: Only do this once per program run max!
    await fs.mkdir(path.dirname(this.gdPath), { recursive: true })

    this.writtenFiles = []

    for (const { filePath, body } of parsedNode.files ?? []) {
      await fs.writeFile(filePath, body)
      this.writtenFiles.push(filePath)
    }

    this.checkForNoDuplicateClassNames(sourceFileAst)

    this.checkForAutoloadChanges()

    if (this.isAutoload()) {
      const error = this.validateAutoloadClass()

      if (error !== null) {
        this.project.errors.add(error)
      }

      const newAutoloadClassName = this.getAutoloadNameFromExportedVariable()

      if (
        typeof oldAutoloadClassName === "string" &&
        typeof newAutoloadClassName === "string"
      ) {
        // TODO: Somehow put this autoload logic elsewhere.
        // Check if they changed the name of the exported autoload variable.
        if (newAutoloadClassName !== oldAutoloadClassName) {
          this.project.godotProject.removeAutoload(this.resPath)
          this.project.godotProject.addAutoload(
            newAutoloadClassName,
            this.resPath
          )
        }
      }
    }
  }

  validateAutoloadClass(): TsGdError | null {
    const classNode = this.getClassNode()

    if ("error" in classNode) {
      return classNode
    }

    const result = this.getAutoloadNameFromExportedVariable()

    if (typeof result !== "string") {
      return {
        error: ErrorName.AutoloadNotExported,
        description: `Be sure to export an instance of your autoload class, e.g.:

${chalk.white(
  `export const ${this.getGodotClassName()} = new ${this.exportedTsClassName()}()`
)}
        `,
        location: classNode ?? this.fsPath,
        stack: new Error().stack ?? "",
      }
    }

    return null
  }

  getGodotClassName(): string {
    return this.fsPath.slice(this.fsPath.lastIndexOf("/") + 1, -".ts".length)
  }

  checkForAutoloadChanges(): void {
    let shouldBeAutoload: boolean
    let prevAutoload = this.isAutoload()

    const isDecoratedAutoload = this.isDecoratedAutoload()

    if (prevAutoload) {
      // Did we remove one?
      if (!isDecoratedAutoload || !this.isProjectAutoload()) {
        shouldBeAutoload = false
      } else {
        shouldBeAutoload = true
      }
    } else {
      // Did we add one?
      if (isDecoratedAutoload || this.isProjectAutoload()) {
        shouldBeAutoload = true
      } else {
        shouldBeAutoload = false
      }
    }

    if (!prevAutoload && shouldBeAutoload) {
      if (!this.isProjectAutoload()) {
        const autoloadClassName = this.getAutoloadNameFromExportedVariable()

        if (
          typeof autoloadClassName !== "string" &&
          "error" in autoloadClassName
        ) {
          this.project.errors.add(autoloadClassName)

          return
        }

        this.project.godotProject.addAutoload(autoloadClassName, this.resPath)
      }

      if (!isDecoratedAutoload) {
        shouldBeAutoload = false

        const classNode = this.getClassNode()

        this.project.errors.add({
          error: ErrorName.AutoloadProjectButNotDecorated,
          description: `Since this is an autoload class in Godot, you must put ${chalk.white(
            "@autoload"
          )} the line before the class declaration.`,
          location: "error" in classNode ? this.fsPath : classNode,
          stack: new Error().stack ?? "",
        })

        return
      }
    }

    if (prevAutoload && !shouldBeAutoload) {
      if (this.isProjectAutoload()) {
        this.project.godotProject.removeAutoload(this.resPath)
      }

      if (this.isDecoratedAutoload()) {
        shouldBeAutoload = true

        const classNode = this.getClassNode()

        this.project.errors.add({
          error: ErrorName.AutoloadDecoratedButNotProject,
          description: `Since you removed this as an autoload class in Godot, you must remove ${chalk.white(
            "@autoload"
          )}.`,
          location: "error" in classNode ? this.fsPath : classNode,
          stack: new Error().stack ?? "",
        })

        return
      }
    }

    this._isAutoload = shouldBeAutoload

    return
  }

  async destroy() {
    // Delete the .gd file
    await fs.rm(this.gdPath, { force: true })

    // Delete the generated enum files
    const filesInDirectory = await fs.readdir(this.gdContainingDirectory)
    const nameWithoutExtension = this.gdPath.slice(0, -".gd".length)

    for (const fileName of filesInDirectory) {
      const fullPath = this.gdContainingDirectory + fileName

      if (fullPath.startsWith(nameWithoutExtension)) {
        await fs.rm(fullPath, { force: true })
      }
    }

    this.project.godotProject.removeAutoload(this.resPath)
  }
}
