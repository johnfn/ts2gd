import fs from "fs"
import path from "path"
import { parseStringPromise } from "xml2js"
import { buildBase } from "./generate_base"
import { TsGdProjectClass } from "./project/project"

function formatJsDoc(input: string): string {
  if (!input) {
    return `/** No documentation provided. */`
  }

  let lines = input.split("\n")

  if (lines.length === 1) {
    return `/** ${input} */`
  }

  const indentationLength = lines[1].length - lines[1].trimStart().length

  // All lines are indented except the first one for some reason.
  lines = [
    lines[0],
    ...lines.slice(1).map((line) => line.slice(indentationLength)),
  ]

  lines = lines.filter((line) => line.trim() !== "")

  let result = "/**\n"

  let insideCodeBlock = false

  for (let line of lines) {
    if (line.includes("[codeblock]")) {
      result += " * @example \n"
      insideCodeBlock = true
    }
    if (line.includes("[/codeblock]")) {
      result += " * @summary \n"
      insideCodeBlock = false
    }
    if (line.includes("[codeblocks]")) {
      result += " * @example \n"
      insideCodeBlock = true
    }
    if (line.includes("[/codeblocks]")) {
      result += " * @summary \n"
      insideCodeBlock = false
    }

    line = line.replaceAll("[gdscript]", "")
    line = line.replaceAll("[/gdscript]", "")
    line = line.replaceAll("[csharp]", "")
    line = line.replaceAll("[/csharp]", "")
    line = line.replaceAll("[b]", "**")
    line = line.replaceAll("[/b]", "**")
    line = line.replaceAll("[i]", "**")
    line = line.replaceAll("[/i]", "**")
    line = line.replaceAll("[code]", "`")
    line = line.replaceAll("[/code]", "`")
    line = line.replaceAll("[codeblock]", "")
    line = line.replaceAll("[/codeblock]", "")
    line = line.replaceAll("[codeblocks]", "")
    line = line.replaceAll("[/codeblocks]", "")

    result += " * " + line + "\n" + (!insideCodeBlock ? " *\n" : "")
  }

  result += "*/"

  return result
}

