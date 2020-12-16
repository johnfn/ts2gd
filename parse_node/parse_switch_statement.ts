import ts from "typescript";
import { ParseState, combine, addIndent } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseSwitchStatement = (node: ts.SwitchStatement, props: ParseState): ParseNodeType => {
  const newProps = {
    ...props,
    mostRecentControlStructureIsSwitch: true,
  };

  return combine(node, [node.expression, node.caseBlock], newProps, (expr, block) =>
    `match ${expr}:
${block}`
  );
};

export const parseSwitchCaseBlock = (node: ts.CaseBlock, props: ParseState): ParseNodeType => {
  return combine(node, node.clauses, addIndent(props), (...clauses) => clauses.join('\n'));
};

export const parseCaseClause = (node: ts.CaseClause, props: ParseState): ParseNodeType => {
  return combine(node, [node.expression, ...node.statements], addIndent(props), (expr, ...statements) =>
    `${props.indent}${expr}:
${statements.join('')}`);
}

export const parseDefaultClause = (node: ts.DefaultClause, props: ParseState): ParseNodeType => {
  return combine(node, [...node.statements], addIndent(props), (expr, ...statements) =>
    `${props.indent}_:
${statements.join('')}`);
}
