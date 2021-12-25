import TsGdProject from "../project"

import { BaseAsset } from "./base_asset"

export class AssetImage extends BaseAsset {
  resPath: string
  fsPath: string
  project: TsGdProject

  constructor(path: string, project: TsGdProject) {
    super()

    this.fsPath = path
    this.resPath = project.paths.fsPathToResPath(this.fsPath)
    this.project = project
  }

  tsType(): string {
    return "StreamTexture"
  }

  static extensions() {
    return [".gif", ".png", ".jpg", ".bmp"]
  }
}
