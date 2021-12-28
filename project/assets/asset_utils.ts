import { AssetFont } from "./asset_font"
import { AssetGlb } from "./asset_glb"
import { AssetGodotScene } from "./asset_godot_scene"
import { AssetImage } from "./asset_image"

export function allAssetExtensions() {
  return [
    ...AssetFont.extensions(),
    ...AssetImage.extensions(),
    ...AssetGodotScene.extensions(),
    ...AssetGlb.extensions(),
    ".godot",
  ]
}
