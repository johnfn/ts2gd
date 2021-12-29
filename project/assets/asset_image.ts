import { AssetBase } from "./asset_base"

export class AssetImage extends AssetBase {
  static extensions = [".gif", ".png", ".jpg", ".bmp"]

  tsType(): string {
    return "StreamTexture"
  }
}

export default AssetImage
