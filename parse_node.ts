import * as utils from "tsutils"
import ts, { SyntaxKind, tokenToString } from "typescript"
import { parseImportDeclaration } from "./parse_node/parse_import_declaration"
import { parseBinaryExpression } from "./parse_node/parse_binary_expression"
import { parseSourceFile } from "./parse_node/parse_source_file"
import {
  generatePrecedingNewlines,
  syntaxKindToString as kindToString,
  syntaxKindToString,
} from "./ts_utils"
import { parseTypeReference } from "./parse_node/parse_type_reference"
import { parseNumericLiteral } from "./parse_node/parse_numeric_literal"
import { parseArrayLiteralExpression } from "./parse_node/parse_array_literal_expression"
import { parseNewExpression } from "./parse_node/parse_new_expression"
import { parsePostfixUnaryExpression } from "./parse_node/parse_postfix_unary_expression"
import { parseIfStatement } from "./parse_node/parse_if_statement"
import {
  parseSwitchCaseBlock,
  parseCaseClause,
  parseDefaultClause,
  parseSwitchStatement,
} from "./parse_node/parse_switch_statement"
import { parsePrefixUnaryExpression } from "./parse_node/parse_prefix_unary_expression"
import { parseObjectLiteralExpression } from "./parse_node/parse_object_literal_expression"
import { parseConstructor } from "./parse_node/parse_constructor"
import { parseThisKeyword } from "./parse_node/parse_this_keyword"
import { parseSuperKeyword } from "./parse_node/parse_super_keyword"
import { parseVariableDeclarationList } from "./parse_node/parse_variable_declaration_list"
import { parseEnumDeclaration } from "./parse_node/parse_enum_declaration"
import { parseVariableDeclaration } from "./parse_node/parse_variable_declaration"
import { parseExpressionStatement } from "./parse_node/parse_expression_statement"
import { parseStringLiteral } from "./parse_node/parse_string_literal"
import { parseIdentifier } from "./parse_node/parse_identifier"
import { parseParenthesizedExpression } from "./parse_node/parse_parenthesized_expression"
import { parseElementAccessExpression } from "./parse_node/parse_element_access_expression"
import { parseParameter } from "./parse_node/parse_parameter"
import { parseMethodDeclaration } from "./parse_node/parse_method_declaration"
import { parseForInStatement } from "./parse_node/parse_for_in_statement"
import { parseForOfStatement } from "./parse_node/parse_for_of_statement"
import { parseForStatement } from "./parse_node/parse_for_statement"
import { parseWhileStatement } from "./parse_node/parse_while_statement"
import { parsePropertyDeclaration } from "./parse_node/parse_property_declaration"
import { parseYieldExpression } from "./parse_node/parse_yield_expression"
import { parseReturnStatement } from "./parse_node/parse_return_statement"
import { parseBreakStatement } from "./parse_node/parse_break_statement"
import { parseBlock } from "./parse_node/parse_block"
import { parseCallExpression } from "./parse_node/parse_call_expression"
import { parseVariableStatement } from "./parse_node/parse_variable_statement"
import { parseSetAccessor } from "./parse_node/parse_set_accessor"
import { parseGetAccessor } from "./parse_node/parse_get_accessor"
import { parseContinueStatement } from "./parse_node/parse_continue_statement"
import { parseTypeAliasDeclaration } from "./parse_node/parse_type_alias_declaration"
import { parsePropertyAccessExpression } from "./parse_node/parse_property_access_expression"
import { parseClassDeclaration } from "./parse_node/parse_class_declaration"
import { parseEmptyStatement } from "./parse_node/parse_empty_statement"
import { parseConditionalExpression } from "./parse_node/parse_conditional_expression"
import { parseArrowFunction } from "./parse_node/parse_arrow_function"
import { parseTypeofExpression } from "./parse_node/parse_typeof_expression"
import { TsGdProjectClass } from "./project/project"
import { Scope } from "./scope"
import { addError, ErrorName, TsGdError } from "./errors"
import { parseTemplateExpression } from "./parse_node/parse_template_expression"
import { parseNoSubstitutionTemplateLiteral } from "./parse_node/parse_no_substitution_template_expression"
import { AssetSourceFile } from "./project/assets/asset_source_file"
import { LibraryFunctionName } from "./parse_node/library_functions"
import { parseComments } from "./parse_node/parse_node_with_comments"

