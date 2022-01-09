import AssetFont from "./asset_font"
import AssetGlb from "./asset_glb"
import AssetGodotProjectFile from "./asset_godot_project_file"
import AssetGodotScene from "./asset_godot_scene"
import AssetImage from "./asset_image"

export function allNonTsAssetExtensions() {
  return [
    ...AssetFont.extensions,
    ...AssetImage.extensions,
    ...AssetGodotScene.extensions,
    ...AssetGlb.extensions,
    ...AssetGodotProjectFile.extensions,
  ]
}
