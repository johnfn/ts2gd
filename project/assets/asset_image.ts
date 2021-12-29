import { BaseAsset } from "./base_asset"

export class AssetImage extends BaseAsset {
  static extensions = ["gif", "png", "jpg", "bmp"]

  tsType(): string {
    return "StreamTexture"
  }
}

export default AssetImage