export type ParseState = {
  isConstructor: boolean
  indent: string
  project: TsGdProjectClass
  program: ts.Program
  scope: Scope

  /**
   * Is the current file we're in an autoload class?
   */
  isAutoload: boolean
  mostRecentControlStructureIsSwitch: boolean
  mostRecentForStatement?: {
    incrementor: string
  }
  usages: Map<ts.Identifier, utils.VariableInfo>
  sourceFile: ts.SourceFile
  sourceFileAsset: AssetSourceFile
  commentsStack?: ts.CommentRange[]
}

export enum ExtraLineType {
  Increment,
  Decrement,
  DefaultInitialization,
  NullableIntermediateExpression,
}

export type ExtraLine = {
  type: "before" | "after"
  lineType: ExtraLineType
  line: string
}

export type ParseNodeType = {
  content: string
  files?: { filePath: string; body: string }[]
  hoistedArrowFunctions?: {
    name: string
    content: string
    node: ts.ArrowFunction
  }[]
  hoistedLibraryFunctions?: Set<LibraryFunctionName>
  extraLines?: ExtraLine[]
}

const isTsNodeArray = <T extends ts.Node>(x: any): x is ts.NodeArray<T> => {
  // Poor man's hack
  return x && "pos" in x && "find" in x
}

export function combine(args: {
  parent: ts.Node
  nodes: ts.Node | undefined | (ts.Node | undefined)[] | ts.NodeArray<ts.Node>
  props: ParseState

  // We default to calling this callback...
  parsedStrings?: (...args: string[]) => string

  // ...unless this one is passed in, in which case we call it instead.
  parsedObjs?: (...args: ParseNodeType[]) => string

  addIndent?: boolean
}): ParseNodeType {
  let { parent, nodes, props, parsedStrings, parsedObjs, addIndent } = args

  if ((!parsedStrings && !parsedObjs) || (parsedStrings && parsedObjs)) {
    throw new Error(
      "Need at least one of parsedStrings or parsedObjs, but not both."
    )
  }

  if (Array.isArray(nodes)) {
    nodes = [...nodes]
  } else if (isTsNodeArray(nodes)) {
    nodes = [...nodes]
  } else {
    nodes = [nodes]
  }

  const parsedNodes: (Required<ParseNodeType> & {
    node: ts.Node | undefined
  })[] = nodes.map((node) => {
    const parsed = node ? parseNode(node, props) : undefined

    return {
      node,
      errors: [],
      content: parsed?.content ?? "",
      extraLines: parsed?.extraLines ?? [],
      hoistedArrowFunctions: parsed?.hoistedArrowFunctions ?? [],
      hoistedLibraryFunctions: parsed?.hoistedLibraryFunctions ?? new Set(),
      files: parsed?.files ?? [],
    }
  })

  for (const parsedNode of parsedNodes) {
    const { node, content, extraLines } = parsedNode

    if (!node) {
      continue
    }

    const isStatement =
      node.kind >= SyntaxKind.FirstStatement &&
      node.kind <= SyntaxKind.LastStatement

    const isStandAloneLine =
      isStatement ||
      node.kind === SyntaxKind.PropertyDeclaration ||
      node.kind === SyntaxKind.ImportDeclaration ||
      node.kind === SyntaxKind.EnumDeclaration

    let formattedContent = content
    let lines = content.split("\n") // .filter(x => x !== '');

    if (isStatement) {
      if (extraLines.length > 0) {
        let beforeLines =
          extraLines
            .filter((line) => line.type === "before")
            ?.map((obj) => obj.line) ?? []
        let afterLines =
          extraLines
            .filter((line) => line.type === "after")
            ?.map((obj) => obj.line) ?? []

        formattedContent = [
          ...beforeLines,
          formattedContent,
          ...afterLines,
        ].join("\n")

        parsedNode.extraLines = []
      }
    }

    if (addIndent) {
      if (lines.length > 1) {
        // indent all but the first line.
        formattedContent = lines
          .map((line, i) => (i > 0 ? "  " : "") + line + "\n")
          .join("")
      }
    }

    if (isStandAloneLine) {
      formattedContent = formattedContent + "\n"
    }

    if (isStandAloneLine || lines.length > 1) {
      const preceding = generatePrecedingNewlines(node, node.getText())
      formattedContent = preceding + formattedContent
    }

    parsedNode.content = formattedContent
  }

  let stringResult = parsedObjs
    ? parsedObjs(...parsedNodes)
    : parsedStrings!(...parsedNodes.map((node) => node.content))
  const initialWhitespaceLength =
    stringResult.length - stringResult.trimLeft().length
  stringResult =
    stringResult.slice(initialWhitespaceLength).trimRight() +
    (stringResult.endsWith("\n") ? "\n" : "")

  return {
    content: stringResult,
    hoistedLibraryFunctions: new Set(
      parsedNodes.flatMap((node) => [
        ...(node.hoistedLibraryFunctions?.keys() ?? []),
      ])
    ),
    hoistedArrowFunctions: parsedNodes.flatMap(
      (node) => node.hoistedArrowFunctions ?? []
    ),
    extraLines: parsedNodes.flatMap((node) => node.extraLines ?? []),
    files: parsedNodes.flatMap((node) => node.files ?? []),
  }
}

