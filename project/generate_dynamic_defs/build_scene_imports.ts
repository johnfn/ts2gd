import path from "path"
import fs from "fs"
import { TsGdProjectClass } from "../project"

export const buildSceneImports = (project: TsGdProjectClass) => {
  let result = ``

  for (const scene of project.godotScenes()) {
    // TODO: Handle errors

    result += `export const ${path.basename(
      scene.fsPath,
      ".tscn"
    )}Tscn: PackedScene<${scene.tsType() ?? "Node"}>;\n`
  }

  const destPath = path.join(
    TsGdProjectClass.Paths.dynamicGodotDefsPath,
    "@scenes.d.ts"
  )

  fs.writeFileSync(destPath, result)
}
