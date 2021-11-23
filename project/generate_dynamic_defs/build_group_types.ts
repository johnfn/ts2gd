import path from "path"
import fs from "fs"
import { TsGdProjectClass } from "../project"
import { TsGdError, TsGdReturn } from "../../errors"

export const buildGroupTypes = (
  project: TsGdProjectClass
): TsGdReturn<void> => {
  const groupNameToTypes: { [key: string]: Set<string> } = {}
  let errors: TsGdError[] = []

  for (const scene of project.godotScenes()) {
    for (const node of scene.nodes) {
      for (const group of node.groups) {
        groupNameToTypes[group] ??= new Set()

        const { result, errors: newErrors } = node.tsType()

        groupNameToTypes[group].add(result)
        errors = errors.concat(newErrors ?? [])
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

  return {
    result: void 0,
    errors,
  }
}
