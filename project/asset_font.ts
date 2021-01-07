import { BaseAsset } from "./base_asset"
import { TsGdProjectClass } from "./project"

export class AssetFont extends BaseAsset {
  resPath: string
  fsPath: string
  project: TsGdProjectClass

  constructor(path: string, project: TsGdProjectClass) {
    super()
    this.fsPath = path
    this.resPath = TsGdProjectClass.FsPathToResPath(this.fsPath)
    this.project = project
  }

  tsType(): string {
    return "DynamicFontData"
  }
}
