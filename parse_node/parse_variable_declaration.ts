import ts, { SyntaxKind } from "typescript";
import { ParseState, combine } from "../parse_node";
import { ParseNodeType } from "../parse_node"
import { Test } from "../test";
import { getPreciseInitializerType } from "../ts_utils";

export const parseVariableDeclaration = (node: ts.VariableDeclaration, props: ParseState): ParseNodeType => {
  const type = getPreciseInitializerType(node.initializer);
  const usages = props.usages.get(node.name as ts.Identifier);
  const unused = (usages?.uses.length === 0) ? '_' : '';
  const typeString = type ? `: ${type}` : '';

  const decl = props.program.getTypeChecker().getTypeAtLocation(node).getSymbol()?.declarations[0];
  const isLikelyAutoload = (
    decl?.kind === SyntaxKind.ClassDeclaration &&
    (decl.getSourceFile() === node.getSourceFile()) &&
    node.parent.parent.parent.kind === SyntaxKind.SourceFile
  );

  if (isLikelyAutoload) {
    return combine({
      parent: node,
      nodes: [node.name, node.initializer],
      props,
      content: (nodeName, init) => ``,
    });
  } else {
    return combine({
      parent: node,
      nodes: [node.name, node.initializer],
      props,
      content: (nodeName, init) => `var ${unused}${nodeName}${typeString}${init ? " = " + init : ""}`
    });
  }
}

export const testNormalVariableDeclaration: Test = {
  ts: `
let x = 1  
let y = 'a'
  `,
  expected: `
var _x: int = 1  
var _y = "a"
  `
};

export const testAutoloadVariableDeclaration: Test = {
  ts: `
export class Blah {

}

const x: Blah = new Blah();
  `,
  expected: `
class_name Blah
  `
};

export const testAutoloadVariableDeclaration2: Test = {
  ts: `
export class Blah {
  test() {
    const blah: Blah = new Blah();
  }
}

const x: Blah = new Blah();
  `,
  expected: `
class_name Blah

func test():
  var _blah = Blah()
  `
};