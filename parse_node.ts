import ts, { ClassDeclaration, HeritageClause, SourceFile, SyntaxKind, PropertyDeclaration, CallExpression, PropertyAccessExpression, Block, TypeReference, TypeReferenceNode, IfStatement, BinaryExpression, ImportDeclaration, LiteralToken, NumericLiteral, VariableStatement, PostfixUnaryExpression, AsExpression, BreakStatement, PrefixUnaryExpression, ReturnStatement, YieldExpression, NewExpression, ClassExpression, SwitchStatement, SignatureKind, ArrayLiteralExpression, classicNameResolver, parseJsonSourceFileConfigFileContent, ObjectLiteralExpression, StringLiteral, SetAccessorDeclaration, GetAccessorDeclaration, ContinueStatement, TypeAliasDeclaration, TypeFlags } from "typescript";
import { program, TsGdProject } from "./main";
import { parseImportDeclaration } from "./parse_node/parse_import_declaration";
import { parseBinaryExpression } from "./parse_node/parse_binary_expression";
import { parseSourceFile } from "./parse_node/parse_source_file";
import { isDictionary, isEnumType, syntaxToKind } from "./ts_utils";
import { parseTypeReference } from "./parse_node/parse_type_reference";
import { parseNumericLiteral } from "./parse_node/parse_numeric_literal";
import { parseArrayLiteralExpression } from "./parse_node/parse_array_literal_expression";
import { parseNewExpression } from "./parse_node/parse_new_expression";
import { parsePostfixUnaryExpression } from "./parse_node/parse_postfix_unary_expression";
import { parseIfStatement } from "./parse_node/parse_if_statement";
import { parseSwitchStatement } from "./parse_node/parse_switch_statement";
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

export type ParseState = {
  isConstructor: boolean;
  indent: string;
  project: TsGdProject;

  /**
   * Is the current file we're in an autoload class?
   */
  isAutoload: boolean;
  mostRecentControlStructureIsSwitch: boolean;
  usages: Map<ts.Identifier, utils.VariableInfo>
}

export const addIndent = (oldProps: ParseState) => {
  return {
    ...oldProps,
    indent: oldProps.indent + "  ",
  };
}

