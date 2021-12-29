import fs from "fs"
import path from "path"

import TsGdProject from "../project"

export default function buildSceneImports(project: TsGdProject) {
  let result = ``

  for (const scene of project.godotScenes()) {
    // TODO: Handle errors

    result += `export const ${path.basename(
      scene.fsPath,
      ".tscn"
    )}Tscn: PackedScene<${scene.tsType ?? "Node"}>;\n`
  }

  const destPath = path.join(project.paths.dynamicGodotDefsPath, "@scenes.d.ts")

  fs.writeFileSync(destPath, result)
}
