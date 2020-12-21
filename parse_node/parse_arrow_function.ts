import ts, { SyntaxKind } from "typescript";
import { combine, ParseState } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseArrowFunction = (node: ts.ArrowFunction, props: ParseState): ParseNodeType => {
  const name = props.genUniqueName();

  let parsed: ParseNodeType;

  parsed = combine({
    parent: node,
    nodes: [node.body, ...node.parameters],
    props,
    addIndent: true,
    content: (body, ...args) => {
      if (node.body.kind === SyntaxKind.Block) {
        return `
func ${name}(${args.join(', ')}):
  ${body}
        `;
      } else {
        // Single line arrow function, with implicit return.

        return `
func ${name}(${args.join(', ')}):
  return ${body}
        `;

      }
    },
  })

  return {
    content: `funcref(self, "${name}")`,
    hoistedArrowFunctions: [
      parsed.content,
      ...(parsed.hoistedArrowFunctions ?? [])
    ],
  }
}