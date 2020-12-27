import { AssetSourceFile } from "./asset_source_file"
import { TsGdProjectClass } from "./project"

export class AssetGodotClass {
  resPath: string
  fsPath: string
  project: TsGdProjectClass

  constructor(path: string, project: TsGdProjectClass) {
    this.fsPath = path
    this.resPath = TsGdProjectClass.FsPathToResPath(this.fsPath)
    this.project = project
  }

  sourceFile(): AssetSourceFile {
    const result = this.project.sourceFiles.find(
      (file) => file.resPath === this.resPath
    )

    if (!result) {
      console.log("Can't find a source file for")
      console.log(`  => ${this.fsPath}`)

      throw new Error("Can't recover from this")
    }

    return result
  }

  tsImportName(): string {
    const sourceFile = this.sourceFile()

    return `import('${sourceFile.fsPath.slice(0, -".ts".length)}').${
      sourceFile.className
    }`
  }
}
