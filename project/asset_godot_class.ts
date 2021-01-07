import { AssetSourceFile } from "./asset_source_file"
import { BaseAsset } from "./base_asset"
import { TsGdProjectClass } from "./project"

// TODO - I don't think this is needed. You should be able to derive it strictly from
// TS files

export class AssetGodotClass extends BaseAsset {
  resPath: string
  fsPath: string
  project: TsGdProjectClass
  isEnum: boolean

  constructor(path: string, project: TsGdProjectClass) {
    super()

    this.fsPath = path
    this.resPath = TsGdProjectClass.FsPathToResPath(this.fsPath)
    this.project = project
    this.isEnum = false

    if (this.fsPath.endsWith("_enum.gd")) {
      this.isEnum = true
    }
  }

  sourceFile(): AssetSourceFile | null {
    const result = this.project
      .sourceFiles()
      .find((file) => file.resPath === this.resPath)

    if (!result) {
      return null
    }

    return result
  }

  tsType(): string | null {
    const sourceFile = this.sourceFile()

    if (!sourceFile) {
      return null
    }

    const className = sourceFile.className()

    if (!className) {
      return null
    }

    return `import('${sourceFile.fsPath.slice(
      0,
      -".ts".length
    )}').${sourceFile.className()}`
  }
}
