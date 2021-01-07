import path from "path"
import fs from "fs"
import { TsGdProjectClass } from "./project/project"

export const buildSceneImports = (project: TsGdProjectClass) => {
  let result = ``

  for (const scene of project.godotScenes()) {
    const sceneScript = scene.rootNode.getScript()

    if (!sceneScript) {
      continue
    }

    if (!sceneScript.className()) {
      continue
    }

    result += `export const ${path.basename(
      scene.fsPath,
      ".tscn"
    )}Tscn: PackedScene<import('${sceneScript.fsPath.slice(
      0,
      -".ts".length
    )}').${sceneScript.className()}>\n`
  }

  const destPath = path.join(
    TsGdProjectClass.Paths.godotDefsPath,
    "@scenes.d.ts"
  )

  fs.writeFileSync(destPath, result)
}
