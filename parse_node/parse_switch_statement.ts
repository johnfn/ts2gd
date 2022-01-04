import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"

export const parseSwitchStatement = (
  node: ts.SwitchStatement,
  props: ParseState
): ParseNodeType => {
  const newProps = {
    ...props,
    mostRecentControlStructureIsSwitch: true,
  }

  return combine({
    parent: node,
    nodes: [node.expression, node.caseBlock],
    props: newProps,
    addIndent: true,
    parsedStrings: (expr, block) => `match ${expr}:
  ${block}
`,
  })
}

export const parseSwitchCaseBlock = (
  node: ts.CaseBlock,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.clauses,
    props: props,
    parsedStrings: (...clauses) => clauses.join("\n"),
  })
}

export const parseCaseClause = (
  node: ts.CaseClause,
  props: ParseState
): ParseNodeType => {
  return combine({
    addIndent: true,
    parent: node,
    nodes: [node.expression, ...node.statements],
    props: props,
    parsedStrings: (expr, ...statements) => `
${props.indent}${expr}:
  ${statements.join("  ")}`,
  })
}

export const parseDefaultClause = (
  node: ts.DefaultClause,
  props: ParseState
): ParseNodeType => {
  return combine({
    addIndent: true,
    parent: node,
    nodes: [...node.statements],
    props,
    parsedStrings: (expr, ...statements) => `
${props.indent}_:
  ${statements.join("  ")}`,
  })
}
