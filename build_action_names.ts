import path from "path"
import fs from "fs"
import { TsGdProjectClass } from "./project/project"

export const buildActionNames = (project: TsGdProjectClass) => {
  let result = `declare type Action = ${project.godotProject.actionNames
    .filter((name) => name !== "$section")
    .map((name) => `'${name}'`)
    .join(" | ")}`

  const destPath = path.join(project.godotDefsPath, "@actions.d.ts")

  fs.writeFileSync(destPath, result)
}
