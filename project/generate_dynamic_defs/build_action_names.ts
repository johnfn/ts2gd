import path from "path"
import fs from "fs"
import { TsGdProjectClass } from "../project"

export const buildActionNames = (project: TsGdProjectClass) => {
  let result = `declare type Action = ${project.godotProject.actionNames
    .filter((name) => name !== "$section")
    .map((name) => `'${name}'`)
    .join(" | ")}`

  const destPath = path.join(
    TsGdProjectClass.Paths.dynamicGodotDefsPath,
    "@actions.d.ts"
  )

  fs.writeFileSync(destPath, result)
}
