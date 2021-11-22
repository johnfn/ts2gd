"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testToolAnnotation = exports.parseSourceFile = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const parse_call_expression_1 = require("./parse_call_expression");
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
    const isTool = !!node.decorators?.find((dec) => props.getNodeText(dec.expression) === "tool");
    return `${isTool ? "tool\n" : ""}${extendsFrom ? `extends ${extendsFrom}` : ""}
${props.isAutoload ? "" : `class_name ${node.name?.getText()}\n`}`;
};
const parseSourceFile = (node, props) => {
    const { statements } = node;
    const sourceInfo = props.project
        .sourceFiles()
        .find((file) => file.fsPath === node.fileName);
    // props.usages = utils.collectVariableUsage(node)
    props.isAutoload = sourceInfo?.isAutoload() ?? false;
    const classDecl = statements.find((statement) => statement.kind === typescript_1.SyntaxKind.ClassDeclaration &&
        // skip class type declarations
        (statement.modifiers ?? []).filter((m) => m.getText() === "declare")
            .length === 0);
    const parsedStatements = statements.map((statement) => parse_node_1.parseNode(statement, props));
    const allHoistedLibraryFunctions = new Set(parsedStatements.flatMap((x) => [
        ...(x.hoistedLibraryFunctions?.keys() ?? []),
    ]));
    const allHoistedLibraryFunctionDefinitions = [
        ...allHoistedLibraryFunctions.keys(),
    ].map((item) => parse_call_expression_1.LibraryFunctions[item].definition("__" + parse_call_expression_1.LibraryFunctions[item].name));
    const content = [
        classDecl ? preprocessClassDecl(classDecl, props) : "",
        parsedStatements.flatMap((x) => x.hoistedEnumImports ?? []).join("\n"),
        allHoistedLibraryFunctionDefinitions.join("\n"),
        parsedStatements
            .flatMap((x) => x.hoistedArrowFunctions ?? [])
            .map((obj) => obj.content)
            .join("\n"),
        parsedStatements.map((x) => x.content).join("\n"),
    ];
    return {
        content: `
    ${content.filter((item) => item.trim() !== "").join("\n")}
`.trim(),
        enums: parsedStatements.flatMap((x) => x.enums ?? []),
    };
};
exports.parseSourceFile = parseSourceFile;
exports.testToolAnnotation = {
    ts: `
@tool
export class Test {
}
  `,
    expected: `
tool
class_name Test
`,
};
//# sourceMappingURL=parse_source_file.js.map