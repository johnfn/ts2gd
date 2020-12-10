import ts, { SyntaxKind } from "typescript";
import { ParseState, parseNodeToString } from "../parse_node";

export function parseSwitchStatement(node: ts.SwitchStatement, props: ParseState): string {
  const newProps = {
    ...props,
    mostRecentControlStructureIsSwitch: true,
    indent: props.indent + '    ',
  };
  const expression = parseNodeToString(node.expression, props);

  return `${props.indent}match ${expression}:
${node.caseBlock.clauses.map(clause => {
    if (clause.kind === SyntaxKind.CaseClause) {
      return `  ${props.indent}${parseNodeToString(clause.expression, props)}:
${clause.statements.map(statement => parseNodeToString(statement, newProps)).join('\n')}\n`;
    }
    // TODO: Handle default!
  }).join('')}`;
}
