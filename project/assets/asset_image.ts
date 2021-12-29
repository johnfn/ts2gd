import { AssetBase } from "./asset_base"

export class AssetImage extends AssetBase {
  static extensions = [".gif", ".png", ".jpg", ".bmp"]

  get tsType() {
    return "StreamTexture"
  }
}

export default AssetImage
