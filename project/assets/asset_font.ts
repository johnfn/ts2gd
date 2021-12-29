import { BaseAsset } from "./base_asset"

export class AssetFont extends BaseAsset {
  static extensions = ["ttf"]

  tsType(): string {
    return "DynamicFontData"
  }
}

export default AssetFont
