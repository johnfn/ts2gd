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

/**
 * In cases like 
 * 
 * var x = 1.5
 * var x = 1
 * 
 * TypeScript will infer both of those to be type "number", but we want to be able to say
 * that the first one is a "float" and the second one is an "int".
 */
export function getPreciseInitializerType(initializer: ts.Expression | undefined): string | undefined {
  if (!initializer) {
    return "";
  }

  const initStr = initializer.getText();

  // attempt to figure out from the literal type whether this is a int or a float.
  let isInt = !!initStr.match(/^[0-9]+$/);
  let isFloat = (!!initStr.match(/^([0-9]+)?\.([0-9]+)?$/)) && initStr.length > 1;

  if (initializer.getText().startsWith("6")) {
    console.log(initializer.getText(), isInt, isFloat)
  }

  if (isInt) {
    return "int";
  }

  if (isFloat) {
    return "float";
  }

  return undefined;
}