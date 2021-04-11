"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArrowFunction = exports.getCapturedScope = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
/**
 * Get all identifiers in a scope that were declared in an enclosing scope.
 *
 * e.g.
 *
 * function foo() {
 *   let a = 1;
 *   return a + b + 1;
 * }
 *
 * in foo(), `a` is not a free variable, but `b` is.
 */
const getFreeVariables = (node, typeChecker, root) => {
    if (!node) {
        return [];
    }
    if (node.kind === typescript_1.SyntaxKind.Identifier ||
        node.kind === typescript_1.SyntaxKind.PropertyAccessExpression) {
        if (node.kind === typescript_1.SyntaxKind.PropertyAccessExpression) {
            // In cases like "a.b.c", only return "a".
            const pae = node;
            node = pae.expression;
        }
        const symbol = typeChecker.getSymbolAtLocation(node);
        if (symbol) {
            const decl = symbol.declarations[0];
            if (decl.getSourceFile() !== root.getSourceFile()) {
                return [];
            }
            let currentParent = decl;
            let isFreeVariable = true;
            while (currentParent) {
                if (currentParent === root) {
                    isFreeVariable = false;
                    break;
                }
                currentParent = currentParent.parent;
            }
            if (isFreeVariable) {
                return [node];
            }
            else {
                return [];
            }
        }
        else {
            console.log(node.getText(), "no symbol");
        }
        return [];
    }
    return node
        .getChildren()
        .flatMap((child) => getFreeVariables(child, typeChecker, root));
};
const getCapturedScope = (node, checker) => {
    const freeVariables = getFreeVariables(node.body, checker, node);
    const uniqueFreeVariables = freeVariables.filter((item, index) => freeVariables.indexOf(item) === index);
    const capturedScopeObject = "{" +
        uniqueFreeVariables
            .map((freeVar) => `"${freeVar.getText()}": ${freeVar.getText()}`)
            .join(", ") +
        "}";
    const unwrapCapturedScope = uniqueFreeVariables
        .map((v) => `  var ${v.getText()} = captures.${v.getText()}\n`)
        .join("");
    return {
        capturedScopeObject,
        unwrapCapturedScope,
    };
};
exports.getCapturedScope = getCapturedScope;
const parseArrowFunction = (node, props) => {
    const name = props.scope.createUniqueName();
    const { unwrapCapturedScope } = exports.getCapturedScope(node, props.program.getTypeChecker());
    props.scope.enterScope();
    let parsed = parse_node_1.combine({
        parent: node,
        nodes: [node.body, ...node.parameters],
        props,
        addIndent: true,
        content: (body, ...args) => {
            if (node.body.kind === typescript_1.SyntaxKind.Block) {
                return `
func ${name}(${[...args, "captures"].join(", ")}):
${unwrapCapturedScope}
  ${body}
        `;
            }
            else {
                // Single line arrow function, with implicit return.
                return `
func ${name}(${[...args, "captures"].join(", ")}):
${unwrapCapturedScope}
  return ${body}
        `;
            }
        },
    });
    props.scope.leaveScope();
    return {
        content: `funcref(self, "${name}")`,
        hoistedArrowFunctions: [
            parsed.content,
            ...(parsed.hoistedArrowFunctions ?? []),
        ],
    };
};
exports.parseArrowFunction = parseArrowFunction;
//# sourceMappingURL=parse_arrow_function.js.map