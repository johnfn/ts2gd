import { BaseAsset } from "./base_asset"

export class AssetGlb extends BaseAsset {
  static extensions = ["glb"]

  tsType(): string {
    return "Spatial"
  }
}

export default AssetGlb
