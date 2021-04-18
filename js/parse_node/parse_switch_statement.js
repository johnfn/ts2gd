"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDefaultClause = exports.parseCaseClause = exports.parseSwitchCaseBlock = exports.parseSwitchStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseSwitchStatement = (node, props) => {
    const newProps = {
        ...props,
        mostRecentControlStructureIsSwitch: true,
    };
    return parse_node_1.combine({
        parent: node,
        nodes: [node.expression, node.caseBlock],
        props: newProps,
        addIndent: true,
        parsedStrings: (expr, block) => `match ${expr}:
  ${block}
`,
    });
};
exports.parseSwitchStatement = parseSwitchStatement;
const parseSwitchCaseBlock = (node, props) => {
    return parse_node_1.combine({
        parent: node,
        nodes: node.clauses,
        props: props,
        parsedStrings: (...clauses) => clauses.join("\n"),
    });
};
exports.parseSwitchCaseBlock = parseSwitchCaseBlock;
const parseCaseClause = (node, props) => {
    return parse_node_1.combine({
        addIndent: true,
        parent: node,
        nodes: [node.expression, ...node.statements],
        props: props,
        parsedStrings: (expr, ...statements) => `
${props.indent}${expr}:
  ${statements.join("  ")}`,
    });
};
exports.parseCaseClause = parseCaseClause;
const parseDefaultClause = (node, props) => {
    return parse_node_1.combine({
        addIndent: true,
        parent: node,
        nodes: [...node.statements],
        props,
        parsedStrings: (expr, ...statements) => `
${props.indent}_:
  ${statements.join("  ")}`,
    });
};
exports.parseDefaultClause = parseDefaultClause;
//# sourceMappingURL=parse_switch_statement.js.map