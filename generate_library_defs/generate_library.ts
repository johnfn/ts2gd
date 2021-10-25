import fs from "fs"
import path from "path"
import { parseStringPromise } from "xml2js"
import { TsGdProjectClass } from "../project/project"
import { copyFolderRecursiveSync } from "../ts_utils"
import { buildBase as writeBaseDefinitions } from "./generate_base"
import {
  generateGdscriptLib,
  GodotXMLMethod,
  parseMethod,
} from "./generate_gdscript_lib"

export function sanitizeGodotNameForTs(
  name: string,
  type: "argument" | "property"
): string {
  if (
    name === "with" ||
    name === "var" ||
    name === "class" ||
    name === "default" ||
    name === "in"
  ) {
    if (type === "argument") {
      return "_" + name
    } else {
      return `"${name}"`
    }
  }

  // for enum names in @GlobalScope
  name = name.replace(".", "_")

  // Bizarre case in SliderJoint3D.xml
  if (name.includes("/")) {
    if (type === "argument") {
      return name.replace("/", "_")
    } else {
      return `"${name}"`
    }
  }

  return name
}

export function godotTypeToTsType(godotType: string): string {
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

  if (godotType === "PackedScene") {
    return "PackedScene<any>"
  }

  if (godotType === "Variant") {
    return "any"
  }

  if (godotType === "String") {
    return "string"
  }

  if (godotType.startsWith("Transform2D")) {
    return "Transform2D"
  }

  if (godotType === "Dictionary") {
    return "Dictionary<any, any>"
  }

  if (godotType === "NodePath") {
    // TODO
    return "NodePathType"
  }

  if (!!godotType.match(/^[0-9]+$/)) {
    return "int"
  }

  return godotType
}

