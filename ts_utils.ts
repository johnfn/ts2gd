import ts from "typescript";
const { ObjectFlags, SyntaxKind, TypeFlags } = ts;
import { program } from "./main";

/** 
 * Gets the inheritance tree of the provided type. E.g. if Foo extends Bar
 * extends Baz, and we pass in Foo, then this returns [Bar, Baz].
 */
export const getTypeHierarchy = (type: ts.Type): ts.Type[] => {
  if (type.isClass()) {
    const baseTypes = type.getBaseTypes() ?? [];

    return [...baseTypes, ...baseTypes.flatMap(type => getTypeHierarchy(type))];
  }

  return [];
};

// I can not for the life of me figure out a clear way to
// ask TS if a type is an object literal type. 
export const isDictionary = (type: ts.Type): boolean => {
  if (type.flags & TypeFlags.Object) {
    const objectType = type as ts.ObjectType;

    for (const decl of type.symbol?.declarations) {
      if (decl.kind === SyntaxKind.ClassDeclaration) {
        return false;
      }

      if (decl.kind === SyntaxKind.EnumDeclaration) {
        return false;
      }

      if (decl.kind === SyntaxKind.TypeLiteral) {
        // This is probably it!

        continue;
      }
    }

    return (objectType.objectFlags & ObjectFlags.Anonymous) !== 0;
  }

  return false;
}

export const generatePrecedingNewlines = (node: ts.Node): string => {
  const fullText = node.getFullText();
  let numNewlines = 0;

  for (const ch of [...fullText]) {
    if (ch.trim() !== "") {
      break;
    }

    if (ch === '\n') {
      numNewlines += 1;
    }
  }

  let result = "";

  for (let i = 0; i < numNewlines - 1; i++) {
    result += '\n';
  }

  return result;
}

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

/**
 * Get the Godot type for a node. The more arguments that are passed in, the more precise
 * we can be aboue this type.
 * 
 * Note we need actualType because if we have let x: float, TS will infer the
 * type to be number, which isn't very useful.
 * 
 * @param typecheckerInferredType This is the type that getTypeAtLocation returns
 * @param actualType This is the actual type node in the program, if there is one
 */
export function getGodotType(
  node: ts.Node,
  initializer?: ts.Expression,
  actualType?: ts.TypeNode
): string | undefined {
  const typecheckerInferredType = program.getTypeChecker().getTypeAtLocation(node);

  // If we have a precise initializer, use that first

  if (initializer) {
    let preciseInitializerType = getPreciseInitializerType(initializer);

    if (preciseInitializerType) {
      return preciseInitializerType;
    }
  }

  // If we have an explicitly written type e.g. x: string, use that. 
  // Otherwise, use the type that TS inferred.

  let tsTypeName: string | null = null;

  if (actualType) {
    tsTypeName = actualType.getText();
  } else {
    tsTypeName = program.getTypeChecker().typeToString(typecheckerInferredType);
  }

  if (tsTypeName === "number") {
    console.log(`Unknown number type, writing float for ${node.getText()}`);
    console.log("  ->", node.getSourceFile().fileName)
    return "float";
  }

  // return undefined;

  if (tsTypeName === "string") {
    return "String";
  }

  if (tsTypeName === "boolean") {
    return "bool";
  }

  if (tsTypeName.startsWith('{')) {
    return 'Dictionary';
  }

  if (tsTypeName.startsWith('IterableIterator')) {
    return 'Array';
  }

  if (tsTypeName.includes('[')) {
    return 'Array'
  }

  if (tsTypeName.startsWith('PackedScene')) {
    // This is a generic type in TS, so just return the non-generic Godot type.
    return 'PackedScene';
  }

  // TODO: In theory, we could do the below, but it's subtle to get right
  // and doesn't confer a lot of benefit. In some cases (e.g. using user-defined
  // types) it actually causes errors due to cyclic dependencies, and those would
  // be a huge pain to resolve properly.

  return tsTypeName;
}

export function notEmpty<TValue>(value: (TValue | null | undefined)[]): TValue[] {
  return value.filter(x => x !== undefined && x !== null) as TValue[];
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

  if (isInt) {
    return "int";
  }

  if (isFloat) {
    return "float";
  }

  return undefined;
}