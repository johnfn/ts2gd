import TsGdProject from "../project"

import { BaseAsset } from "./base_asset"

export class AssetFont extends BaseAsset {
  resPath: string
  fsPath: string
  project: TsGdProject

  static extensions() {
    return [".ttf"]
  }

  constructor(path: string, project: TsGdProject) {
    super()
    this.fsPath = path
    this.resPath = project.paths.fsPathToResPath(this.fsPath)
    this.project = project
  }

  tsType(): string {
    return "DynamicFontData"
  }
}
