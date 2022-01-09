import path from "path"

import { UsageDomain } from "tsutils"
import ts, { SyntaxKind } from "typescript"

import TsGdProject from "../project/project"
import { ErrorName } from "../project/errors"
import { ParseNodeType, ParseState, combine } from "../parse_node"
import { isEnumType } from "../ts_utils"

const getPathWithoutExtension = (
  node: ts.ImportDeclaration,
  props: ParseState
) => {
  const importPathLiteral = node.moduleSpecifier as ts.StringLiteral
  const importPath = importPathLiteral.text
  let pathToImportedTs = ""

  if (importPath.startsWith(".")) {
    // Handle relative paths

    pathToImportedTs = path.join(
      path.dirname(node.getSourceFile().fileName),
      importPath
    )
  } else {
    // Handle absolute paths

    pathToImportedTs = path.join(props.project.paths.rootPath, importPath)
  }

  return pathToImportedTs
}

export const getImportResPathForEnum = (
  node: ts.Type,
  props: ParseState
): {
  sourceFile: ts.SourceFile
  resPath: string
  enumName: string
} => {
  const enumSymbol = node.getSymbol()

  if (!enumSymbol) {
    throw new Error("Can't find symbol for node.")
  }

  const enumDeclarations = enumSymbol.declarations

  if (!enumDeclarations) {
    throw new Error(`No Enum declartion given`)
  }

  if (enumDeclarations.length === 0 || enumDeclarations.length > 1) {
    throw new Error(
      `Invalid length for declarations: ${enumDeclarations.length}`
    )
  }

  const enumDeclaration = enumDeclarations[0]
  const enumSourceFile = enumDeclaration.getSourceFile()

  const targetPath = path.normalize(enumSourceFile.fileName)

  const enumSourceFileAsset = props.project
    .sourceFiles()
    .find((sf) => sf.fsPath === targetPath)

  if (!enumSourceFileAsset) {
    throw new Error(
      `Can't find associated sourcefile for ${enumSourceFile.fileName}`
    )
  }

  let enumTypeString = props.program.getTypeChecker().typeToString(node)

  if (enumTypeString.startsWith("typeof ")) {
    enumTypeString = enumTypeString.slice("typeof ".length)
  }

  const importPath = props.project.paths.replaceResExtension(
    enumSourceFileAsset.resPath,
    `_${enumTypeString}.gd`
  )

  return {
    resPath: importPath,
    sourceFile: enumSourceFile,
    enumName: enumTypeString,
  }
}

export const parseImportDeclaration = (
  node: ts.ImportDeclaration,
  props: ParseState
): ParseNodeType => {
  // Step 1: resolve full path

  const pathWithoutExtension = getPathWithoutExtension(node, props)
  let pathToImportedTs = pathWithoutExtension + ".ts"

  // Step 2: Parse bindings, sorting between class and enum types (which we need
  // to generate different imports for).

  type ImportType = {
    importedName: string
    type: "enum" | "class" | "scene"
    resPath: string
  }

  const namedBindings = node.importClause?.namedBindings

  if (!namedBindings) {
    throw new Error("Unsupported import type!")
  }

  let imports: ImportType[] = []

  if (namedBindings.kind === SyntaxKind.NamedImports) {
    const bindings = namedBindings as ts.NamedImports

    for (const element of bindings.elements) {
      const type = props.program.getTypeChecker().getTypeAtLocation(element)

      // TODO rewrite this using new project obj

      if (isEnumType(type)) {
        const { resPath, enumName } = getImportResPathForEnum(type, props)

        imports.push({ importedName: enumName, resPath: resPath, type: "enum" })
      } else if (type.symbol?.name === "PackedScene") {
        const importedName = element.name.text
        const className = importedName.slice(0, -"Tscn".length)
        const resPath = props.project
          .godotScenes()
          .find((scene) => scene.name === className)?.resPath

        if (!resPath) {
          continue
        }

        imports.push({
          importedName: importedName,
          resPath: resPath,
          type: "scene",
        })
      } else {
        const importedSourceFile = props.project
          .sourceFiles()
          .find((sf) => sf.fsPath === pathToImportedTs)

        if (!importedSourceFile) {
          if (pathToImportedTs.includes("@")) {
            continue
          }

          props.project.errors.add({
            error: ErrorName.InvalidNumber,
            location: node,
            description: `Import ${pathToImportedTs} not found.`,
            stack: new Error().stack ?? "",
          })

          continue
        }

        let typeString = props.program.getTypeChecker().typeToString(type)

        if (typeString.startsWith("typeof ")) {
          typeString = typeString.slice("typeof ".length)
        }

        const usages = props.usages.get(element.name)

        let usedAsValue = false

        // No import is necessary unless we actually use the identifier as a value. (Circular references
        // will crash Godot, so we try to avoid them.)
        for (const use of usages?.uses ?? []) {
          if (use.domain & UsageDomain.Value) {
            usedAsValue = true
            break
          }
        }

        if (!importedSourceFile.isAutoload() && usedAsValue) {
          imports.push({
            importedName: typeString,
            resPath: importedSourceFile.resPath,
            type: "class",
          })
        }
      }
    }
  }

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () =>
      imports
        .map(({ importedName, type, resPath }) => {
          if (type === "class") {
            return `var ${importedName} = load("${resPath}")`
          } else if (type === "enum") {
            return `const ${importedName} = preload("${resPath}").${importedName}`
          } else if (type === "scene") {
            return `const ${importedName} = preload("${resPath}")`
          }
        })
        .join("\n"),
  })
}
