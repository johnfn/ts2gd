"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNode = exports.combine = void 0;
const typescript_1 = require("typescript");
const parse_import_declaration_1 = require("./parse_node/parse_import_declaration");
const parse_binary_expression_1 = require("./parse_node/parse_binary_expression");
const parse_source_file_1 = require("./parse_node/parse_source_file");
const ts_utils_1 = require("./ts_utils");
const parse_type_reference_1 = require("./parse_node/parse_type_reference");
const parse_numeric_literal_1 = require("./parse_node/parse_numeric_literal");
const parse_array_literal_expression_1 = require("./parse_node/parse_array_literal_expression");
const parse_new_expression_1 = require("./parse_node/parse_new_expression");
const parse_postfix_unary_expression_1 = require("./parse_node/parse_postfix_unary_expression");
const parse_if_statement_1 = require("./parse_node/parse_if_statement");
const parse_switch_statement_1 = require("./parse_node/parse_switch_statement");
const parse_prefix_unary_expression_1 = require("./parse_node/parse_prefix_unary_expression");
const parse_object_literal_expression_1 = require("./parse_node/parse_object_literal_expression");
const parse_constructor_1 = require("./parse_node/parse_constructor");
const parse_this_keyword_1 = require("./parse_node/parse_this_keyword");
const parse_super_keyword_1 = require("./parse_node/parse_super_keyword");
const parse_variable_declaration_list_1 = require("./parse_node/parse_variable_declaration_list");
const parse_enum_declaration_1 = require("./parse_node/parse_enum_declaration");
const parse_variable_declaration_1 = require("./parse_node/parse_variable_declaration");
const parse_expression_statement_1 = require("./parse_node/parse_expression_statement");
const parse_string_literal_1 = require("./parse_node/parse_string_literal");
const parse_identifier_1 = require("./parse_node/parse_identifier");
const parse_parenthesized_expression_1 = require("./parse_node/parse_parenthesized_expression");
const parse_element_access_expression_1 = require("./parse_node/parse_element_access_expression");
const parse_parameter_1 = require("./parse_node/parse_parameter");
const parse_method_declaration_1 = require("./parse_node/parse_method_declaration");
const parse_for_in_statement_1 = require("./parse_node/parse_for_in_statement");
const parse_for_of_statement_1 = require("./parse_node/parse_for_of_statement");
const parse_for_statement_1 = require("./parse_node/parse_for_statement");
const parse_while_statement_1 = require("./parse_node/parse_while_statement");
const parse_property_declaration_1 = require("./parse_node/parse_property_declaration");
const parse_yield_expression_1 = require("./parse_node/parse_yield_expression");
const parse_return_statement_1 = require("./parse_node/parse_return_statement");
const parse_break_statement_1 = require("./parse_node/parse_break_statement");
const parse_block_1 = require("./parse_node/parse_block");
const parse_call_expression_1 = require("./parse_node/parse_call_expression");
const parse_variable_statement_1 = require("./parse_node/parse_variable_statement");
const parse_set_accessor_1 = require("./parse_node/parse_set_accessor");
const parse_get_accessor_1 = require("./parse_node/parse_get_accessor");
const parse_continue_statement_1 = require("./parse_node/parse_continue_statement");
const parse_type_alias_declaration_1 = require("./parse_node/parse_type_alias_declaration");
const parse_property_access_expression_1 = require("./parse_node/parse_property_access_expression");
const parse_class_declaration_1 = require("./parse_node/parse_class_declaration");
const parse_empty_statement_1 = require("./parse_node/parse_empty_statement");
const parse_conditional_expression_1 = require("./parse_node/parse_conditional_expression");
const parse_arrow_function_1 = require("./parse_node/parse_arrow_function");
const parse_typeof_expression_1 = require("./parse_node/parse_typeof_expression");
const errors_1 = require("./errors");
const parse_template_expression_1 = require("./parse_node/parse_template_expression");
const parse_no_substitution_template_expression_1 = require("./parse_node/parse_no_substitution_template_expression");
const isTsNodeArray = (x) => {
    // Poor man's hack
    return x && "pos" in x && "find" in x;
};
function combine(args) {
    let { parent, nodes, props, parsedStrings, parsedObjs, addIndent } = args;
    if ((!parsedStrings && !parsedObjs) || (parsedStrings && parsedObjs)) {
        throw new Error("Need at least one of parsedStrings or parsedObjs, but not both.");
    }
    if (Array.isArray(nodes)) {
        nodes = [...nodes];
    }
    else if (isTsNodeArray(nodes)) {
        nodes = [...nodes];
    }
    else {
        nodes = [nodes];
    }
    const parsedNodes = nodes.map((node) => {
        if (!node) {
            // We need to preserve the order of the array, incl. undefined, when we call content().
            let res = {
                node: undefined,
                content: "",
                enums: [],
                extraLines: [],
                hoistedEnumImports: [],
                hoistedArrowFunctions: [],
                hoistedLibraryFunctions: new Set(),
            };
            return res;
        }
        const parsed = exports.parseNode(node, props);
        return {
            node,
            errors: [],
            content: parsed.content,
            enums: parsed.enums ?? [],
            extraLines: parsed.extraLines ?? [],
            hoistedEnumImports: parsed.hoistedEnumImports ?? [],
            hoistedArrowFunctions: parsed.hoistedArrowFunctions ?? [],
            hoistedLibraryFunctions: parsed.hoistedLibraryFunctions ?? new Set(),
        };
    });
    for (const parsedNode of parsedNodes) {
        const { node, content, extraLines } = parsedNode;
        if (!node) {
            continue;
        }
        const isStatement = node.kind >= typescript_1.SyntaxKind.FirstStatement &&
            node.kind <= typescript_1.SyntaxKind.LastStatement;
        const isStandAloneLine = isStatement ||
            node.kind === typescript_1.SyntaxKind.PropertyDeclaration ||
            node.kind === typescript_1.SyntaxKind.ImportDeclaration ||
            node.kind === typescript_1.SyntaxKind.EnumDeclaration;
        let formattedContent = content;
        let lines = content.split("\n"); // .filter(x => x !== '');
        if (isStatement) {
            if (extraLines.length > 0) {
                let beforeLines = extraLines
                    .filter((line) => line.type === "before")
                    ?.map((obj) => obj.line) ?? [];
                let afterLines = extraLines
                    .filter((line) => line.type === "after")
                    ?.map((obj) => obj.line) ?? [];
                formattedContent = [
                    ...beforeLines,
                    formattedContent,
                    ...afterLines,
                ].join("\n");
                parsedNode.extraLines = [];
            }
        }
        if (addIndent) {
            if (lines.length > 1) {
                // indent all but the first line.
                formattedContent = lines
                    .map((line, i) => (i > 0 ? "  " : "") + line + "\n")
                    .join("");
            }
        }
        if (isStandAloneLine) {
            formattedContent = formattedContent + "\n";
        }
        if (isStandAloneLine || lines.length > 1) {
            const preceding = ts_utils_1.generatePrecedingNewlines(node, props.getNodeText(node));
            formattedContent = preceding + formattedContent;
        }
        parsedNode.content = formattedContent;
    }
    let stringResult = parsedObjs
        ? parsedObjs(...parsedNodes)
        : parsedStrings(...parsedNodes.map((node) => node.content));
    const initialWhitespaceLength = stringResult.length - stringResult.trimLeft().length;
    stringResult =
        stringResult.slice(initialWhitespaceLength).trimRight() +
            (stringResult.endsWith("\n") ? "\n" : "");
    return {
        content: stringResult,
        enums: parsedNodes.flatMap((node) => node.enums ?? []),
        hoistedEnumImports: parsedNodes.flatMap((node) => node.hoistedEnumImports ?? []),
        hoistedLibraryFunctions: new Set(parsedNodes.flatMap((node) => [
            ...(node.hoistedLibraryFunctions?.keys() ?? []),
        ])),
        hoistedArrowFunctions: parsedNodes.flatMap((node) => node.hoistedArrowFunctions ?? []),
        extraLines: parsedNodes.flatMap((node) => node.extraLines ?? []),
    };
}
exports.combine = combine;
const parseNode = (genericNode, props) => {
    switch (genericNode.kind) {
        case typescript_1.SyntaxKind.SourceFile:
            return parse_source_file_1.parseSourceFile(genericNode, props);
        case typescript_1.SyntaxKind.ImportDeclaration:
            return parse_import_declaration_1.parseImportDeclaration(genericNode, props);
        case typescript_1.SyntaxKind.TypeReference:
            return parse_type_reference_1.parseTypeReference(genericNode, props);
        case typescript_1.SyntaxKind.TypeAliasDeclaration:
            return parse_type_alias_declaration_1.parseTypeAliasDeclaration(genericNode, props);
        case typescript_1.SyntaxKind.BinaryExpression:
            return parse_binary_expression_1.parseBinaryExpression(genericNode, props);
        case typescript_1.SyntaxKind.ArrowFunction:
            return parse_arrow_function_1.parseArrowFunction(genericNode, props);
        case typescript_1.SyntaxKind.NumericLiteral:
            return parse_numeric_literal_1.parseNumericLiteral(genericNode, props);
        case typescript_1.SyntaxKind.ArrayLiteralExpression:
            return parse_array_literal_expression_1.parseArrayLiteralExpression(genericNode, props);
        case typescript_1.SyntaxKind.ObjectLiteralExpression:
            return parse_object_literal_expression_1.parseObjectLiteralExpression(genericNode, props);
        case typescript_1.SyntaxKind.PrefixUnaryExpression:
            return parse_prefix_unary_expression_1.parsePrefixUnaryExpression(genericNode, props);
        case typescript_1.SyntaxKind.AsExpression:
            return exports.parseNode(genericNode.expression, props);
        case typescript_1.SyntaxKind.NewExpression:
            return parse_new_expression_1.parseNewExpression(genericNode, props);
        case typescript_1.SyntaxKind.PostfixUnaryExpression:
            return parse_postfix_unary_expression_1.parsePostfixUnaryExpression(genericNode, props);
        case typescript_1.SyntaxKind.TypeOfExpression:
            return parse_typeof_expression_1.parseTypeofExpression(genericNode, props);
        case typescript_1.SyntaxKind.IfStatement:
            return parse_if_statement_1.parseIfStatement(genericNode, props);
        case typescript_1.SyntaxKind.EmptyStatement:
            return parse_empty_statement_1.parseEmptyStatement(genericNode, props);
        case typescript_1.SyntaxKind.SwitchStatement:
            return parse_switch_statement_1.parseSwitchStatement(genericNode, props);
        case typescript_1.SyntaxKind.CaseBlock:
            return parse_switch_statement_1.parseSwitchCaseBlock(genericNode, props);
        case typescript_1.SyntaxKind.CaseClause:
            return parse_switch_statement_1.parseCaseClause(genericNode, props);
        case typescript_1.SyntaxKind.DefaultClause:
            return parse_switch_statement_1.parseDefaultClause(genericNode, props);
        case typescript_1.SyntaxKind.WhileStatement:
            return parse_while_statement_1.parseWhileStatement(genericNode, props);
        case typescript_1.SyntaxKind.ForStatement:
            return parse_for_statement_1.parseForStatement(genericNode, props);
        case typescript_1.SyntaxKind.ForOfStatement:
            return parse_for_of_statement_1.parseForOfStatement(genericNode, props);
        case typescript_1.SyntaxKind.ForInStatement:
            return parse_for_in_statement_1.parseForInStatement(genericNode, props);
        case typescript_1.SyntaxKind.MethodDeclaration:
            return parse_method_declaration_1.parseMethodDeclaration(genericNode, props);
        case typescript_1.SyntaxKind.Parameter:
            return parse_parameter_1.parseParameter(genericNode, props);
        case typescript_1.SyntaxKind.ElementAccessExpression:
            return parse_element_access_expression_1.parseElementAccessExpression(genericNode, props);
        case typescript_1.SyntaxKind.PropertyDeclaration:
            return parse_property_declaration_1.parsePropertyDeclaration(genericNode, props);
        case typescript_1.SyntaxKind.YieldExpression:
            return parse_yield_expression_1.parseYieldExpression(genericNode, props);
        case typescript_1.SyntaxKind.ParenthesizedExpression:
            return parse_parenthesized_expression_1.parseParenthesizedExpression(genericNode, props);
        case typescript_1.SyntaxKind.Identifier:
            return parse_identifier_1.parseIdentifier(genericNode, props);
        case typescript_1.SyntaxKind.ReturnStatement:
            return parse_return_statement_1.parseReturnStatement(genericNode, props);
        case typescript_1.SyntaxKind.StringLiteral:
            return parse_string_literal_1.parseStringLiteral(genericNode, props);
        case typescript_1.SyntaxKind.TemplateExpression:
            return parse_template_expression_1.parseTemplateExpression(genericNode, props);
        case typescript_1.SyntaxKind.NoSubstitutionTemplateLiteral:
            return parse_no_substitution_template_expression_1.parseNoSubstitutionTemplateLiteral(genericNode, props);
        case typescript_1.SyntaxKind.BreakStatement:
            return parse_break_statement_1.parseBreakStatement(genericNode, props);
        case typescript_1.SyntaxKind.ContinueStatement:
            return parse_continue_statement_1.parseContinueStatement(genericNode, props);
        case typescript_1.SyntaxKind.Block:
            return parse_block_1.parseBlock(genericNode, props);
        case typescript_1.SyntaxKind.CallExpression:
            return parse_call_expression_1.parseCallExpression(genericNode, props);
        case typescript_1.SyntaxKind.ConditionalExpression:
            return parse_conditional_expression_1.parseConditionalExpression(genericNode, props);
        case typescript_1.SyntaxKind.ExpressionStatement:
            return parse_expression_statement_1.parseExpressionStatement(genericNode, props);
        case typescript_1.SyntaxKind.NonNullExpression:
            return exports.parseNode(genericNode.expression, props);
        case typescript_1.SyntaxKind.VariableStatement:
            return parse_variable_statement_1.parseVariableStatement(genericNode, props);
        case typescript_1.SyntaxKind.VariableDeclaration:
            return parse_variable_declaration_1.parseVariableDeclaration(genericNode, props);
        case typescript_1.SyntaxKind.EnumDeclaration:
            return parse_enum_declaration_1.parseEnumDeclaration(genericNode, props);
        case typescript_1.SyntaxKind.VariableDeclarationList:
            return parse_variable_declaration_list_1.parseVariableDeclarationList(genericNode, props);
        case typescript_1.SyntaxKind.SuperKeyword:
            return parse_super_keyword_1.parseSuperKeyword(genericNode, props);
        case typescript_1.SyntaxKind.PropertyAccessExpression:
            return parse_property_access_expression_1.parsePropertyAccessExpression(genericNode, props);
        case typescript_1.SyntaxKind.ThisKeyword:
            return parse_this_keyword_1.parseThisKeyword(genericNode, props);
        case typescript_1.SyntaxKind.Constructor:
            return parse_constructor_1.parseConstructor(genericNode, props);
        case typescript_1.SyntaxKind.ClassExpression:
            return parse_class_declaration_1.parseClassDeclaration(genericNode, props);
        case typescript_1.SyntaxKind.ClassDeclaration:
            return parse_class_declaration_1.parseClassDeclaration(genericNode, props);
        case typescript_1.SyntaxKind.SetAccessor:
            return parse_set_accessor_1.parseSetAccessor(genericNode, props);
        case typescript_1.SyntaxKind.GetAccessor:
            return parse_get_accessor_1.parseGetAccessor(genericNode, props);
        case typescript_1.SyntaxKind.MinusEqualsToken:
            return { content: "-=" };
        // Only used in BinaryExpression, I think
        case typescript_1.SyntaxKind.QuestionQuestionToken:
            return { content: "??" };
        case typescript_1.SyntaxKind.PlusEqualsToken:
            return { content: "+=" };
        case typescript_1.SyntaxKind.AsteriskEqualsToken:
            return { content: "*=" };
        case typescript_1.SyntaxKind.SlashEqualsToken:
            return { content: "/=" };
        case typescript_1.SyntaxKind.PercentEqualsToken:
            return { content: "%=" };
        case typescript_1.SyntaxKind.ExclamationEqualsEqualsToken:
            return { content: "!=" };
        case typescript_1.SyntaxKind.ExclamationEqualsToken:
            return { content: "!=" };
        case typescript_1.SyntaxKind.GreaterThanEqualsToken:
            return { content: ">=" };
        case typescript_1.SyntaxKind.LessThanEqualsToken:
            return { content: "<=" };
        case typescript_1.SyntaxKind.EqualsEqualsToken:
            return { content: "==" };
        case typescript_1.SyntaxKind.AsteriskToken:
            return { content: "*" };
        case typescript_1.SyntaxKind.PercentToken:
            return { content: "%" };
        case typescript_1.SyntaxKind.PlusToken:
            return { content: "+" };
        case typescript_1.SyntaxKind.MinusToken:
            return { content: "-" };
        case typescript_1.SyntaxKind.ExclamationToken:
            return { content: "not" };
        case typescript_1.SyntaxKind.SlashToken:
            return { content: "/" };
        case typescript_1.SyntaxKind.AmpersandAmpersandToken:
            return { content: "and" };
        case typescript_1.SyntaxKind.BarBarToken:
            return { content: "or" };
        case typescript_1.SyntaxKind.EqualsEqualsEqualsToken:
            return { content: "==" };
        case typescript_1.SyntaxKind.LessThanToken:
            return { content: "<" };
        case typescript_1.SyntaxKind.EqualsToken:
            return { content: "=" };
        case typescript_1.SyntaxKind.CommaToken:
            return { content: "," };
        case typescript_1.SyntaxKind.GreaterThanToken:
            return { content: ">" };
        case typescript_1.SyntaxKind.FalseKeyword:
            return { content: "false" };
        case typescript_1.SyntaxKind.TrueKeyword:
            return { content: "true" };
        case typescript_1.SyntaxKind.InstanceOfKeyword:
            return { content: "is" };
        case typescript_1.SyntaxKind.InKeyword:
            return { content: "in" };
        case typescript_1.SyntaxKind.UndefinedKeyword:
            return { content: "null" };
        case typescript_1.SyntaxKind.NullKeyword:
            return { content: "null" };
        case typescript_1.SyntaxKind.AmpersandToken:
            return { content: "&" };
        case typescript_1.SyntaxKind.BarToken:
            return { content: "|" };
        case typescript_1.SyntaxKind.CaretToken:
            return { content: "!=" };
        case typescript_1.SyntaxKind.TildeToken:
            return { content: "!" };
        default:
            console.error(ts_utils_1.syntaxKindToString(genericNode.kind));
            props.addError({
                error: errors_1.ErrorName.UnknownTsSyntax,
                location: genericNode,
                description: `
ts2gd does not current support this code:

${genericNode.getText()}

Try rewriting it, or opening an issue on the ts2gd GitHub repo.
        `,
            });
            return {
                content: "",
            };
    }
};
exports.parseNode = parseNode;
//# sourceMappingURL=parse_node.js.map