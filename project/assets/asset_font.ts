import { AssetBase } from "./asset_base"

export class AssetFont extends AssetBase {
  static extensions = [".ttf"]

  get tsType() {
    return "DynamicFontData"
  }
}

export default AssetFont
