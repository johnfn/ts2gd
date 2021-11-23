import { TsGdProjectClass } from "../project"
import { BaseAsset } from "./base_asset"

export class AssetImage extends BaseAsset {
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
    return "StreamTexture"
  }

  static extensions() {
    return [".gif", ".png", ".jpg", ".bmp"]
  }
}
