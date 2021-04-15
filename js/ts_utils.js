"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonElements = exports.copyFolderRecursiveSync = exports.getPreciseInitializerType = exports.notEmpty = exports.getGodotType = exports.syntaxKindToString = exports.isEnumType = exports.isArrayType = exports.generatePrecedingNewlines = exports.isDictionary = exports.getTypeHierarchy = exports.isNullable = void 0;
const typescript_1 = __importStar(require("typescript"));
const errors_1 = require("./errors");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const isNullable = (node, typechecker) => {
    const type = typechecker.getTypeAtLocation(node);
    return type.isUnion() &&
        type.types.find((type) => type.flags & typescript_1.TypeFlags.Null || type.flags & typescript_1.TypeFlags.Undefined)
        ? true
        : false;
};
exports.isNullable = isNullable;
/**
 * Gets the inheritance tree of the provided type. E.g. if Foo extends Bar
 * extends Baz, and we pass in Foo, then this returns [Bar, Baz].
 */
const getTypeHierarchy = (type) => {
    if (type.isClass()) {
        const baseTypes = type.getBaseTypes() ?? [];
        return [
            ...baseTypes,
            ...baseTypes.flatMap((type) => exports.getTypeHierarchy(type)),
        ];
    }
    return [];
};
exports.getTypeHierarchy = getTypeHierarchy;
// I can not for the life of me figure out a clear way to
// ask TS if a type is an object literal type.
const isDictionary = (type) => {
    if (type.getSymbol()?.name.startsWith("Dictionary")) {
        // Note: startsWith necessary because it could be
        // * Dictionary
        // * Dictionary<K, V>
        return true;
    }
    if (type.flags & typescript_1.TypeFlags.Object) {
        const objectType = type;
        for (const decl of type.symbol?.declarations ?? []) {
            if (decl.kind === typescript_1.SyntaxKind.ClassDeclaration) {
                return false;
            }
            if (decl.kind === typescript_1.SyntaxKind.EnumDeclaration) {
                return false;
            }
            if (decl.kind === typescript_1.SyntaxKind.TypeLiteral) {
                // This is probably it!
                continue;
            }
        }
        return (objectType.objectFlags & typescript_1.ObjectFlags.Anonymous) !== 0;
    }
    return false;
};
exports.isDictionary = isDictionary;
const generatePrecedingNewlines = (node) => {
    const fullText = node.getFullText();
    let numNewlines = 0;
    for (const ch of [...fullText]) {
        if (ch.trim() !== "") {
            break;
        }
        if (ch === "\n") {
            numNewlines += 1;
        }
    }
    let result = "";
    for (let i = 0; i < numNewlines - 1; i++) {
        result += "\n";
    }
    return result;
};
exports.generatePrecedingNewlines = generatePrecedingNewlines;
function isArrayType(type) {
    return type.symbol?.name === "Array";
}
exports.isArrayType = isArrayType;
function isEnumType(type) {
    if (type.flags & typescript_1.default.TypeFlags.Enum) {
        return true;
    }
    // it's not an enum type if it's an enum literal type
    if (type.flags & typescript_1.default.TypeFlags.EnumLiteral && !type.isUnion()) {
        return false;
    }
    // get the symbol and check if its value declaration is an enum declaration
    const symbol = type.getSymbol();
    if (symbol == null) {
        return false;
    }
    const { valueDeclaration } = symbol;
    return (valueDeclaration != null &&
        valueDeclaration.kind === typescript_1.default.SyntaxKind.EnumDeclaration);
}
exports.isEnumType = isEnumType;
const syntaxKindToString = (kind) => {
    return typescript_1.default.SyntaxKind[kind];
};
exports.syntaxKindToString = syntaxKindToString;
// Location is either
// * The TS AST node that the error occured at (preferred), or
// * Some generic string (ideally a path to the file)
// export const logErrorAtNode = (
//   location: ts.Node | string,
//   error: ErrorName
// ): TsGdError => {
//   if (typeof location === "string") {
//     return {
//       error,
//       location,
//     }
//   } else {
//     const {
//       line,
//       character,
//     } = location
//       .getSourceFile()
//       ?.getLineAndCharacterOfPosition(location.getStart())
//     console.warn()
//     console.warn(
//       "Error at",
//       `${chalk.blueBright(location.getSourceFile().fileName)}:${chalk.yellow(
//         line + 1
//       )}:${chalk.yellow(character + 1)}`
//     )
//   }
//   console.warn(chalk.redBright(error))
// }
/**
 * Get the Godot type for a node. The more arguments that are passed in, the more precise
 * we can be about this type.
 *
 * Note we need actualType because if we have let x: float, TS will say the
 * type is number (not float!), which isn't very useful.
 *
 * @param typecheckerInferredType This is the type that getTypeAtLocation returns
 * @param actualType This is the actual type node in the program, if there is one
 */
