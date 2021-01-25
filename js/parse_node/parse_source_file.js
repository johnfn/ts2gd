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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSourceFile = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const utils = __importStar(require("tsutils"));
/**
 * The class_name and extends statements *must* come first in the file, so we
 * preprocess the class to find them prior to our normal pass.
 */
const preprocessClassDecl = (node, props) => {
    let extendsFrom = "";
    if (node.heritageClauses) {
        // TODO: Ensure there's only one of each here
        const clause = node.heritageClauses[0];
        const type = clause.types[0];
        extendsFrom = type.getText();
    }
    return `${extendsFrom ? `extends ${extendsFrom}` : ""}
${props.isAutoload ? "" : `class_name ${node.name?.getText()}\n`}`;
};
const parseSourceFile = (node, props) => {
    const { statements } = node;
    const sourceInfo = props.project
        .sourceFiles()
        .find((file) => file.fsPath === node.fileName);
    props.usages = utils.collectVariableUsage(node);
    props.isAutoload = sourceInfo?.isAutoload() ?? false;
    const classDecl = statements.find((statement) => statement.kind === typescript_1.SyntaxKind.ClassDeclaration &&
        // skip class type declarations
        (statement.modifiers ?? []).filter((m) => m.getText() === "declare")
            .length === 0);
    const parsedStatements = statements.map((statement) => parse_node_1.parseNode(statement, props));
    return {
        content: `
${classDecl ? preprocessClassDecl(classDecl, props) : ""} 
${parsedStatements.flatMap((x) => x.hoistedEnumImports ?? []).join("\n")}
${parsedStatements.flatMap((x) => x.hoistedLibraryFunctions ?? []).join("\n")}
${parsedStatements.flatMap((x) => x.hoistedArrowFunctions ?? []).join("\n")}
${parsedStatements.map((x) => x.content).join("\n")}
`.trim(),
        enums: parsedStatements.flatMap((x) => x.enums ?? []),
    };
};
exports.parseSourceFile = parseSourceFile;
//# sourceMappingURL=parse_source_file.js.map