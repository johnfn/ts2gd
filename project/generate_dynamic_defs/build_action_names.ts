import fs from "fs"
import path from "path"

import { TsGdProjectClass } from "../project"

export const buildActionNames = (project: TsGdProjectClass) => {
  const actions = project.godotProject.actionNames.filter(
    (name) => name !== "$section"
  )
  let result = ""

  if (actions.length === 0) {
    result = `declare type Action = never`
  } else {
    result = `declare type Action = ${project.godotProject.actionNames
      .filter((name) => name !== "$section")
      .map((name) => `'${name}'`)
      .join(" | ")}`
  }

  const destPath = path.join(
    TsGdProjectClass.Paths.dynamicGodotDefsPath,
    "@actions.d.ts"
  )

  fs.writeFileSync(destPath, result)
}
