import path from "path"
import fs from "fs"
import { TsGdProjectClass } from "./project/project"

export const buildSceneImports = (project: TsGdProjectClass) => {
  let result = ``

  for (const scene of project.godotScenes()) {
    const sceneScript = scene.rootNode.getScript()

    if (sceneScript?.className()) {
      result += `export const ${path.basename(
        scene.fsPath,
        ".tscn"
      )}Tscn: PackedScene<import('${sceneScript.fsPath.slice(
        0,
        -".ts".length
      )}').${sceneScript.className()}>\n`
    } else {
      result += `export const ${path.basename(
        scene.fsPath,
        ".tscn"
      )}Tscn: PackedScene<Node>\n`
    }
  }

  const destPath = path.join(
    TsGdProjectClass.Paths.dynamicGodotDefsPath,
    "@scenes.d.ts"
  )

  fs.writeFileSync(destPath, result)
}
