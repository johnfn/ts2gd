import { BaseAsset } from "./base_asset"
import { TsGdProjectClass } from "../project"
import { TsGdReturn } from "../../errors"

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

  tsType(): TsGdReturn<string> {
    return { result: "DynamicFontData" }
  }
}
