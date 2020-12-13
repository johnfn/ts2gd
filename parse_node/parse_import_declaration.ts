import ts from "typescript";
const { SyntaxKind } = ts;
import { ParseState } from "../parse_node";
import path from 'path'

export function parseImportDeclaration(node: ts.ImportDeclaration, props: ParseState) {
  const importPathLiteral = node.moduleSpecifier as ts.StringLiteral;
  const importPath = importPathLiteral.text;

  // TODO: This code does nothing currently, but will be helpful
  // when we add multiple classes per file.

  // const namedBindings = node.importClause?.namedBindings;

  // if (!namedBindings) {
  //   throw new Error("Unsupported import type!");
  // }

  // if (namedBindings.kind === SyntaxKind.NamedImports) {
  //   const imports = namedBindings as ts.NamedImports;

  //   for (const element of imports.elements) {
  //     const name = element.propertyName!;

  //     console.log(name.text);
  //   }
  // }

  // Go ahead and assume they imported the main class from the file

  // Step 1: resolve full path

  let pathToImportedTs: string = "";

  if (importPath.startsWith('.')) {
    // Handle relative paths

    pathToImportedTs = path.join(
      path.dirname(
        node.getSourceFile().fileName
      ),
      importPath,
    )
  } else {
    // Handle absolute paths

    pathToImportedTs = path.join(
      props.project.tsgdPath,
      importPath,
    );
  }

  pathToImportedTs += ".ts";

  const importedSourceFile = props.project.sourceFiles.find(sf => sf.tsFullPath === pathToImportedTs);

  if (!importedSourceFile) {
    throw new Error(`Error! ${importPath} import not found.
  in ${node.getSourceFile().fileName}`)
  }

  if (importedSourceFile.isAutoload) {
    // No need to generate imports for autoload classes.
    return "";
  } else {
    return `const ${importedSourceFile.className} = preload("${importedSourceFile.resPath}")`;
  }
}
