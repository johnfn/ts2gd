import ts from "typescript";
import { program } from "../main";
import { combine, ParseState } from "../parse_node";
import { getGodotType, getTypeHierarchy } from "../ts_utils";
import { ParseNodeType } from "../parse_node"

const isExported = (node: ts.PropertyDeclaration) => {
  for (const dec of node.decorators ?? []) {
    if (dec.expression.getText() === "exports") {
      return true;
    }
  }

  return false;
}

const isOnReady = (node: ts.PropertyDeclaration) => {
  if (node.initializer) {

    // I think there's some sort of race where we save .d.ts files too fast to 
    // then have the type checker re-analyze them, so the get_node() calls have a habit
    // of coming back as 'any' when we use the typechecker on them.

    if (node.initializer.getText().includes("get_node(")) {
      return true;
    } else {
      const initializerType = program.getTypeChecker().getTypeAtLocation(node.initializer);
      const hierarchy = getTypeHierarchy(initializerType).map(x => program.getTypeChecker().typeToString(x));

      return hierarchy.includes('Node2D') || hierarchy.includes('Node');
    }
  }

  return false;
}

export const parsePropertyDeclaration = (node: ts.PropertyDeclaration, props: ParseState): ParseNodeType => {
  const godotType = getGodotType(node, node.initializer, node.type);
  const exportText = isExported(node) ? `export(${godotType}) ` : '';
  const onReady = isOnReady(node)

  return combine(node, node.initializer, props, initializer =>
    `${exportText}${onReady ? 'onready ' : ''}var ${node.name.getText()}${godotType ? `: ${godotType}` : ''}${initializer && ` = ${initializer}`}`
  );
}