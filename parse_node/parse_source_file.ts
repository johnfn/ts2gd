import ts from "typescript";
import { parseNodeToString, ParseState } from "../parse_node";

export const parseSourceFile = (node: ts.SourceFile, props: ParseState) => {
  const { statements } = node;

  return statements.map(statement => parseNodeToString(statement, props)).join('\n');
}
