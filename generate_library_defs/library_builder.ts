import fs from "fs"
import path from "path"

import { parseStringPromise } from "xml2js"

import { Paths } from "../project"
import { copyFolderRecursiveSync } from "../ts_utils"

import writeBaseDefinitions from "./generate_base"
import {
  GodotXMLMethod,
  generateGdscriptLib,
  parseMethod,
} from "./generate_gdscript_lib"
import {
  formatJsDoc,
  godotTypeToTsType,
  sanitizeGodotNameForTs,
} from "./generation_utils"

export class LibraryBuilder {
  constructor(private paths: Paths) {
    fs.mkdirSync(this.paths.staticGodotDefsPath, { recursive: true })
    fs.mkdirSync(this.paths.dynamicGodotDefsPath, { recursive: true })
  }

  async buildProject() {
    await this.writeLibraryDefinitions()
    writeBaseDefinitions(this.paths)
  }

  async parseGlobalScope(
    path: string
  ): Promise<{ result: string; singletons: string[] }> {
    const singletons: string[] = []
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

    return { result, singletons }
  }

  async parseFile(path: string, singletons: string[]) {
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
      className === "Vector2" ||
      className === "Vector3" ||
      className === "Vector2i" ||
      className === "Vector3i" ||
      className === "Rect2" ||
      className === "Color"

    let arrayAccessType = null

    if (className === "PoolByteArray") arrayAccessType = "number"
    if (className === "PoolColorArray") arrayAccessType = "Color"
    if (className === "PoolIntArray") arrayAccessType = "number"
    if (className === "PoolRealArray") arrayAccessType = "number"
    if (className === "PoolStringArray") arrayAccessType = "string"
    if (className === "PoolVector2Array") arrayAccessType = "Vector2"
    if (className === "PoolVector3Array") arrayAccessType = "Vector3"

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

${arrayAccessType ? `[n: number]: ${arrayAccessType};` : ""}  
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

  connect<T extends SignalsOf<${className}>>(signal: T, method: SignalFunction<${className}[T]>): number;

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

${signals
  .map((signal: any) => {
    return `${formatJsDoc(signal.description[0])}\n$${
      signal["$"].name
    }: Signal<(${(signal.argument || [])
      .map(
        (arg: any) => arg["$"].name + ": " + godotTypeToTsType(arg["$"].type)
      )
      .join(", ")}) => void>\n`
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
`

    return output
  }

  async writeLibraryDefinitions() {
    if (
      !fs.existsSync(this.paths.csgClassesPath) ||
      !fs.existsSync(this.paths.normalClassesPath)
    ) {
      console.info("No Godot source installation found, writing from backup...")

      let localGodotDefs = path.join(__dirname, "..", "..", "_godot_defs")

      copyFolderRecursiveSync(localGodotDefs, this.paths.rootPath)

      console.info("Done.")

      return
    }

    // This must come first because it parses out singletons
    // TODO - clean that up.
    const { result: globalScope, singletons } = await this.parseGlobalScope(
      path.join(this.paths.normalClassesPath, "@GlobalScope.xml")
    )

    fs.writeFileSync(
      path.join(this.paths.staticGodotDefsPath, "@globals.d.ts"),
      globalScope
    )

    const globalFunctions = await generateGdscriptLib(
      path.join(this.paths.gdscriptPath, "@GDScript.xml")
    )

    fs.writeFileSync(
      path.join(this.paths.staticGodotDefsPath, "@global_functions.d.ts"),
      globalFunctions
    )

    const xmlPaths = [
      this.paths.csgClassesPath,
      this.paths.websocketClassesPath,
      this.paths.normalClassesPath,
    ]
      .flatMap((dir) => fs.readdirSync(dir).map((p) => path.join(dir, p)))
      .filter((file) => file.endsWith(".xml"))

    for (let fullPath of xmlPaths) {
      const fileName = path.basename(fullPath)

      if (fileName === "@GlobalScope.xml") {
        continue
      }

      if (fileName === "Array.xml") {
        continue
      }

      if (fileName === "bool.xml") {
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

      const result = await this.parseFile(fullPath, singletons)

      fs.writeFileSync(
        path.join(
          this.paths.staticGodotDefsPath,
          fileName.slice(0, -4) + ".d.ts"
        ),
        result
      )
    }
  }
}

export default LibraryBuilder
