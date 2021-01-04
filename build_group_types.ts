import path from "path"
import fs from "fs"

import { AssetSourceFile } from "./project/asset_source_file"
import { TsGdProjectClass } from "./project/project"

export const buildGroupTypes = (project: TsGdProjectClass) => {
  const groupNameToTypes: { [key: string]: AssetSourceFile[] } = {}

  for (const scene of project.godotScenes()) {
    for (const node of scene.nodes) {
      const script = node.getScript()

      if (!script) {
        continue
      }

      const type = script.className()

      if (!type) {
        continue
      }

      for (const group of node.groups) {
        groupNameToTypes[group] = [...(groupNameToTypes[group] ?? []), script]
      }
    }
  }

  let result = `declare type Groups = {`

  for (const [group, commonTypes] of Object.entries(groupNameToTypes)) {
    result += `  '${group}': ${commonTypes
      .map((type) => type.tsType())
      .join(" | ")}\n`
  }

  result += `}`

  const destPath = path.join(project.godotDefsPath, "@groups.d.ts")

  fs.writeFileSync(destPath, result)
}
