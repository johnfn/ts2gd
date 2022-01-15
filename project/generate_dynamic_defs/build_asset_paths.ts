import fs from "fs"
import path from "path"

import { isAssetGodotScene, isAssetSourceFile } from "../assets"
import TsGdProject from "../project"

export default function buildAssetPathsType(project: TsGdProject) {
  const assetFileContents = `
declare type AssetType = {
${project.assets
  .filter((obj) => obj.tsType !== null)
  .map((obj) => {
    if (isAssetSourceFile(obj) || isAssetGodotScene(obj)) {
      return `  '${obj.resPath}': PackedScene<${obj.tsType}>`
    }

    return `  '${obj.resPath}': ${obj.tsType}`
  })
  .join(",\n")}
}

declare type SceneName =
${project.assets
  .filter(isAssetGodotScene)
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
