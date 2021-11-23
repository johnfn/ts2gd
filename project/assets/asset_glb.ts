import { TsGdProjectClass } from "../project"
import { BaseAsset } from "./base_asset"

export class AssetGlb extends BaseAsset {
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
    return "Spatial"
  }

  static extensions() {
    return [".glb"]
  }
}
