import { AssetBase } from "./asset_base"

export class AssetFont extends AssetBase {
  static extensions = [".ttf"]

  tsType(): string {
    return "DynamicFontData"
  }
}

export default AssetFont
