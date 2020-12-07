import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";

const countPrecedingNewlines = (x: string) => {
  let result = 0;

  for (const ch of [...x]) {
    if (ch.trim() !== "") {
      return result - 1;
    }

    if (ch === '\n') {
      result += 1;
    }
  }

  return 0;
}

export function parseBlock(node: ts.Block, props: ParseState) {
  let result = "";

  if (node.statements.length !== 0) {
    for (const statement of node.statements) {
      for (let i = 0; i < countPrecedingNewlines(statement.getFullText()); i++) {
        result += '\n';
      }

      result += parseNodeToString(statement, props);
    }
  } else {
    result = props.indent + "pass\n"
  }

  return result;
}