import fs from "fs"
import path from "path"

import TsGdProject from "../project"

export default function buildActionNames(project: TsGdProject) {
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
    project.paths.dynamicGodotDefsPath,
    "@actions.d.ts"
  )

  fs.writeFileSync(destPath, result)
}
