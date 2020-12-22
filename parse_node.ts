import ts, { SyntaxKind } from "typescript";
import { parseImportDeclaration } from "./parse_node/parse_import_declaration";
import { parseBinaryExpression } from "./parse_node/parse_binary_expression";
import { parseSourceFile } from "./parse_node/parse_source_file";
import { generatePrecedingNewlines, syntaxToKind, TsGdProject } from "./ts_utils";
import { parseTypeReference } from "./parse_node/parse_type_reference";
import { parseNumericLiteral } from "./parse_node/parse_numeric_literal";
import { parseArrayLiteralExpression } from "./parse_node/parse_array_literal_expression";
import { parseNewExpression } from "./parse_node/parse_new_expression";
import { parsePostfixUnaryExpression } from "./parse_node/parse_postfix_unary_expression";
import { parseIfStatement } from "./parse_node/parse_if_statement";
import { parseSwitchCaseBlock, parseCaseClause, parseDefaultClause, parseSwitchStatement } from "./parse_node/parse_switch_statement";
import { parsePrefixUnaryExpression } from "./parse_node/parse_prefix_unary_expression";
import { parseObjectLiteralExpression } from "./parse_node/parse_object_literal_expression";
import { parseConstructor } from "./parse_node/parse_constructor";
import { parseThisKeyword } from "./parse_node/parse_this_keyword";
import { parseSuperKeyword } from "./parse_node/parse_super_keyword";
import { parseVariableDeclarationList } from "./parse_node/parse_variable_declaration_list";
import { parseEnumDeclaration } from "./parse_node/parse_enum_declaration";
import { parseVariableDeclaration } from "./parse_node/parse_variable_declaration";
import { parseExpressionStatement } from "./parse_node/parse_expression_statement";
import { parseStringLiteral } from "./parse_node/parse_string_literal";
import { parseIdentifier } from "./parse_node/parse_identifier";
import { parseParenthesizedExpression } from "./parse_node/parse_parenthesized_expression";
import { parseElementAccessExpression } from "./parse_node/parse_element_access_expression";
import { parseParameter } from "./parse_node/parse_parameter";
import { parseMethodDeclaration } from "./parse_node/parse_method_declaration";
import { parseForInStatement } from "./parse_node/parse_for_in_statement";
import { parseForOfStatement } from "./parse_node/parse_for_of_statement";
import { parseForStatement } from "./parse_node/parse_for_statement";
import { parseWhileStatement } from "./parse_node/parse_while_statement";
import { parsePropertyDeclaration } from "./parse_node/parse_property_declaration";
import { parseYieldExpression } from "./parse_node/parse_yield_expression";
import { parseReturnStatement } from "./parse_node/parse_return_statement";
import { parseBreakStatement } from "./parse_node/parse_break_statement";
import { parseBlock } from "./parse_node/parse_block";
import { parseCallExpression } from "./parse_node/parse_call_expression";
import { parseVariableStatement } from "./parse_node/parse_variable_statement";
import { parseSetAccessor } from "./parse_node/parse_set_accessor";
import { parseGetAccessor } from "./parse_node/parse_get_accessor";
import { parseContinueStatement } from "./parse_node/parse_continue_statement";
import * as utils from 'tsutils';
import { parseTypeAliasDeclaration } from "./parse_node/parse_type_alias_declaration";
import { parsePropertyAccessExpression } from "./parse_node/parse_property_access_expression";
import { parseClassDeclaration } from "./parse_node/parse_class_declaration";
import { parseEmptyStatement } from "./parse_node/parse_empty_statement";
import { parseConditionalExpression } from "./parse_node/parse_conditional_expression";
import { parseArrowFunction } from "./parse_node/parse_arrow_function";
import { parseTypeofExpression } from "./parse_node/parse_typeof_expression";

export type ParseState = {
  isConstructor: boolean;
  indent: string;
  project: TsGdProject;
  program: ts.Program;
  genUniqueName: () => string;

  /**
   * Is the current file we're in an autoload class?
   */
  isAutoload: boolean;
  mostRecentControlStructureIsSwitch: boolean;
  usages: Map<ts.Identifier, utils.VariableInfo>
}