export const parseNodeToString = (genericNode: ts.Node, props: ParseState): string => {
  switch (genericNode.kind) {
    case SyntaxKind.SourceFile:
      return parseSourceFile(genericNode as SourceFile, props);
    case SyntaxKind.ImportDeclaration:
      return parseImportDeclaration(genericNode as ImportDeclaration, props);
    case SyntaxKind.TypeReference:
      return parseTypeReference(genericNode as TypeReferenceNode, props);
    case SyntaxKind.TypeAliasDeclaration:
      return parseTypeAliasDeclaration(genericNode as TypeAliasDeclaration, props);
    case SyntaxKind.BinaryExpression:
      return parseBinaryExpression(genericNode as BinaryExpression, props);
    case SyntaxKind.NumericLiteral:
      return parseNumericLiteral(genericNode as NumericLiteral, props);
    case SyntaxKind.ArrayLiteralExpression:
      return parseArrayLiteralExpression(genericNode as ArrayLiteralExpression, props);
    case SyntaxKind.ObjectLiteralExpression:
      return parseObjectLiteralExpression(genericNode as ObjectLiteralExpression, props);
    case SyntaxKind.PrefixUnaryExpression:
      return parsePrefixUnaryExpression(genericNode as PrefixUnaryExpression, props);
    case SyntaxKind.AsExpression:
      return parseNodeToString((genericNode as AsExpression).expression, props);
    case SyntaxKind.NewExpression:
      return parseNewExpression(genericNode as NewExpression, props);
    case SyntaxKind.PostfixUnaryExpression:
      return parsePostfixUnaryExpression(genericNode as PostfixUnaryExpression, props);
    case SyntaxKind.IfStatement:
      return parseIfStatement(genericNode as IfStatement, props);
    case SyntaxKind.EmptyStatement:
      return '';
    case SyntaxKind.SwitchStatement:
      return parseSwitchStatement(genericNode as SwitchStatement, props);
    case SyntaxKind.WhileStatement:
      return parseWhileStatement(genericNode, props);
    case SyntaxKind.ForStatement:
      return parseForStatement(genericNode, props);
    case SyntaxKind.ForOfStatement:
      return parseForOfStatement(genericNode, props);
    case SyntaxKind.ForInStatement:
      return parseForInStatement(genericNode, props);
    case SyntaxKind.MethodDeclaration:
      return parseMethodDeclaration(genericNode, props);
    case SyntaxKind.Parameter:
      return parseParameter(genericNode, props);
    case SyntaxKind.ElementAccessExpression:
      return parseElementAccessExpression(genericNode, props);
    case SyntaxKind.PropertyDeclaration:
      return parsePropertyDeclaration(genericNode as PropertyDeclaration, props);
    case SyntaxKind.YieldExpression:
      return parseYieldExpression(genericNode as YieldExpression, props);
    case SyntaxKind.ParenthesizedExpression:
      return parseParenthesizedExpression(genericNode, props);
    case SyntaxKind.Identifier:
      return parseIdentifier(genericNode);
    case SyntaxKind.ReturnStatement:
      return parseReturnStatement(genericNode as ReturnStatement, props);
    case SyntaxKind.StringLiteral:
      return parseStringLiteral(genericNode as StringLiteral);
    case SyntaxKind.BreakStatement:
      return parseBreakStatement(genericNode as BreakStatement, props);
    case SyntaxKind.ContinueStatement:
      return parseContinueStatement(genericNode as ContinueStatement, props);
    case SyntaxKind.Block:
      return parseBlock(genericNode as ts.Block, props);
    case SyntaxKind.CallExpression:
      return parseCallExpression(genericNode as ts.CallExpression, props);
    case SyntaxKind.ExpressionStatement:
      return parseExpressionStatement(genericNode as ts.ExpressionStatement, props);
    case SyntaxKind.VariableStatement:
      return parseVariableStatement(genericNode as ts.VariableStatement, props);
    case SyntaxKind.VariableDeclaration:
      return parseVariableDeclaration(genericNode, props);
    case SyntaxKind.EnumDeclaration:
      return parseEnumDeclaration(genericNode);
    case SyntaxKind.VariableDeclarationList:
      return parseVariableDeclarationList(genericNode, props);
    case SyntaxKind.SuperKeyword:
      return parseSuperKeyword(genericNode);
    case SyntaxKind.PropertyAccessExpression:
      return parsePropertyAccessExpression(genericNode as ts.PropertyAccessExpression, props)
    case SyntaxKind.ThisKeyword: return parseThisKeyword(genericNode);
    case SyntaxKind.Constructor: return parseConstructor(genericNode, props);
    case SyntaxKind.ClassExpression:
    case SyntaxKind.ClassDeclaration: {
      const node = genericNode as ClassDeclaration | ClassExpression;

      // Preprocess set/get to make setget declarations
      const setOrGetters = node.members.filter(member => member.kind === SyntaxKind.SetAccessor || member.kind === SyntaxKind.GetAccessor);

      const pairings: { setter?: ts.SetAccessorDeclaration; getter?: ts.GetAccessorDeclaration; name: string }[] = [];

      for (const setGet of setOrGetters) {
        if (setGet.kind === SyntaxKind.SetAccessor) {
          const setter = setGet as SetAccessorDeclaration;
          const name = setter.name.getText();
          const existingObj = pairings.find(pair => pair.name === name);

          if (existingObj) {
            existingObj.setter = setter;
          } else {
            pairings.push({ setter, name })
          }
        }

        if (setGet.kind === SyntaxKind.GetAccessor) {
          const getter = setGet as GetAccessorDeclaration;
          const name = getter.name.getText();
          const existingObj = pairings.find(pair => pair.name === name);

          if (existingObj) {
            existingObj.getter = getter;
          } else {
            pairings.push({ getter, name })
          }
        }
      }

      const parsedSetterGetters = pairings.map(({ setter, getter, name }) => {
        return `var ${name} setget ${setter ? name + "_set" : ""}, ${getter ? name + "_get" : ""}`
      }).join('\n')

      // NOTE: Since extends and class_name *must* come first in the file,
      // they are added ahead of time by parse_source_file.ts.

      return `${parsedSetterGetters}
${node.members.map(member => parseNodeToString(member, props)).join('\n')}
`;

      return `i am a class lol`;
    }
    case SyntaxKind.SetAccessor:
      return parseSetAccessor(genericNode, props);
    case SyntaxKind.GetAccessor:
      return parseGetAccessor(genericNode, props);
    case SyntaxKind.MinusEqualsToken:
      return "-=";
    case SyntaxKind.PlusEqualsToken:
      return "+=";
    case SyntaxKind.AsteriskEqualsToken:
      return "*=";
    case SyntaxKind.ExclamationEqualsEqualsToken:
      return "!=";
    case SyntaxKind.ExclamationEqualsToken:
      return "!=";
    case SyntaxKind.EqualsEqualsToken:
      return "==";
    case SyntaxKind.AsteriskToken:
      return "*";
    case SyntaxKind.PlusToken:
      return "+";
    case SyntaxKind.MinusToken:
      return "-";
    case SyntaxKind.ExclamationToken:
      return "not";
    case SyntaxKind.SlashToken:
      return "/";
    case SyntaxKind.AmpersandAmpersandToken:
      return "and";
    case SyntaxKind.EqualsEqualsEqualsToken:
      return "==";
    case SyntaxKind.LessThanToken:
      return "<";
    case SyntaxKind.EqualsToken:
      return "=";
    case SyntaxKind.CommaToken:
      return ",";
    case SyntaxKind.GreaterThanToken:
      return ">";
    case SyntaxKind.FalseKeyword:
      return "false";
    case SyntaxKind.TrueKeyword:
      return "true";
    case SyntaxKind.InstanceOfKeyword:
      return "is";
    case SyntaxKind.InKeyword:
      return "in"
    case SyntaxKind.UndefinedKeyword:
      return "null";
    case SyntaxKind.NullKeyword:
      return "null";
  }

  throw new Error('uh oh!: ' + syntaxToKind(genericNode.kind) + " " + (genericNode.getText ? genericNode.getText() : genericNode));
}
