import ts, { SyntaxKind } from "typescript"
import { combine, ParseNodeType, ParseState } from "../parse_node"
import { addError, ErrorName } from "../errors"
import path from "path"
import { isEnumType } from "../ts_utils"
import { TsGdProjectClass } from "../project/project"
import { UsageDomain } from "tsutils"

const getPathWithoutExtension = (
  node: ts.ImportDeclaration,
  props: ParseState
) => {
  const importPathLiteral = node.moduleSpecifier as ts.StringLiteral
  const importPath = importPathLiteral.text
  let pathToImportedTs: string = ""

  if (importPath.startsWith(".")) {
    // Handle relative paths

    pathToImportedTs = path.join(
      path.dirname(node.getSourceFile().fileName),
      importPath
    )
  } else {
    // Handle absolute paths

    pathToImportedTs = path.join(TsGdProjectClass.Paths.rootPath, importPath)
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

  const enumSourceFileAsset = props.project
    .sourceFiles()
    .find((sf) => sf.fsPath === enumSourceFile.fileName)

  if (!enumSourceFileAsset) {
    throw new Error(
      `Can't find associated sourcefile for ${enumSourceFile.fileName}`
    )
  }

  let enumTypeString = props.program.getTypeChecker().typeToString(node)

  if (enumTypeString.startsWith("typeof ")) {
    enumTypeString = enumTypeString.slice("typeof ".length)
  }

  return {
    resPath: enumSourceFileAsset.resPath,
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
    type: "enum" | "class" | "scene" | "subclass"
    resPath: string
  }

  if (!node.importClause) {
    throw new Error("Unsupported import type!")
  }

  const namedBindings = node.importClause.namedBindings

  const namedImports: {
    name: ts.Identifier
    isDefault: boolean
  }[] = [
    // Map default import into meta object
    ...(node.importClause.name
      ? [
          {
            name: node.importClause.name,
            isDefault: true,
          },
        ]
      : []),

    // Map all bindings into meta objects
    ...(namedBindings?.kind === SyntaxKind.NamedImports
      ? (namedBindings as ts.NamedImports).elements.map((binding) => ({
          name: binding.name,
          isDefault: false,
        }))
      : []),
  ]

  let imports: ImportType[] = []

  for (const element of namedImports) {
    const type = props.program.getTypeChecker().getTypeAtLocation(element.name)

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

        addError({
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

      if (typeString === "(Missing)") {
        typeString = element.name.getText()
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
          type: element.isDefault ? "class" : "subclass",
        })
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
          } else if (type === "subclass") {
            return `const ${importedName} = preload("${resPath}").${importedName}`
          } else if (type === "enum") {
            return `const ${importedName} = preload("${resPath}").${importedName}`
          } else if (type === "scene") {
            return `const ${importedName} = preload("${resPath}")`
          }
        })
        .join("\n"),
  })
}

// TODO: we really should add tests for imports
