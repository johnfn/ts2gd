import ts, { SyntaxKind } from "typescript";
import { combine, ParseNodeType, ParseState } from "../parse_node";
import path from 'path'
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

export const getImportResPathForEnum = (node: ts.Type, props: ParseState): {
  sourceFile: ts.SourceFile;
  resPath: string;
  enumName: string;
} => {
  const symbol = node.getSymbol();

  if (!symbol) {
    throw new Error("Can't find symbol for node.");
  }

  const declarations = symbol.declarations;

  if (declarations.length === 0 || declarations.length > 1) {
    throw new Error(`Invalid length for declarations: ${declarations.length}`);
  }

  const decl = declarations[0];
  const sourceFile = decl.getSourceFile();

  const importedSourceFile = props.project.sourceFiles.find(sf => sf.tsFullPath === sourceFile.fileName);

  if (!importedSourceFile) {
    throw new Error(`Can't find associated sourcefile for ${sourceFile.fileName}`);
  }

  let enumTypeString = props.program.getTypeChecker().typeToString(node);

  if (enumTypeString.startsWith('typeof ')) {
    enumTypeString = enumTypeString.slice('typeof '.length);
  }

  const pathWithoutEnum = importedSourceFile.resPath;
  const importPath = pathWithoutEnum.slice(0, -'.gd'.length) + '_' + enumTypeString + '.gd';

  return {
    resPath: importPath,
    sourceFile,
    enumName: enumTypeString,
  };
}

export const parseImportDeclaration = (node: ts.ImportDeclaration, props: ParseState): ParseNodeType => {
  // Step 1: resolve full path

  const pathWithoutExtension = getPathWithoutExtension(node, props);
  let pathToImportedTs = pathWithoutExtension + ".ts";

  // Step 2: Parse bindings, sorting between class and enum types (which we need to generate different imports
  // for).

  type ImportType = { importedName: string; type: 'enum' | 'class' | 'scene'; resPath: string; };

  const namedBindings = node.importClause?.namedBindings;

  if (!namedBindings) {
    throw new Error("Unsupported import type!");
  }

  let imports: ImportType[] = [];

  if (namedBindings.kind === SyntaxKind.NamedImports) {
    const bindings = namedBindings as ts.NamedImports;

    for (const element of bindings.elements) {
      const type = props.program.getTypeChecker().getTypeAtLocation(element);

      console.log(type.symbol?.name);

      if (isEnumType(type)) {
        const {
          resPath,
          enumName,
        } = getImportResPathForEnum(type, props);

        imports.push({ importedName: enumName, resPath: resPath, type: 'enum' });
      } else if (type.symbol?.name === 'PackedScene') {
        const importedName = bindings.elements[0].name.text;
        const className = importedName.slice(0, -"Tscn".length)
        const resPath = props.project.scenes.find(scene => scene.name === className)?.resPath;

        if (!resPath) {
          continue;
        }

        imports.push({
          importedName: importedName,
          resPath: resPath,
          type: 'scene',
        });
      } else {
        const importedSourceFile = props.project.sourceFiles.find(sf => sf.tsFullPath === pathToImportedTs);

        if (!importedSourceFile) {
          throw new Error(`Error! ${pathToImportedTs} import not found.
  in ${node.getSourceFile().fileName}`);
        }

        let typeString = props.program.getTypeChecker().typeToString(type);

        if (typeString.startsWith('typeof ')) {
          typeString = typeString.slice('typeof '.length);
        }

        if (!importedSourceFile.isAutoload) {
          imports.push({ importedName: typeString, resPath: importedSourceFile.resPath, type: 'class' });
        }
      }
    }
  }

  return combine({
    parent: node,
    nodes: [],
    props,
    content: () => imports.map(({ importedName, type, resPath }) => {
      if (type === "class") {
        return `const ${importedName} = preload("${resPath}")`;
      } else if (type === "enum") {
        return `const ${importedName} = preload("${resPath}").${importedName}`;
      } else if (type === "scene") {
        return `const ${importedName} = preload("${resPath}")`;
      }
    }).join('\n')
  });
}
