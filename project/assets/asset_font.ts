import { TsGdProjectClass } from "../project"

import { BaseAsset } from "./base_asset"

export class AssetFont extends BaseAsset {
  resPath: string
  fsPath: string
  project: TsGdProjectClass

  static extensions() {
    return [".ttf"]
  }

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
