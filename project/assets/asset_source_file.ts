import fs from "fs"
import ts, { SyntaxKind } from "typescript"
import path from "path"

import { BaseAsset } from "./base_asset"
import { parseNode } from "../../parse_node"
import { ErrorName, TsGdError, TsGdReturn } from "../../errors"
import { Scope } from "../../scope"
import { TsGdProjectClass } from "../project"
import chalk from "chalk"
import * as utils from "tsutils"

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

  private getAst(): TsGdError | ts.SourceFile {
    const ast = this.project.program.getProgram().getSourceFile(this.fsPath)

    if (!ast) {
      return {
        error: ErrorName.PathNotFound,
        description: `
Referenced file ${this.fsPath} does not exist.
This is a ts2gd bug. Please create an issue on GitHub for it.`,
        location: this.fsPath,
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
      }
    }

    if (topLevelClasses.length > 1) {
      return {
        error: ErrorName.TooManyClassesFound,
        location: topLevelClasses[1],
        description: "Every file must have a class.",
      }
    }

    return topLevelClasses[0]
  }

  // This can be different than the Godot class name for autoload classes.
  exportedTsClassName(): string | TsGdError {
    const node = this.getClassNode()

    if (node === null || "error" in node) {
      return node
    }

    const name = node?.name

    if (!name) {
      return {
        error: ErrorName.ClassCannotBeAnonymous,
        location: node ?? this.tsRelativePath,
        description: "This class cannot be anonymous",
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

        return vs.declarationList.declarations[0].name.getText()
      }
    }

    // TODO: Error could say the exact loc to write
    return {
      error: ErrorName.CantFindAutoloadInstance,
      location: ast ?? this.tsRelativePath,
      description:
        `Can't find the autoload instance variable for this autoload class. All files with an autoload class must export an instance of that class. Here's an example:
        
@autoload
class MyAutoloadClass extends Node2D {
  public string hello = "hi"
}

${ chalk.green("export const MyAutoload = new MyAutoloadClass()") } // This line is what you're missing!
`,
    }
  }

  isAutoload() {
    return this._isAutoload
  }

  tsType(): string | null {
    const className = this.exportedTsClassName()

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

  private isDecoratedAutoload(): boolean | TsGdError {
    const classNode = this.getClassNode()

    if ("error" in classNode) {
      return classNode
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
        description: `Godot thinks this is an AutoLoad, but it doesn't have an ${chalk.white(
          "@autoload"
        )} decorator. Either add the decorator or remove it from the Godot AutoLoad list.`,
        location: this.fsPath,
      }
    }

    if (!this.isProjectAutoload() && this.isDecoratedAutoload()) {
      return {
        error: ErrorName.AutoloadProjectButNotDecorated,
        description: `This has an ${chalk.white(
          "@autoload"
        )} decorator, but Godot doesn't have it on the AutoLoad list. Either add it to the Godot AutoLoad list, or remove the decorator.`,
        location: this.fsPath,
      }
    }

    return null
  }

  getEnumPath(enumName: string): string {
    return this.gdPath.slice(0, -".gd".length) + "_" + enumName + ".gd"
  }

  static transformSourceFile(
    sourceFile: ts.SourceFile
  ): ts.SourceFile {
    const transformer = <T extends ts.Node>(context: ts.TransformationContext) => (rootNode: T) => {
      function visit(node: ts.Node): ts.Node {
        if (node.kind === ts.SyntaxKind.CallExpression) {
          const call = node as ts.CallExpression;

          if (call.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const pae = call.expression as ts.PropertyAccessExpression;
            let newExpr: ts.BinaryExpression | null = null;

            if (pae.name.text === "add") {
              newExpr = context.factory.createBinaryExpression(
                ts.visitEachChild(pae.expression, visit, context),
                context.factory.createToken(ts.SyntaxKind.PlusToken),
                ts.visitEachChild(call.arguments[0], visit, context),
              );
            }

            if (pae.name.text === "sub") {
              newExpr = ts.factory.createBinaryExpression(
                pae.expression,
                ts.factory.createToken(ts.SyntaxKind.MinusToken),
                call.arguments[0],
              );
            }

            if (pae.name.text === "mul") {
              newExpr = ts.factory.createBinaryExpression(
                pae.expression,
                ts.factory.createToken(ts.SyntaxKind.AsteriskToken),
                call.arguments[0],
              );
            }

            if (pae.name.text === "div") {
              ts.factory.createBinaryExpression(
                pae.expression,
                ts.factory.createToken(ts.SyntaxKind.SlashToken),
                call.arguments[0],
              );
            }

            if (newExpr !== null) {
              return newExpr;
            }
          }

        }

        return ts.visitEachChild(node, visit, context);
      }

      return ts.visitNode(rootNode, visit);
  };

    const transformResult = ts.transform(sourceFile, [transformer], { })
    const transformedSourceFile = transformResult.transformed[0] as ts.SourceFile;
    // TODO: Error if >1 file results

    return transformedSourceFile;

  }

  async compile(
    watchProgram: ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>
  ): Promise<TsGdReturn<null>> {
    let sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)
    let tries = 0

    while (!sourceFileAst && ++tries < 50) {
      await new Promise((resolve) => setTimeout(resolve, 10))

      sourceFileAst = watchProgram.getProgram().getSourceFile(this.fsPath)!
    }

    if (!sourceFileAst) {
      return {
        errors: [
          {
            description: `TS can't find source file ${this.fsPath} after waiting 1 second. Try saving your TypeScript file again.`,
            error: ErrorName.PathNotFound,
            location: this.fsPath,
          },
        ],
        result: null,
      }
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

    const transformedSourceFile = AssetSourceFile.transformSourceFile(sourceFileAst)
    const printer: ts.Printer = ts.createPrinter();

    const getNodeText = (node: ts.Node) => {
      return printer.printNode(ts.EmitHint.Unspecified, node, transformedSourceFile);
    }

    const result: {
      result: null
      errors: TsGdError[]
    } = { result: null, errors: [] }

    const parsedNode = parseNode(transformedSourceFile, {
      indent: "",
      isConstructor: false,
      scope: new Scope(watchProgram.getProgram().getProgram()),
      project: this.project,
      mostRecentControlStructureIsSwitch: false,
      isAutoload: this.isProjectAutoload(),
      program: watchProgram.getProgram().getProgram(),
      // NOTE: We use thie OLD sourceFileAst because tsutils can't process our
      // new one after we used TS to transform it - it will crash if we do so.
      usages: utils.collectVariableUsage(sourceFileAst),
      addError: (newError) => result.errors.push(newError),
      getNodeText,
    })

    // TODO: Only do this once per program run max!
    fs.mkdirSync(path.dirname(this.gdPath), { recursive: true })
    fs.writeFileSync(this.gdPath, parsedNode.content)

    for (const { content, name } of parsedNode.enums ?? []) {
      fs.writeFileSync(this.getEnumPath(name), content)
    }

    const err = this.checkForAutoloadChanges()

    if (err !== null) {
      result.errors.push(err)
    }

    if (this.isAutoload()) {
      const error = this.validateAutoloadClass()

      if (error !== null) {
        result.errors.push(error)
      }
    }

    return result
  }

  validateAutoloadClass(): TsGdError | null {
    const classNode = this.getClassNode()

    if ("error" in classNode) {
      return classNode
    }

    const modifiers = classNode?.modifiers?.map((x) => x.getText()) ?? []

    if (!this.getAutoloadNameFromExportedVariable()) {
      return {
        error: ErrorName.AutoloadNotExported,
        description: `Be sure to export an instance of your autoload class, e.g.:

${chalk.white(
  `export const ${this.getGodotClassName()} = new ${this.exportedTsClassName()}()`
)}        
        `,
        location: classNode ?? this.fsPath,
      }
    }

    return null
  }

  getGodotClassName(): string {
    return this.fsPath.slice(this.fsPath.lastIndexOf("/") + 1, -".ts".length)
  }

  checkForAutoloadChanges(): TsGdError | null {
    const autoloadClassName = this.getGodotClassName()
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

    if (!prevAutoload && shouldBeAutoload) {
      if (!this.isProjectAutoload()) {
        this.project.godotProject.addAutoload(autoloadClassName, this.resPath)
      }

      if (!this.isDecoratedAutoload()) {
        shouldBeAutoload = false

        const classNode = this.getClassNode()

        return {
          error: ErrorName.AutoloadProjectButNotDecorated,
          description: `Since this is an autoload class in Godot, you must put ${chalk.white(
            "@autoload"
          )} the line before the class declaration.`,
          location: "error" in classNode ? this.fsPath : classNode,
        }
      }
    }

    if (prevAutoload && !shouldBeAutoload) {
      if (this.isProjectAutoload()) {
        this.project.godotProject.removeAutoload(
          autoloadClassName,
          this.resPath
        )
      }

      if (this.isDecoratedAutoload()) {
        shouldBeAutoload = true

        const classNode = this.getClassNode()

        return {
          error: ErrorName.AutoloadDecoratedButNotProject,
          description: `Since you removed this as an autoload class in Godot, you must remove ${chalk.white(
            "@autoload"
          )}.`,
          location: "error" in classNode ? this.fsPath : classNode,
        }
      }
    }

    this._isAutoload = shouldBeAutoload

    return null
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
      this.getGodotClassName(),
      this.resPath
    )
  }
}
