import path from "path"
import fs from "fs"
import { TsGdProjectClass } from "./project/project"

export const buildSceneImports = (project: TsGdProjectClass) => {
  let result = ``

  for (const scene of project.godotScenes()) {
    const sceneScript = scene.rootNode.getScript(project.godotScenes())

    if (!sceneScript) {
      continue
    }
    const sourceFile = project
      .sourceFiles()
      .find((sf) => sf.gdPath === sceneScript.fsPath)

    if (!sourceFile) {
      continue
    }

    if (!sourceFile.className()) {
      continue
    }

    result += `export const ${path.basename(
      scene.fsPath,
      ".tscn"
    )}Tscn: PackedScene<import('${sourceFile.fsPath.slice(
      0,
      -".ts".length
    )}').${sourceFile.className()}>\n`
  }

  const destPath = path.join(project.godotDefsPath, "@scenes.d.ts")

  fs.writeFileSync(destPath, result)
}
