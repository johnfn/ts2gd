import ts, { SyntaxKind } from "typescript";
import { combine, ParseNodeType, ParseState } from "../parse_node";
import path from 'path'
import { ParsedSourceFile, program } from "../main";
import { isEnumType } from "../ts_utils";

const getPathWithoutExtension = (node: ts.ImportDeclaration, props: ParseState) => {
  const importPathLiteral = node.moduleSpecifier as ts.StringLiteral;
  const importPath = importPathLiteral.text;
  let pathToImportedTs: string = "";

  if (importPath.startsWith('.')) {
    // Handle relative paths

    pathToImportedTs = path.join(
      path.dirname(
        node.getSourceFile().fileName
      ),
      importPath,
    );
  } else {
    // Handle absolute paths

    pathToImportedTs = path.join(
      props.project.tsgdPath,
      importPath,
    );
  }

  return pathToImportedTs;
};

export const parseImportDeclaration = (node: ts.ImportDeclaration, props: ParseState): ParseNodeType => {

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

  const pathWithoutExtension = getPathWithoutExtension(node, props);
  let pathToImportedTs = pathWithoutExtension + ".ts";
  const importedSourceFile = props.project.sourceFiles.find(sf => sf.tsFullPath === pathToImportedTs);

  if (!importedSourceFile) {
    throw new Error(`Error! ${pathToImportedTs} import not found.
  in ${node.getSourceFile().fileName}`)
  }


  // Step 2: Parse bindings, sorting between class and enum types (which we need to generate different imports
  // for).

  type ImportType = { type: string; resPath: string; };

  const namedBindings = node.importClause?.namedBindings;

  if (!namedBindings) {
    throw new Error("Unsupported import type!");
  }

  let imports: ImportType[] = [];

  if (namedBindings.kind === SyntaxKind.NamedImports) {
    const bindings = namedBindings as ts.NamedImports;

    for (const element of bindings.elements) {
      const type = program.getTypeChecker().getTypeAtLocation(element);
      let typeString = program.getTypeChecker().typeToString(type);

      if (typeString.startsWith('typeof ')) {
        typeString = typeString.slice('typeof '.length);
      }

      if (isEnumType(type)) {
        // TODO: Refactor this out - this code is also in parse_enum.
        const pathWithoutEnum = importedSourceFile.resPath;
        const newPath = pathWithoutEnum.slice(0, -'.gd'.length) + '_' + typeString + '.gd';

        imports.push({ type: typeString, resPath: newPath });
      } else {
        if (!importedSourceFile.isAutoload) {
          imports.push({ type: typeString, resPath: importedSourceFile.resPath });
        }
      }
    }
  }

  return combine({
    parent: node, nodes: [], props, content: () => imports.map(({ type, resPath }) => {
      return `const ${type} = preload("${resPath}")`;
    }).join('\n')
  });
}
