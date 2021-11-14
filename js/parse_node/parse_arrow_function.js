"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArrowFunction = exports.getCapturedScope = void 0;
const typescript_1 = __importStar(require("typescript"));
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
const getFreeVariables = (node, root, props) => {
    if (!node) {
        return [];
    }
    if (node.kind === typescript_1.SyntaxKind.Identifier ||
        node.kind === typescript_1.SyntaxKind.PropertyAccessExpression) {
        // In cases like "a.b.c", only return "a".
        while (node.kind === typescript_1.SyntaxKind.PropertyAccessExpression) {
            const pae = node;
            node = pae.expression;
        }
        const symbol = props.program.getTypeChecker().getSymbolAtLocation(node);
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
            if (node.kind === typescript_1.SyntaxKind.Identifier) {
                // Expressions like this.get_node("HBoxContainer/BuildButton").visible give
                // "no symbol" logs. I don't understand why
                console.log(props.getNodeText(node), "no symbol");
            }
        }
        return [];
    }
    let result = [];
    typescript_1.default.forEachChild(node, (ch) => {
        result.push(getFreeVariables(ch, root, props));
    });
    return result.flat();
};
const getCapturedScope = (node, props) => {
    const { getNodeText } = props;
    const freeVariables = getFreeVariables(node.body, node, props);
    const uniqueFreeVariables = freeVariables.filter((item, index) => freeVariables.findIndex((obj) => getNodeText(obj) === getNodeText(item)) === index);
    // We don't want to capture `this` as part of our scope. There's no reason to
    // do it: lambdas are only ever executed in the current class, so `this` will
    // never be different. Plus, we'd have to rewrite all `this` access in the
    // function to be `_self`, which would be confusing, and look stupid, and
    // basically be a completely pointless workaround.
    const freeVariablesWithoutThis = uniqueFreeVariables.filter((v) => v.getText() !== "this");
    const getNodeName = (node) => {
        const text = node.getText();
        return text;
    };
    const capturedScopeObject = "{" +
        freeVariablesWithoutThis
            .map((freeVar) => `"${getNodeName(freeVar)}": ${getNodeName(freeVar)}`)
            .join(", ") +
        "}";
    const unwrapCapturedScope = freeVariablesWithoutThis
        .map((v) => `  var ${getNodeName(v)} = captures.${getNodeName(v)}\n`)
        .join("");
    return {
        capturedScopeObject,
        unwrapCapturedScope,
    };
};
exports.getCapturedScope = getCapturedScope;
// We emit all arrow functions as a tuple of [function object, closed-over
// variables]. (Previously, when we passed an arrow function to another
// function, we were just passing in captured variables as a second argument,
// but this gets messy and complicated when we pass function arguments through
// multiple functions.)
const parseArrowFunction = (node, props) => {
    const name = props.scope.createUniqueName();
    const { unwrapCapturedScope } = exports.getCapturedScope(node, props);
    props.scope.enterScope();
    let parsed = parse_node_1.combine({
        parent: node,
        nodes: [node.body, ...node.parameters],
        props,
        addIndent: true,
        parsedStrings: (body, ...args) => {
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
    const decls = props.program.getTypeChecker().getTypeAtLocation(node)
        .symbol?.declarations;
    const { capturedScopeObject } = exports.getCapturedScope(decls[0], props);
    // NOTE: parse_call_expression expects all arrow functions to be declared on self.
    return {
        content: `[funcref(self, "${name}"), ${capturedScopeObject}]`,
        hoistedArrowFunctions: [
            {
                name,
                node: node,
                content: parsed.content,
            },
            ...(parsed.hoistedArrowFunctions ?? []),
        ],
    };
};
exports.parseArrowFunction = parseArrowFunction;
//# sourceMappingURL=parse_arrow_function.js.map