export function formatJsDoc(input: string): string {
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

export async function generateGodotLibraryDefinitions(): Promise<void> {
  // TODO: Refactor this out
  let csgClassesPath = path.join(
    TsGdProjectClass.Paths.godotSourceRepoPath ?? "",
    "modules/csg/doc_classes"
  )
  let normalClassesPath = path.join(
    TsGdProjectClass.Paths.godotSourceRepoPath ?? "",
    "doc/classes"
  )
  let gdscriptPath = path.join(
    TsGdProjectClass.Paths.godotSourceRepoPath ?? "",
    "modules/gdscript/doc_classes"
  )

  fs.mkdirSync(TsGdProjectClass.Paths.staticGodotDefsPath, { recursive: true })
  fs.mkdirSync(TsGdProjectClass.Paths.dynamicGodotDefsPath, { recursive: true })

  const singletons: string[] = []

  async function parseFile(path: string) {
    const content = fs.readFileSync(path, "utf-8")
    const json = await parseStringPromise(content)
    const methodsXml: GodotXMLMethod[] = json.class.methods?.[0].method ?? []
    const members = (json.class.members ?? [])[0]?.member ?? []
    let className: string = json.class["$"].name
    const inherits = json.class["$"].inherits
    const constants = (json.class.constants ?? [])[0]?.constant ?? []
    const signals = (json.class.signals ?? [])[0]?.signal ?? []
    const methods = methodsXml.map((method) =>
      parseMethod(method, { containgClassName: className })
    )
    const constructorInfo = methods.filter((method) => method.isConstructor)

    // This is true for classes that can be constructed without a new keyword, e.g. const myVector = Vector2();
    let isSpecialConstructorClass =
      className === "Vector2" || className === "Vector3"

    if (className === "Signal") {
      className = "Signal<T extends (...args: any[]): any>"
    }

    if (singletons.includes(className)) {
      className += "Class"
    }

    const constructors = (() => {
      if (className.toLowerCase() === "signal<t>") {
        return ""
      }

      let typeAnnotation = `: ${className}`
      let constructors = ""

      if (constructorInfo.length === 0) {
        constructors += `  new()${typeAnnotation}; \n`
      } else {
        constructors += `
${constructorInfo
  .map((inf) => `  new(${inf.argumentList})${typeAnnotation};`)
  .join("\n")}
`
      }

      // This is for being able to do etc. const x = Vector2();
      if (isSpecialConstructorClass) {
        constructors += `
${constructorInfo
  .map((inf) => `  (${inf.argumentList})${typeAnnotation};`)
  .join("\n")}
`
      }

      if (!isSpecialConstructorClass) {
        constructors += `  static "new"()${typeAnnotation} \n`
      }

      return constructors
    })()

    const output = `
${formatJsDoc(json.class.description[0])}
${(() => {
  if (isSpecialConstructorClass) {
    return `declare class ${className}Constructor {`
  } else {
    return `declare class ${className}${
      inherits ? ` extends ${inherits} ` : ""
    } {`
  }
})()}

  
${formatJsDoc(json.class.description[0])}
${isSpecialConstructorClass ? "" : constructors}
${members
  .map((property: any) => {
    const propertyName = sanitizeGodotNameForTs(property["$"].name, "property")

    if (!property["_"]) {
      return ""
    }

    // Godot allows for a method and a variable with the same name, but TS does not.
    if (propertyName === "rotate" && className === "PathFollow2D") {
      return
    }

    return `
${formatJsDoc(property["_"].trim())}
${propertyName}: ${godotTypeToTsType(property["$"].type)};`
  })
  .join("\n")}

${methods
  .map((method) => {
    return method.codegen
  })
  .join("\n\n")}

  connect<T extends SignalsOf<${className}Signals>>(signal: T, method: SignalFunction<${className}Signals[T]>): number;

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
    let genericClassNameRe = /([A-Z][a-zA-Z0-9]*)\(.*\)/
    const match = genericClassNameRe.exec(value)
    const type = godotTypeToTsType(match?.[1] ?? "any")

    if (type) {
      return `${formatJsDoc(c["_"] || "")}\nstatic ${c["$"].name}: ${type};\n`
    } else {
      return `${formatJsDoc(c["_"] || "")}\n static ${c["$"].name}: ${type};\n`
    }
  })
  .join("\n")}
}
${(() => {
  if (isSpecialConstructorClass) {
    return `
declare type ${className} = ${className}Constructor;
declare var ${className}: typeof ${className}Constructor & {
  ${constructors}
}`
  }

  return ""
})()}

declare class ${className}Signals${
      inherits ? ` extends ${inherits}Signals` : ""
    } {
  ${signals
    .map((signal: any) => {
      return `${formatJsDoc(signal.description[0])}\n${
        signal["$"].name
      }: Signal<(${(signal.argument || [])
        .map(
          (arg: any) => arg["$"].name + ": " + godotTypeToTsType(arg["$"].type)
        )
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
    const properties = (json.class.members ?? [])[0]?.member ?? []
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
declare const preload: <T extends AssetPath>(path: T) => AssetType[T];
declare function remotesync(target: any, key: string, descriptor: any): any
declare function remote(target: any, key: string, descriptor: any): any

${properties
  .map((property: any) => {
    const name = sanitizeGodotNameForTs(property["$"].name, "property")
    // these dont have .xml files
    let commentOut = name === "VisualScriptEditor" || name === "GodotSharp"

    // TODO:
    if (name === "NavigationMeshGenerator") {
      commentOut = true
    }

    singletons.push(name)

    if (!property["_"]) {
      return ""
    }

    return `
${formatJsDoc(property["_"].trim())}
${commentOut ? "//" : ""}declare const ${name}: ${godotTypeToTsType(
      property["$"].type
    )}Class;`
  })
  .join("\n")}

${Object.keys(enums)
  .map((key) => {
    return `
    declare enum ${sanitizeGodotNameForTs(key, "argument")} {
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

  async function writeLibraryDefinitions() {
    if (!fs.existsSync(csgClassesPath) || !fs.existsSync(normalClassesPath)) {
      console.info("No Godot source installation found, writing from backup...")

      let localGodotDefs = path.join(__dirname, "..", "..", "_godot_defs")

      copyFolderRecursiveSync(localGodotDefs, TsGdProjectClass.Paths.rootPath)

      console.info("Done.")

      return
    }

    // This must come first because it parses out singletons
    // TODO - clean that up.
    const globalScope = await parseGlobalScope(
      path.join(normalClassesPath, "@GlobalScope.xml")
    )

    fs.writeFileSync(
      path.join(TsGdProjectClass.Paths.staticGodotDefsPath, "@globals.d.ts"),
      globalScope
    )

    const globalFunctions = await generateGdscriptLib(
      path.join(gdscriptPath, "@GDScript.xml")
    )

    fs.writeFileSync(
      path.join(
        TsGdProjectClass.Paths.staticGodotDefsPath,
        "@global_functions.d.ts"
      ),
      globalFunctions
    )

    const xmlPaths = [
      ...fs
        .readdirSync(csgClassesPath)
        .map((x) => path.join(csgClassesPath, x)),
      ...fs
        .readdirSync(normalClassesPath)
        .map((x) => path.join(normalClassesPath, x)),
    ].filter((file) => file.endsWith(".xml"))

    for (let fullPath of xmlPaths) {
      const fileName = path.basename(fullPath)

      if (fileName === "@GlobalScope.xml") {
        continue
      }

      if (fileName === "Array.xml") {
        continue
      }

      if (fileName === "Dictionary.xml") {
        continue
      }

      if (fileName === "int.xml") {
        continue
      }

      if (fileName === "float.xml") {
        continue
      }

      if (fileName === "PackedScene.xml") {
        continue
      }

      const result = await parseFile(fullPath)

      fs.writeFileSync(
        path.join(
          TsGdProjectClass.Paths.staticGodotDefsPath,
          fileName.slice(0, -4) + ".d.ts"
        ),
        result
      )
    }
  }

  async function main() {
    writeBaseDefinitions()
    await writeLibraryDefinitions()
  }

  // async function debug() {
  //   let fileName = 'KinematicBody2D.xml';
  //   const result = await parseFile(godotDocumentationPath + fileName);

  //   console.info(result);
  // }

  await main()
}
