import ts, { SyntaxKind } from "typescript";
import { ParseState, combine } from "../parse_node";

import { ParseNodeType } from "../parse_node"
import { Test } from "../test";

export const parseObjectLiteralExpression = (node: ts.ObjectLiteralExpression, props: ParseState): ParseNodeType => {
  if (node.properties.length === 0) {
    return combine({
      parent: node,
      nodes: [],
      props, content: () => '{}',
    });
  }

  const isMultiline = node.getText().includes('\n');

  const keys = node.properties.map(prop => {
    if (prop.kind === SyntaxKind.PropertyAssignment) {
      return prop.name.getText();
    } else if (prop.kind === SyntaxKind.ShorthandPropertyAssignment) {
      return prop.name.getText();
    } else {
      throw new Error("Unknown property in object.");
    }
  });

  const values = node.properties.map(prop => {
    if (prop.kind === SyntaxKind.PropertyAssignment) {
      return prop.initializer;
    } else if (prop.kind === SyntaxKind.ShorthandPropertyAssignment) {
      return prop.name;
    } else {
      throw new Error("Unknown property in object.");
    }
  });

  return combine({
    parent: node,
    nodes: values,
    props,
    content: (...values) => {
      const valueAndNames = values.map((_, i) => [keys[i], values[i]]);
      if (isMultiline) {
        return `
{
${valueAndNames.map(([k, v]) => `  "${k}": ${v},\n`).join('')}
}      
      `
      } else {
        return `
{ ${valueAndNames.map(([k, v]) => `"${k}": ${v}`).join(', ')} }      
      `

      }
    }
  });
}

export const testObjectLiteral: Test = {
  ts: `
let x = {}
  `,
  expected: `
var _x = {}
  `,
};

export const testObjectLiteral2: Test = {
  ts: `
let x = {a: 1}
  `,
  expected: `
var _x = { "a": 1 }
  `,
};

export const testObjectLiteralShorthand: Test = {
  ts: `
let x = {a}
  `,
  expected: `
var _x = { "a": a }
  `,
};

export const testObjectLiteralShorthand2: Test = {
  ts: `
let x = { a: 1 }
  `,
  expected: `
var _x = { "a": 1 }
  `,
};

export const testObjectLiteralMultiline: Test = {
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

export const testObjectLiteralMultiline2: Test = {
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