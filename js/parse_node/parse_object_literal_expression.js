"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testObjectLiteralMultiline2 = exports.testObjectLiteralMultiline = exports.testObjectLiteralShorthand2 = exports.testObjectLiteralShorthand = exports.testObjectLiteral2 = exports.testObjectLiteral = exports.parseObjectLiteralExpression = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const parseObjectLiteralExpression = (node, props) => {
    if (node.properties.length === 0) {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            parsedStrings: () => "{}",
        });
    }
    const isMultiline = node.getText().includes("\n");
    const unprocessedKeys = node.properties.map((prop) => {
        if (prop.kind === typescript_1.SyntaxKind.PropertyAssignment) {
            if (prop.name.kind === typescript_1.SyntaxKind.ComputedPropertyName) {
                const computedProp = prop.name;
                return computedProp.expression;
            }
            return prop.name;
        }
        else if (prop.kind === typescript_1.SyntaxKind.ShorthandPropertyAssignment) {
            return prop.name;
        }
        else {
            throw new Error("Unknown property in object.");
        }
    });
    const unprocessedValues = node.properties.map((prop) => {
        if (prop.kind === typescript_1.SyntaxKind.PropertyAssignment) {
            return prop.initializer;
        }
        else if (prop.kind === typescript_1.SyntaxKind.ShorthandPropertyAssignment) {
            return prop.name;
        }
        else {
            throw new Error("Unknown property in object.");
        }
    });
    return parse_node_1.combine({
        parent: node,
        nodes: [...unprocessedKeys, ...unprocessedValues],
        props,
        parsedStrings: (...keysAndValues) => {
            const keys = keysAndValues.slice(0, keysAndValues.length / 2);
            const values = keysAndValues.slice(keysAndValues.length / 2);
            let pairs = [];
            for (let i = 0; i < values.length; i++) {
                if (unprocessedKeys[i].kind === typescript_1.SyntaxKind.Identifier) {
                    pairs.push(['"' + keys[i] + '"', values[i]]);
                    continue;
                }
                // We need to quote identifiers, even though if we compiled an identifier normally it wouldn't be quoted.
                pairs.push([keys[i], values[i]]);
            }
            if (isMultiline) {
                return `
{
${pairs.map(([k, v]) => `  ${k}: ${v},\n`).join("")}
}      
      `;
            }
            else {
                return `
{ ${pairs.map(([k, v]) => `${k}: ${v}`).join(", ")} }      
      `;
            }
        },
    });
};
exports.parseObjectLiteralExpression = parseObjectLiteralExpression;
exports.testObjectLiteral = {
    ts: `
let x = {}
  `,
    expected: `
var _x = {}
  `,
};
exports.testObjectLiteral2 = {
    ts: `
let x = {a: 1}
  `,
    expected: `
var _x = { "a": 1 }
  `,
};
exports.testObjectLiteralShorthand = {
    ts: `
let x = {a}
  `,
    expected: `
var _x = { "a": a }
  `,
};
exports.testObjectLiteralShorthand2 = {
    ts: `
let x = { a: 1 }
  `,
    expected: `
var _x = { "a": 1 }
  `,
};
exports.testObjectLiteralMultiline = {
    ts: `
let x = {
  a: 1
}
  `,
    expected: `
var _x = { 
  "a": 1,
}
  `,
};
exports.testObjectLiteralMultiline2 = {
    ts: `
let x = {
  a: 1,
  b: 1,
}
  `,
    expected: `
var _x = { 
  "a": 1,
  "b": 1,
}
  `,
};
//# sourceMappingURL=parse_object_literal_expression.js.map