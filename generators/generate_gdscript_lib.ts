import fs from "fs"
import { parseStringPromise } from "xml2js"
import {
  formatJsDoc,
  godotTypeToTsType,
  sanitizeGodotNameForTs,
} from "./generate_library"

export type GodotXMLMethod = {
  $: { name: string }
  return?: [{ $: { type: string } }]
  argument: {
    $: {
      index: string /* e.g. "1" */
      name: string
      type: string
      default?: string
    }
  }[]
  description: [string]
}

export const getCodeForMethod = (
  generateAsGlobals: boolean,
  props: {
    name: string
    isConstructor: boolean
    docString: string
    argumentList: string
    returnType: string
    isAbstract: boolean
  }
) => {
  const {
    name,
    isConstructor,
    argumentList,
    docString,
    isAbstract,
    returnType,
  } = props

  switch (name) {
    case "get_node":
    case "connect":
    case "yield":
    case "typeof":
    case "print":
      return ""
    case "get_nodes_in_group":
      return `get_nodes_in_group<T extends keyof Groups>(group: T): Groups[T][]`
    case "has_group":
      return `has_group<T extends keyof Groups>(name: T): bool`
    case "emit_signal":
      return "emit_signal<U extends any[], T extends Signal<U>>(signal: T, ...args: U): void;"
    default:
      if (isConstructor) {
        return ""
      }

      if (generateAsGlobals) {
        return `${docString}
declare const ${name}: (${argumentList}) => ${returnType}
    `
      } else {
        return `${docString}
${isAbstract ? "protected " : ""}${name}(${argumentList}): ${returnType};`
      }
  }
}

export const parseMethod = (
  method: GodotXMLMethod,
  props?: {
    containgClassName?: string
    generateAsGlobals?: boolean
  }
) => {
  const containingClassName = props?.containgClassName ?? undefined
  const generateAsGlobal = props?.generateAsGlobals ?? false
  const name = method.$.name
  const args = method.argument
  const isConstructor =
    containingClassName !== undefined && name === containingClassName
  const docString = formatJsDoc(method.description[0].trim())
  let returnType = godotTypeToTsType(method.return?.[0]["$"].type) ?? "any"
  let argumentList: string = ""

  if (args) {
    argumentList = args
      .map((arg) => {
        let argName = sanitizeGodotNameForTs(arg["$"].name)
        let argType = godotTypeToTsType(arg["$"].type)
        let isOptional = !!arg["$"].default

        if (argType === "StringName") {
          if (argName === "group") {
            argType = "keyof Groups"
          }

          if (argName === "action") {
            argType = "Action"
          }
        }

        return `${argName}${isOptional ? "?" : ""}: ${argType}`
      })
      .join(", ")
  }

  // Special case for TileSet#tile_get_shapes
  if (name === "tile_get_shapes") {
    returnType = `{
  autotile_coord: Vector2,
  one_way: bool,
  one_way_margin: int,
  shape: CollisionShape2D,
  shape_transform: Transform2D,
}[]`
  }

  const isAbstract = name.startsWith("_")

  const result = {
    name,
    argumentList,
    isConstructor,
    docString,
    returnType,
    isAbstract,
  }

  return {
    ...result,
    codegen: getCodeForMethod(generateAsGlobal, result),
  }
}

export const generateGdscriptLib = async (path: string) => {
  const content = fs.readFileSync(path, "utf-8")
  const json = await parseStringPromise(content)

  let result = ""

  const globalMethods: GodotXMLMethod[] = json["class"].methods[0].method
  const parsedMethods = globalMethods.map((m) =>
    parseMethod(m, { generateAsGlobals: true })
  )

  for (const parsedMethod of parsedMethods) {
    result += `
${parsedMethod.codegen}
    `
  }

  return result

  // console.log(result)
}

// generateGdscriptLib(
//   "/Users/johnfn/code/tsgd/godot/modules/gdscript/doc_classes/@GDScript.xml"
// )