export type ParseNodeType = {
  content: string;
  hoistedEnumImports?: string[];
  hoistedArrowFunctions?: string[];
  hoistedLibraryFunctions?: string[]
  enums?: {
    /** Content of the enum */
    content: string;

    /**
     * Name of the created enum
     */
    name: string;
  }[];
};

// export function combine(parent: ts.Node, nodes: ts.Node[], props: ParseState, content: (...args: string[]) => string): ParseNodeType;
// export function combine(parent: ts.Node, nodes: (ts.Node | undefined)[], props: ParseState, content: (...args: string[]) => string): ParseNodeType;
// export function combine(parent: ts.Node, nodes: ts.NodeArray<ts.Node>, props: ParseState, content: (...args: string[]) => string): ParseNodeType;
// export function combine(args: { parent: ts.Node, nodes: ts.Node | undefined, props: ParseState, content: (arg: string) => string }): ParseNodeType;
export function combine(args: {
  parent: ts.Node;
  nodes: undefined | ts.Node | undefined | (ts.Node | undefined)[] | ts.NodeArray<ts.Node>;
  props: ParseState;
  content: (...args: string[]) => string;

  addIndent?: boolean;
}): ParseNodeType {
  let { parent, nodes, props, content, addIndent } = args;

  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  } else {
    nodes = [...nodes]
  }

  const parsedNodes: (Required<ParseNodeType> & { node: ts.Node | undefined })[] = nodes.map(node => {
    if (!node) {
      // We need to preserve the order of the array, incl. undefined, when we call content().
      return {
        node: undefined,
        content: '',
        enums: [],
        hoistedEnumImports: [],
        hoistedArrowFunctions: [],
        hoistedLibraryFunctions: [],
      };
    };

    const parsed = parseNode(node, props)

    return {
      node,
      content: parsed.content,
      enums: parsed.enums ?? [],
      hoistedEnumImports: parsed.hoistedEnumImports ?? [],
      hoistedArrowFunctions: parsed.hoistedArrowFunctions ?? [],
      hoistedLibraryFunctions: parsed.hoistedLibraryFunctions ?? [],
    }
  });

  const strings = parsedNodes.map((parsed) => {
    const { node, content, enums } = parsed;

    if (!node) { return ''; }

    let isStandAloneLine =
      (node.kind >= SyntaxKind.FirstStatement && node.kind <= SyntaxKind.LastStatement) ||
      node.kind === SyntaxKind.PropertyDeclaration ||
      node.kind === SyntaxKind.ImportDeclaration ||
      node.kind === SyntaxKind.EnumDeclaration
      ;
    let result = content;
    const lines = content.split('\n'); // .filter(x => x !== '');

    if (addIndent) {
      if (lines.length > 1) {
        // indent all but the first line.
        result = lines.map((line, i) => ((i > 0) ? '  ' : '') + line + '\n').join('');
      }
    }

    if (isStandAloneLine && lines.length === 1) {
      result = result + "\n";
    }

    if (isStandAloneLine || lines.length > 1) {
      const preceding = generatePrecedingNewlines(node);
      result = preceding + result;
    }

    return result;
  });

  let stringResult = content(...strings);
  let dummy = content(...strings.map(s => "x"));
  let initialWhitespaceLength = dummy.length - dummy.trimLeft().length;
  stringResult = stringResult.slice(initialWhitespaceLength).trimRight() + (stringResult.endsWith('\n') ? '\n' : '');

  return {
    content: stringResult,
    enums: parsedNodes.flatMap(node => node.enums ?? []),
    hoistedEnumImports: parsedNodes.flatMap(node => node.hoistedEnumImports ?? []),
    hoistedLibraryFunctions: parsedNodes.flatMap(node => node.hoistedLibraryFunctions ?? []),
    hoistedArrowFunctions: parsedNodes.flatMap(node => node.hoistedArrowFunctions ?? []),
  };
}