export const parseNode = (
  genericNode: ts.Node,
  props: ParseState,
  options?: { ignoreComments?: boolean }
): ParseNodeType => {
  // TsGdProjectClass.Paths is undefined when running tests
  if (
    !(TsGdProjectClass.Paths ?? {}).removeComments &&
    !options?.ignoreComments
  ) {
    return parseComments(genericNode, props)
  }

  switch (genericNode.kind) {
    case SyntaxKind.SourceFile:
      return parseSourceFile(genericNode as ts.SourceFile, props)
    case SyntaxKind.ImportDeclaration:
      return parseImportDeclaration(genericNode as ts.ImportDeclaration, props)
    case SyntaxKind.TypeReference:
      return parseTypeReference(genericNode as ts.TypeReferenceNode, props)
    case SyntaxKind.TypeAliasDeclaration:
      return parseTypeAliasDeclaration(
        genericNode as ts.TypeAliasDeclaration,
        props
      )
    case SyntaxKind.BinaryExpression:
      return parseBinaryExpression(genericNode as ts.BinaryExpression, props)
    case SyntaxKind.ArrowFunction:
      return parseArrowFunction(genericNode as ts.ArrowFunction, props)
    case SyntaxKind.NumericLiteral:
      return parseNumericLiteral(genericNode as ts.NumericLiteral, props)
    case SyntaxKind.ArrayLiteralExpression:
      return parseArrayLiteralExpression(
        genericNode as ts.ArrayLiteralExpression,
        props
      )
    case SyntaxKind.ObjectLiteralExpression:
      return parseObjectLiteralExpression(
        genericNode as ts.ObjectLiteralExpression,
        props
      )
    case SyntaxKind.PrefixUnaryExpression:
      return parsePrefixUnaryExpression(
        genericNode as ts.PrefixUnaryExpression,
        props
      )
    case SyntaxKind.AsExpression:
      return parseNode((genericNode as ts.AsExpression).expression, props)
    case SyntaxKind.NewExpression:
      return parseNewExpression(genericNode as ts.NewExpression, props)
    case SyntaxKind.PostfixUnaryExpression:
      return parsePostfixUnaryExpression(
        genericNode as ts.PostfixUnaryExpression,
        props
      )
    case SyntaxKind.TypeOfExpression:
      return parseTypeofExpression(genericNode as ts.TypeOfExpression, props)
    case SyntaxKind.IfStatement:
      return parseIfStatement(genericNode as ts.IfStatement, props)
    case SyntaxKind.EmptyStatement:
      return parseEmptyStatement(genericNode as ts.EmptyStatement, props)
    case SyntaxKind.SwitchStatement:
      return parseSwitchStatement(genericNode as ts.SwitchStatement, props)
    case SyntaxKind.CaseBlock:
      return parseSwitchCaseBlock(genericNode as ts.CaseBlock, props)
    case SyntaxKind.CaseClause:
      return parseCaseClause(genericNode as ts.CaseClause, props)
    case SyntaxKind.DefaultClause:
      return parseDefaultClause(genericNode as ts.DefaultClause, props)
    case SyntaxKind.WhileStatement:
      return parseWhileStatement(genericNode as ts.WhileStatement, props)
    case SyntaxKind.ForStatement:
      return parseForStatement(genericNode as ts.ForStatement, props)
    case SyntaxKind.ForOfStatement:
      return parseForOfStatement(genericNode as ts.ForOfStatement, props)
    case SyntaxKind.ForInStatement:
      return parseForInStatement(genericNode as ts.ForInStatement, props)
    case SyntaxKind.MethodDeclaration:
      return parseMethodDeclaration(genericNode as ts.MethodDeclaration, props)
    case SyntaxKind.Parameter:
      return parseParameter(genericNode as ts.ParameterDeclaration, props)
    case SyntaxKind.ElementAccessExpression:
      return parseElementAccessExpression(
        genericNode as ts.ElementAccessExpression,
        props
      )
    case SyntaxKind.PropertyDeclaration:
      return parsePropertyDeclaration(
        genericNode as ts.PropertyDeclaration,
        props
      )
    case SyntaxKind.YieldExpression:
      return parseYieldExpression(genericNode as ts.YieldExpression, props)
    case SyntaxKind.ParenthesizedExpression:
      return parseParenthesizedExpression(
        genericNode as ts.ParenthesizedExpression,
        props
      )
    case SyntaxKind.Identifier:
      return parseIdentifier(genericNode as ts.Identifier, props)
    case SyntaxKind.ReturnStatement:
      return parseReturnStatement(genericNode as ts.ReturnStatement, props)
    case SyntaxKind.StringLiteral:
      return parseStringLiteral(genericNode as ts.StringLiteral, props)
    case SyntaxKind.TemplateExpression:
      return parseTemplateExpression(
        genericNode as ts.TemplateExpression,
        props
      )
    case SyntaxKind.NoSubstitutionTemplateLiteral:
      return parseNoSubstitutionTemplateLiteral(
        genericNode as ts.NoSubstitutionTemplateLiteral,
        props
      )
    case SyntaxKind.BreakStatement:
      return parseBreakStatement(genericNode as ts.BreakStatement, props)
    case SyntaxKind.ContinueStatement:
      return parseContinueStatement(genericNode as ts.ContinueStatement, props)
    case SyntaxKind.Block:
      return parseBlock(genericNode as ts.Block, props)
    case SyntaxKind.CallExpression:
      return parseCallExpression(genericNode as ts.CallExpression, props)
    case SyntaxKind.ConditionalExpression:
      return parseConditionalExpression(
        genericNode as ts.ConditionalExpression,
        props
      )
    case SyntaxKind.ExpressionStatement:
      return parseExpressionStatement(
        genericNode as ts.ExpressionStatement,
        props
      )
    case SyntaxKind.NonNullExpression:
      return parseNode((genericNode as ts.NonNullExpression).expression, props)
    case SyntaxKind.VariableStatement:
      return parseVariableStatement(genericNode as ts.VariableStatement, props)
    case SyntaxKind.VariableDeclaration:
      return parseVariableDeclaration(
        genericNode as ts.VariableDeclaration,
        props
      )
    case SyntaxKind.EnumDeclaration:
      return parseEnumDeclaration(genericNode as ts.EnumDeclaration, props)
    case SyntaxKind.VariableDeclarationList:
      return parseVariableDeclarationList(
        genericNode as ts.VariableDeclarationList,
        props
      )
    case SyntaxKind.SuperKeyword:
      return parseSuperKeyword(genericNode as ts.SuperExpression, props)
    case SyntaxKind.PropertyAccessExpression:
      return parsePropertyAccessExpression(
        genericNode as ts.PropertyAccessExpression,
        props
      )
    case SyntaxKind.ThisKeyword:
      return parseThisKeyword(genericNode as ts.ThisExpression, props)
    case SyntaxKind.Constructor:
      return parseConstructor(genericNode as ts.ConstructorDeclaration, props)
    case SyntaxKind.ClassExpression:
      return parseClassDeclaration(
        genericNode as ts.ClassDeclaration | ts.ClassExpression,
        props
      )
    case SyntaxKind.ClassDeclaration:
      return parseClassDeclaration(
        genericNode as ts.ClassDeclaration | ts.ClassExpression,
        props
      )
    case SyntaxKind.SetAccessor:
      return parseSetAccessor(genericNode as ts.SetAccessorDeclaration, props)
    case SyntaxKind.GetAccessor:
      return parseGetAccessor(genericNode as ts.GetAccessorDeclaration, props)
    case SyntaxKind.MinusEqualsToken:
      return { content: "-=" }

    // Only used in BinaryExpression, I think
    case SyntaxKind.QuestionQuestionToken:
      return { content: "??" }
    case SyntaxKind.PlusEqualsToken:
      return { content: "+=" }
    case SyntaxKind.AsteriskEqualsToken:
      return { content: "*=" }
    case SyntaxKind.SlashEqualsToken:
      return { content: "/=" }
    case SyntaxKind.PercentEqualsToken:
      return { content: "%=" }
    case SyntaxKind.ExclamationEqualsEqualsToken:
      return { content: "!=" }
    case SyntaxKind.ExclamationEqualsToken:
      return { content: "!=" }
    case SyntaxKind.GreaterThanEqualsToken:
      return { content: ">=" }
    case SyntaxKind.LessThanEqualsToken:
      return { content: "<=" }
    case SyntaxKind.EqualsEqualsToken:
      return { content: "==" }
    case SyntaxKind.AsteriskToken:
      return { content: "*" }
    case SyntaxKind.PercentToken:
      return { content: "%" }
    case SyntaxKind.PlusToken:
      return { content: "+" }
    case SyntaxKind.MinusToken:
      return { content: "-" }
    case SyntaxKind.ExclamationToken:
      return { content: "not" }
    case SyntaxKind.SlashToken:
      return { content: "/" }
    case SyntaxKind.AmpersandAmpersandToken:
      return { content: "and" }
    case SyntaxKind.BarBarToken:
      return { content: "or" }
    case SyntaxKind.EqualsEqualsEqualsToken:
      return { content: "==" }
    case SyntaxKind.LessThanToken:
      return { content: "<" }
    case SyntaxKind.EqualsToken:
      return { content: "=" }
    case SyntaxKind.CommaToken:
      return { content: "," }
    case SyntaxKind.GreaterThanToken:
      return { content: ">" }
    case SyntaxKind.FalseKeyword:
      return { content: "false" }
    case SyntaxKind.TrueKeyword:
      return { content: "true" }
    case SyntaxKind.InstanceOfKeyword:
      return { content: "is" }
    case SyntaxKind.InKeyword:
      return { content: "in" }
    case SyntaxKind.UndefinedKeyword:
      return { content: "null" }
    case SyntaxKind.NullKeyword:
      return { content: "null" }
    case SyntaxKind.AmpersandToken:
      return { content: "&" }
    case SyntaxKind.BarToken:
      return { content: "|" }
    case SyntaxKind.CaretToken:
      return { content: "^" }
    case SyntaxKind.TildeToken:
      return { content: "~" }

    default:
      console.error("Unknown token:", syntaxKindToString(genericNode.kind))
      addError({
        error: ErrorName.UnknownTsSyntax,
        location: genericNode,
        stack: new Error().stack ?? "",
        description: `
ts2gd does not current support this code:

${genericNode.getText()}

Try rewriting it, or opening an issue on the ts2gd GitHub repo.
        `,
      })

      return {
        content: "",
      }
  }
}
