"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testIfPostInc2 = exports.testIfPostInc1 = exports.testIfPreInc2 = exports.testIfPreInc1 = exports.testElseIf = exports.testIf = exports.parseIfStatement = void 0;
const parse_node_1 = require("../parse_node");
const parseIfStatement = (node, props) => {
    props.scope.enterScope();
    let result = parse_node_1.combine({
        addIndent: true,
        parent: node,
        nodes: [node.expression, node.thenStatement, node.elseStatement],
        props,
        parsedObjs: (expression, thenStatement, elseStatement) => {
            const beforeLines = expression.extraLines?.filter((line) => line.type === "before") ?? [];
            const afterLines = expression.extraLines?.filter((line) => line.type === "after") ?? [];
            return `
${beforeLines.map((line) => line.line).join("\n")}
if ${expression.content}:
  ${afterLines.map((line) => line.line).join("\n")}
  ${thenStatement.content}${elseStatement.content
                ? `else:
  ${afterLines.map((line) => line.line).join("\n")}
  ${elseStatement.content}`
                : ""}`;
        },
    });
    result.extraLines = [];
    props.scope.leaveScope();
    return result;
};
exports.parseIfStatement = parseIfStatement;
exports.testIf = {
    ts: `
if (true) {
  print(1)
} else {
  print(0)
}
  `,
    expected: `
if true:
  print(1)
else:
  print(0)
  `,
};
exports.testElseIf = {
    ts: `
if (true) {
  print(1)
} else if ('maybe') {
  print(2)
} else {
  print(0)
}
  `,
    expected: `
if true:
  print(1)
else:
  if "maybe":
    print(2)
  else:
    print(0)
  `,
};
exports.testIfPreInc1 = {
    ts: `
if (++x) {
  print(1)
} else {
  print(0)
}
  `,
    expected: `
x += 1
if x:
  print(1)
else:
  print(0)
  `,
};
exports.testIfPreInc2 = {
    ts: `
if (x) {
  print(++x)
} else {
  print(++x)
}
  `,
    expected: `
if x:
  x += 1
  print(x)
else:
  x += 1
  print(x)
  `,
};
exports.testIfPostInc1 = {
    ts: `
if (x++) {
  print(1)
} else {
  print(0)
}
  `,
    expected: `
if x:
  x += 1
  print(1)
else:
  x += 1
  print(0)
  `,
};
exports.testIfPostInc2 = {
    ts: `
if (x) {
  print(x++)
} else {
  print(x++)
}
  `,
    expected: `
if x:
  print(x)
  x += 1
else:
  print(x)
  x += 1
  `,
};
//# sourceMappingURL=parse_if_statement.js.map