export const parseNode = (genericNode: ts.Node, props: ParseState): ParseNodeType => {
  switch (genericNode.kind) {
    case SyntaxKind.SourceFile:
      return parseSourceFile(genericNode as ts.SourceFile, props);
    case SyntaxKind.ImportDeclaration:
      return parseImportDeclaration(genericNode as ts.ImportDeclaration, props);
    case SyntaxKind.TypeReference:
      return parseTypeReference(genericNode as ts.TypeReferenceNode, props);
    case SyntaxKind.TypeAliasDeclaration:
      return parseTypeAliasDeclaration(genericNode as ts.TypeAliasDeclaration, props);
    case SyntaxKind.BinaryExpression:
      return parseBinaryExpression(genericNode as ts.BinaryExpression, props);
    case SyntaxKind.ArrowFunction:
      return parseArrowFunction(genericNode as ts.ArrowFunction, props);
    case SyntaxKind.NumericLiteral:
      return parseNumericLiteral(genericNode as ts.NumericLiteral, props);
    case SyntaxKind.ArrayLiteralExpression:
      return parseArrayLiteralExpression(genericNode as ts.ArrayLiteralExpression, props);
    case SyntaxKind.ObjectLiteralExpression:
      return parseObjectLiteralExpression(genericNode as ts.ObjectLiteralExpression, props);
    case SyntaxKind.PrefixUnaryExpression:
      return parsePrefixUnaryExpression(genericNode as ts.PrefixUnaryExpression, props);
    case SyntaxKind.AsExpression:
      return parseNode((genericNode as ts.AsExpression).expression, props);
    case SyntaxKind.NewExpression:
      return parseNewExpression(genericNode as ts.NewExpression, props);
    case SyntaxKind.PostfixUnaryExpression:
      return parsePostfixUnaryExpression(genericNode as ts.PostfixUnaryExpression, props);
    case SyntaxKind.TypeOfExpression:
      return parseTypeofExpression(genericNode as ts.TypeOfExpression, props);
    case SyntaxKind.IfStatement:
      return parseIfStatement(genericNode as ts.IfStatement, props);
    case SyntaxKind.EmptyStatement:
      return parseEmptyStatement(genericNode as ts.EmptyStatement, props);
    case SyntaxKind.SwitchStatement:
      return parseSwitchStatement(genericNode as ts.SwitchStatement, props);
    case SyntaxKind.CaseBlock:
      return parseSwitchCaseBlock(genericNode as ts.CaseBlock, props);
    case SyntaxKind.CaseClause:
      return parseCaseClause(genericNode as ts.CaseClause, props);
    case SyntaxKind.DefaultClause:
      return parseDefaultClause(genericNode as ts.DefaultClause, props);
    case SyntaxKind.WhileStatement:
      return parseWhileStatement(genericNode as ts.WhileStatement, props);
    case SyntaxKind.ForStatement:
      return parseForStatement(genericNode as ts.ForStatement, props);
    case SyntaxKind.ForOfStatement:
      return parseForOfStatement(genericNode as ts.ForOfStatement, props);
    case SyntaxKind.ForInStatement:
      return parseForInStatement(genericNode as ts.ForInStatement, props);
    case SyntaxKind.MethodDeclaration:
      return parseMethodDeclaration(genericNode as ts.MethodDeclaration, props);
    case SyntaxKind.Parameter:
      return parseParameter(genericNode as ts.ParameterDeclaration, props);
    case SyntaxKind.ElementAccessExpression:
      return parseElementAccessExpression(genericNode as ts.ElementAccessExpression, props);
    case SyntaxKind.PropertyDeclaration:
      return parsePropertyDeclaration(genericNode as ts.PropertyDeclaration, props);
    case SyntaxKind.YieldExpression:
      return parseYieldExpression(genericNode as ts.YieldExpression, props);
    case SyntaxKind.ParenthesizedExpression:
      return parseParenthesizedExpression(genericNode as ts.ParenthesizedExpression, props);
    case SyntaxKind.Identifier:
      return parseIdentifier(genericNode as ts.Identifier, props);
    case SyntaxKind.ReturnStatement:
      return parseReturnStatement(genericNode as ts.ReturnStatement, props);
    case SyntaxKind.StringLiteral:
      return parseStringLiteral(genericNode as ts.StringLiteral, props);
    case SyntaxKind.BreakStatement:
      return parseBreakStatement(genericNode as ts.BreakStatement, props);
    case SyntaxKind.ContinueStatement:
      return parseContinueStatement(genericNode as ts.ContinueStatement, props);
    case SyntaxKind.Block:
      return parseBlock(genericNode as ts.Block, props);
    case SyntaxKind.CallExpression:
      return parseCallExpression(genericNode as ts.CallExpression, props);
    case SyntaxKind.ConditionalExpression:
      return parseConditionalExpression(genericNode as ts.ConditionalExpression, props);
    case SyntaxKind.ExpressionStatement:
      return parseExpressionStatement(genericNode as ts.ExpressionStatement, props);
    case SyntaxKind.VariableStatement:
      return parseVariableStatement(genericNode as ts.VariableStatement, props);
    case SyntaxKind.VariableDeclaration:
      return parseVariableDeclaration(genericNode as ts.VariableDeclaration, props);
    case SyntaxKind.EnumDeclaration:
      return parseEnumDeclaration(genericNode as ts.EnumDeclaration, props);
    case SyntaxKind.VariableDeclarationList:
      return parseVariableDeclarationList(genericNode as ts.VariableDeclarationList, props);
    case SyntaxKind.SuperKeyword:
      return parseSuperKeyword(genericNode as ts.SuperExpression, props);
    case SyntaxKind.PropertyAccessExpression:
      return parsePropertyAccessExpression(genericNode as ts.PropertyAccessExpression, props)
    case SyntaxKind.ThisKeyword:
      return parseThisKeyword(genericNode as ts.ThisExpression, props);
    case SyntaxKind.Constructor:
      return parseConstructor(genericNode as ts.ConstructorDeclaration, props);
    case SyntaxKind.ClassExpression:
      return parseClassDeclaration(genericNode as ts.ClassDeclaration | ts.ClassExpression, props);
    case SyntaxKind.ClassDeclaration:
      return parseClassDeclaration(genericNode as ts.ClassDeclaration | ts.ClassExpression, props);
    case SyntaxKind.SetAccessor:
      return parseSetAccessor(genericNode as ts.SetAccessorDeclaration, props);
    case SyntaxKind.GetAccessor:
      return parseGetAccessor(genericNode as ts.GetAccessorDeclaration, props);
    case SyntaxKind.MinusEqualsToken:
      return { content: "-=" };
    case SyntaxKind.PlusEqualsToken:
      return { content: "+=" };
    case SyntaxKind.AsteriskEqualsToken:
      return { content: "*=" };
    case SyntaxKind.ExclamationEqualsEqualsToken:
      return { content: "!=" };
    case SyntaxKind.ExclamationEqualsToken:
      return { content: "!=" };
    case SyntaxKind.EqualsEqualsToken:
      return { content: "==" };
    case SyntaxKind.AsteriskToken:
      return { content: "*" };
    case SyntaxKind.PercentToken:
      return { content: "%" };
    case SyntaxKind.PlusToken:
      return { content: "+" };
    case SyntaxKind.MinusToken:
      return { content: "-" };
    case SyntaxKind.ExclamationToken:
      return { content: "not" };
    case SyntaxKind.SlashToken:
      return { content: "/" };
    case SyntaxKind.AmpersandAmpersandToken:
      return { content: "and" };
    case SyntaxKind.BarBarToken:
      return { content: "or" };
    case SyntaxKind.EqualsEqualsEqualsToken:
      return { content: "==" };
    case SyntaxKind.LessThanToken:
      return { content: "<" };
    case SyntaxKind.EqualsToken:
      return { content: "=" };
    case SyntaxKind.CommaToken:
      return { content: "," };
    case SyntaxKind.GreaterThanToken:
      return { content: ">" };
    case SyntaxKind.FalseKeyword:
      return { content: "false" };
    case SyntaxKind.TrueKeyword:
      return { content: "true" };
    case SyntaxKind.InstanceOfKeyword:
      return { content: "is" };
    case SyntaxKind.InKeyword:
      return { content: "in" }
    case SyntaxKind.UndefinedKeyword:
      return { content: "null" };
    case SyntaxKind.NullKeyword:
      return { content: "null" };
  }

  throw new Error('uh oh!: ' + syntaxToKind(genericNode.kind) + " " + (genericNode.getText ? genericNode.getText() : genericNode));
}
