import { AssetBase } from "./asset_base"

export class AssetGlb extends AssetBase {
  static extensions = [".glb"]

  tsType(): string {
    return "Spatial"
  }
}

export default AssetGlb
