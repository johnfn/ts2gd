import { AssetBase } from "./asset_base"

export class AssetGlb extends AssetBase {
  static extensions = [".glb"]

  get tsType() {
    return "Spatial"
  }
}

export default AssetGlb
