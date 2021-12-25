import fs from "fs"
import path from "path"

import { AssetGodotScene } from "../assets/asset_godot_scene"
import { AssetSourceFile } from "../assets/asset_source_file"
import TsGdProject from "../project"

export default function buildAssetPathsType(project: TsGdProject) {
  const assetFileContents = `
declare type AssetType = {
${project.assets
  .filter((obj) => obj.tsType() !== null)
  .map((obj) => {
    const tsType = obj.tsType()

    if (obj instanceof AssetSourceFile || obj instanceof AssetGodotScene) {
      return `  '${obj.resPath}': PackedScene<${tsType}>`
    }

    return `  '${obj.resPath}': ${tsType}`
  })
  .join(",\n")}
}

declare type SceneName =
${project.assets
  .filter((obj): obj is AssetGodotScene => obj instanceof AssetGodotScene)
  .map((obj) => `  | '${obj.resPath}'`)
  .join("\n")}

declare type AssetPath = keyof AssetType;
  `

  const destPath = path.join(
    project.paths.dynamicGodotDefsPath,
    "@asset_paths.d.ts"
  )
  fs.writeFileSync(destPath, assetFileContents)
}