function getGodotType(node, props, initializer, actualType) {
    const typecheckerInferredType = props.program
        .getTypeChecker()
        .getTypeAtLocation(node);
    // If we have a precise initializer, use that first
    if (initializer) {
        let preciseInitializerType = getPreciseInitializerType(initializer);
        if (preciseInitializerType) {
            return { result: preciseInitializerType };
        }
    }
    // If we have an explicitly written type e.g. x: string, use that.
    // Otherwise, use the type that TS inferred.
    let tsTypeName = null;
    if (actualType) {
        tsTypeName = actualType.getText();
    }
    else {
        tsTypeName = props.program
            .getTypeChecker()
            .typeToString(typecheckerInferredType);
    }
    if (tsTypeName === "number") {
        return {
            errors: [
                {
                    description: `Please add either "int" or "float" here (not number)`,
                    error: errors_1.ErrorName.InvalidNumber,
                    location: node,
                },
            ],
            result: "float",
        };
    }
    // TODO: Optionals make this nearly impossible
    if (tsTypeName === "string") {
        return { result: "String" };
    }
    if (tsTypeName === "boolean") {
        return { result: "bool" };
    }
    if (tsTypeName.startsWith("{")) {
        return { result: "Dictionary" };
    }
    if (tsTypeName.startsWith("IterableIterator")) {
        return { result: "Array" };
    }
    // if (tsTypeName.includes("[")) {
    //   return "Array"
    // }
    // if (tsTypeName.startsWith("PackedScene")) {
    // This is a generic type in TS, so just return the non-generic Godot type.
    //   return "PackedScene"
    // }
    // Enum type names are actually not imported!
    // TODO: They are now!
    // if (isEnumType(typecheckerInferredType)) {
    //   return tsTypeName;
    // }
    // TODO: Doing all these cases is subtle to get right and doesn't confer a lot
    // of benefit. In some cases (e.g. using user-defined types) it actually
    // causes errors due to cyclic dependencies, and those would be a huge pain to
    // resolve properly.
    return { result: null };
}
exports.getGodotType = getGodotType;
function notEmpty(value) {
    return value.filter((x) => x !== undefined && x !== null);
}
exports.notEmpty = notEmpty;
/**
 * In cases like
 *
 * var x = 1.5
 * var x = 1
 *
 * TypeScript will infer both of those to be type "number", but we want to be able to say
 * that the first one is a "float" and the second one is an "int".
 */
function getPreciseInitializerType(initializer) {
    if (!initializer) {
        return "";
    }
    const initStr = initializer.getText();
    // attempt to figure out from the literal type whether this is a int or a float.
    let isInt = !!initStr.match(/^[0-9]+$/);
    let isFloat = !!initStr.match(/^([0-9]+)?\.([0-9]+)?$/) && initStr.length > 1;
    if (isInt) {
        return "int";
    }
    if (isFloat) {
        return "float";
    }
    return undefined;
}
exports.getPreciseInitializerType = getPreciseInitializerType;
function copyFileSync(source, target) {
    let targetFile = target;
    // If target is a directory, a new file with the same name will be created
    if (fs_1.default.existsSync(target)) {
        if (fs_1.default.lstatSync(target).isDirectory()) {
            targetFile = path_1.default.join(target, path_1.default.basename(source));
        }
    }
    fs_1.default.writeFileSync(targetFile, fs_1.default.readFileSync(source));
}
function copyFolderRecursiveSync(source, target) {
    let files = [];
    // Check if folder needs to be created or integrated
    let targetFolder = path_1.default.join(target, path_1.default.basename(source));
    if (!fs_1.default.existsSync(targetFolder)) {
        fs_1.default.mkdirSync(targetFolder);
    }
    // Copy
    if (fs_1.default.lstatSync(source).isDirectory()) {
        files = fs_1.default.readdirSync(source);
        files.forEach((file) => {
            let curSource = path_1.default.join(source, file);
            if (fs_1.default.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            }
            else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}
exports.copyFolderRecursiveSync = copyFolderRecursiveSync;
const getCommonElements = (lists, eq) => {
    if (lists.length === 0) {
        return [];
    }
    return lists[0].filter((elem) => lists.every((list) => list.find((listElem) => eq(listElem, elem))));
};
exports.getCommonElements = getCommonElements;
//# sourceMappingURL=ts_utils.js.map