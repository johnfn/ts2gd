import ts from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseSwitchStatement = (node: ts.SwitchStatement, props: ParseState): ParseNodeType => {
  const newProps = {
    ...props,
    mostRecentControlStructureIsSwitch: true,
  };

  return combine({
    parent: node,
    nodes: [node.expression, node.caseBlock],
    props: newProps,
    addIndent: true,
    content: (expr, block) => `match ${expr}:
  ${block}
` });
};

export const parseSwitchCaseBlock = (node: ts.CaseBlock, props: ParseState): ParseNodeType => {
  return combine({
    parent: node,
    nodes: node.clauses,
    props: props,
    content: (...clauses) => clauses.join('\n'),
  });
};

export const parseCaseClause = (node: ts.CaseClause, props: ParseState): ParseNodeType => {
  return combine({
    addIndent: true,
    parent: node,
    nodes: [node.expression, ...node.statements],
    props: props,
    content: (expr, ...statements) => `
${props.indent}${expr}:
  ${statements.join('  ')}`
  });
}

export const parseDefaultClause = (node: ts.DefaultClause, props: ParseState): ParseNodeType => {
  return combine({
    addIndent: true,
    parent: node,
    nodes: [...node.statements],
    props,
    content: (expr, ...statements) => `
${props.indent}_:
  ${statements.join('  ')}`
  });
}
