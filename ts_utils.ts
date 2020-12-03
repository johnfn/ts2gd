import ts from "typescript";
import { program } from "./main";

export function isEnumType(type: ts.Type) {
  if (type.flags & ts.TypeFlags.Enum) {
    return true;
  }

  // it's not an enum type if it's an enum literal type
  if ((type.flags & ts.TypeFlags.EnumLiteral) && !type.isUnion()) {
    return false;
  }

  // get the symbol and check if its value declaration is an enum declaration
  const symbol = type.getSymbol();
  if (symbol == null) {
    return false;
  }

  const { valueDeclaration } = symbol;
  return valueDeclaration != null && valueDeclaration.kind === ts.SyntaxKind.EnumDeclaration;
}


export const syntaxToKind = (kind: ts.Node["kind"]) => {
  return ts.SyntaxKind[kind];
};

export function tsTypeToGodotType(type: ts.Type): string {
  const tsTypeName = program.getTypeChecker().typeToString(type);

  if (tsTypeName === "string") {
    return "String";
  }

  if (tsTypeName.startsWith('{')) {
    return 'Dictionary';
  }

  if (tsTypeName === "number") {
    return "float";
  }

  return tsTypeName;
}