export function generateGodotLibraryDefinitions(
  project: TsGdProjectClass
): void {
  // TODO: Refactor this out
  let p1 = "/Users/johnfn/code/tsgd/godot/modules/csg/doc_classes"
  let p2 = "/Users/johnfn/code/tsgd/godot/doc/classes"

  const xmlPaths = [
    ...fs.readdirSync(p1).map((x) => path.join(p1, x)),
    ...fs.readdirSync(p2).map((x) => path.join(p2, x)),
  ].filter((file) => file.endsWith(".xml"))

  fs.mkdirSync(TsGdProjectClass.Paths.godotDefsPath, { recursive: true })

  function convertType(godotType: string): string {
    if (godotType === "int") {
      return "int"
    }

    if (godotType === "float") {
      return "float"
    }

    if (godotType === "bool") {
      return "boolean"
    }

    if (godotType === "Array") {
      return "any[]"
    }

    if (godotType === "Variant") {
      return "any"
    }

    if (godotType === "NodePath") {
      // TODO
      return "NodePathType"
    }

    return godotType
  }

  function sanitizeName(name: string): string {
    if (
      name === "with" ||
      name === "var" ||
      name === "class" ||
      name === "default" ||
      name === "in"
    ) {
      return "_" + name
    }

    // for enum names in @GlobalScope
    name = name.replace(".", "_")

    // Bizarre case in SliderJoint3D.xml
    if (name.includes("/")) {
      name = '"' + name + '"'
    }

    return name
  }

  const singletons: string[] = []

  async function parseFile(path: string) {
    const content = fs.readFileSync(path, "utf-8")
    const json = await parseStringPromise(content)
    const methodsXml: any[] = json.class.methods?.[0].method ?? []
    const members = (json.class.members ?? [])[0]?.member ?? []
    let className = json.class["$"].name
    const inherits = json.class["$"].inherits
    const constants = (json.class.constants ?? [])[0]?.constant ?? []
    const signals = (json.class.signals ?? [])[0]?.signal ?? []

    const methods = methodsXml.map((method: any) => {
      const name = method["$"].name as string
      const args = method.argument
      const isConstructor = name === className
      const docString = formatJsDoc(method.description[0].trim())
      let returnType = convertType(method.return?.[0]["$"].type) ?? "any"
      let argumentList: string = ""

      if (args) {
        argumentList = args
          .map((arg: any) => {
            let argName = sanitizeName(arg["$"].name)
            let argType = convertType(arg["$"].type)
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

      return {
        name,
        argumentList,
        isConstructor,
        docString,
        returnType,
        isAbstract,
      }
    })

    const constructorInfo = methods.filter((method) => method.isConstructor)

    if (className === "Signal") {
      className = "Signal<T extends any[]>"
    }

    if (singletons.includes(className)) {
      className += "Class"
    }

    const output = `
${formatJsDoc(json.class.description[0])}
declare class ${className}${inherits ? ` extends ${inherits}` : ""} {

  
${formatJsDoc(json.class.description[0])}
${(() => {
  if ((className as string).toLowerCase() === "signal<t>") {
    return ""
  }

  let constructors = ""

  if (constructorInfo.length === 0) {
    constructors += `  "new"(): this;\n`
  } else {
    constructors += `
${constructorInfo
  .map((inf) => `  constructor(${inf.argumentList});`)
  .join("\n")}
`
  }

  // We also need to tell typescript that this object can be extended from, e.g. class Foo extends Object {}
  // Unfortunately by adding this, we also make new Object() not a syntax error - even
  // though it really should be.

  constructors += `  static "new"(): this;\n`

  return constructors
})()}

${members
  .map((member: any) => {
    const name = member["$"].name.trim()
    if (!member["_"]) {
      return ""
    }

    return `
${formatJsDoc(member["_"].trim())}
${sanitizeName(member["$"].name)}: ${convertType(member["$"].type)};`
  })
  .join("\n")}

${methods
  .map((method) => {
    if (method.name === "get_node") {
      return ""
    }

    if (method.name === "get_nodes_in_group") {
      return `get_nodes_in_group<T extends keyof Groups>(group: T): Groups[T][]`
    }

    if (method.name === "has_group") {
      return `has_group<T extends keyof Groups>(name: T): bool`
    }

    // This is a constructor
    if (method.isConstructor) {
      return ""
    }

    // Special case
    if (method.name === "connect") {
      return ""
    }

    if (method.name === "emit_signal") {
      return "emit_signal<U extends any[], T extends Signal<U>>(signal: T, ...args: U): void;"
    }

    return `${method.docString}
${method.isAbstract ? "protected " : ""}${method.name}(${
      method.argumentList
    }): ${method.returnType};`
  })
  .join("\n\n")}

  connect<T extends SignalsOf<${className}>, U extends Node>(signal: T, node: U, method: keyof U): number;

${(() => {
  // Generate wrapper functions for operator overloading stuff.

  if (
    className === "Vector2" ||
    className === "Vector2i" ||
    className === "Vector3" ||
    className === "Vector3i"
  ) {
    return `
add(other: number | ${className}): ${className};
sub(other: number | ${className}): ${className};
mul(other: number | ${className}): ${className};
div(other: number | ${className}): ${className};
`
  } else {
    return ""
  }
})()}

${constants
  .map((c: any) => {
    const value: string = c["$"].value.trim()
    let type: string | null = null

    let genericClassNameRe = /([A-Z][a-z]*)\(.*\)/
    const match = genericClassNameRe.exec(value)

    if (match) {
      type = match[1]
    } else if (value.startsWith("Vector2")) {
      type = "Vector2"
    } else if (value.startsWith("Vector3")) {
      type = "Vector3"
    } else if (value.startsWith('"')) {
      type = "string"
    } else if (value.startsWith("false") || value.startsWith("true")) {
      type = "boolean"
    } else if (/^[0-9]+$/.test(value)) {
      type = "number"
    }

    if (
      c["$"].value &&
      (type === "string" || type === "boolean" || type === "number")
    ) {
      return `${formatJsDoc(c["_"] || "")}\nstatic ${c["$"].name}: ${
        c["$"].value
      };\n`
    } else {
      if (type) {
        return `${formatJsDoc(c["_"] || "")}\nstatic ${c["$"].name}: ${type};\n`
      } else {
        return `${formatJsDoc(c["_"] || "")}\n static ${
          c["$"].name
        }: ${type};\n`
      }
    }
  })
  .join("\n")}

  ${signals
    .map((signal: any) => {
      return `${formatJsDoc(signal.description[0])}\n${
        signal["$"].name
      }: Signal<(${(signal.argument || [])
        .map((arg: any) => arg["$"].name + ": " + convertType(arg["$"].type))
        .join(", ")}) => void>\n`
    })
    .join("\n")}
}
`

    return output
  }

  async function parseGlobalScope(path: string) {
    const content = fs.readFileSync(path, "utf-8")
    const json = await parseStringPromise(content)
    const methods = json.class.methods[0].method ?? []
    const members = (json.class.members ?? [])[0]?.member ?? []
    const className = json.class["$"].name
    const inherits = json.class["$"].inherits
    const constants = (json.class.constants ?? [])[0]?.constant ?? []
    const enums: { [key: string]: any } = {}

    for (const c of constants) {
      const doc = c["_"]
      const enumName = c["$"].enum

      if (enumName) {
        enums[enumName] = [
          ...(enums[enumName] || []),
          { ...c["$"], doc: c["_"] },
        ]
      }
    }

    const result = `
declare const load: <T extends AssetPath>(path: T) => AssetType[T];
${members
  .map((member: any) => {
    const name = sanitizeName(member["$"].name)
    // these dont have .xml files
    const commentOut = name === "VisualScriptEditor" || name === "GodotSharp"

    singletons.push(name)
    if (!member["_"]) {
      return ""
    }

    return `
${formatJsDoc(member["_"].trim())}
${commentOut ? "//" : ""}declare const ${name}: ${convertType(
      member["$"].type
    )}Class;`
  })
  .join("\n")}

${Object.keys(enums)
  .map((key) => {
    return `
    declare enum ${sanitizeName(key)} {
      ${enums[key]
        .map((enumItem: any) => {
          return `${formatJsDoc(enumItem.doc)}\n${enumItem.name} = ${
            /^-?\d+$/.test(enumItem.value)
              ? enumItem.value
              : '"' + enumItem.value + '"'
          }`
        })
        .join(",\n")}
    }
    `
  })
  .join("\n")}
    `

    return result
  }

  async function buildGlobals() {
    const result = await parseGlobalScope(path.join(p2, "@GlobalScope.xml"))
    fs.writeFileSync(
      path.join(TsGdProjectClass.Paths.godotDefsPath, "@globals.d.ts"),
      result
    )
  }

  async function buildDefinitions() {
    for (let xmlPath of xmlPaths) {
      const fileName = path.basename(xmlPath)

      if (fileName === "@GlobalScope.xml") {
        continue
      }

      if (fileName === "Array.xml") {
        continue
      }

      if (fileName === "PackedScene.xml") {
        continue
      }

      const result = await parseFile(xmlPath)

      fs.writeFileSync(
        path.join(
          TsGdProjectClass.Paths.godotDefsPath,
          fileName.slice(0, -4) + ".d.ts"
        ),
        result
      )
    }
  }

  async function main() {
    await buildGlobals()
    await buildBase(TsGdProjectClass.Paths.godotDefsPath)
    await buildDefinitions()
  }

  // async function debug() {
  //   let fileName = 'KinematicBody2D.xml';
  //   const result = await parseFile(godotDocumentationPath + fileName);

  //   console.log(result);
  // }

  main()
}
