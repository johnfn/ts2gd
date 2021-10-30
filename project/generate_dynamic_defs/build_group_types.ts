import path from "path"
import fs from "fs"
import { TsGdProjectClass } from "../project"

export const buildGroupTypes = (project: TsGdProjectClass) => {
  const groupNameToTypes: { [key: string]: Set<string> } = {}

  for (const scene of project.godotScenes()) {
    for (const node of scene.nodes) {
      for (const group of node.groups) {
        groupNameToTypes[group] ??= new Set()
        groupNameToTypes[group].add(node.tsType())
      }
    }
  }

  let result = `declare type Groups = {\n`

  for (const [group, commonTypes] of Object.entries(groupNameToTypes)) {
    result += `  '${group}': ${[...commonTypes]
      .map((type) => type)
      .join(" | ")}\n`
  }

  result += `}`

  const destPath = path.join(
    TsGdProjectClass.Paths.dynamicGodotDefsPath,
    "@groups.d.ts"
  )

  fs.writeFileSync(destPath, result)
}
