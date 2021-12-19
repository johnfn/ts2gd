import ts from "typescript"
import { ParseState, combine } from "../parse_node"

import { ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseConstructor = (
  node: ts.ConstructorDeclaration,
  props: ParseState
): ParseNodeType => {
  const modifiers = (node.parent.modifiers ?? []).map((v) => v.getText())

  const constructorArgs = combine({
    parent: node,
    nodes: node.parameters,
    props,
    addIndent: false,
    parsedStrings: (...args: string[]) => {
      return args.join(", ")
    },
  })

  if (
    ts.isClassDeclaration(node.parent) &&
    !modifiers.includes("declare") &&
    !modifiers.includes("default")
  ) {
    // Handle inner class constructor

    if (node.body) {
      // Find super call
      const superCallStatement = node.body.statements.find(
        (stmt) =>
          ts.isExpressionStatement(stmt) &&
          ts.isCallExpression(stmt.expression) &&
          stmt.expression.expression.kind === ts.SyntaxKind.SuperKeyword
      )

      if (superCallStatement) {
        const superCall = (superCallStatement as ts.ExpressionStatement)
          .expression as ts.CallExpression

        const superCallArgs = combine({
          parent: superCall,
          nodes: superCall.arguments,
          props,
          addIndent: false,
          parsedStrings: (...args: string[]) => {
            return args.join(", ")
          },
        })

        return combine({
          parent: node,
          nodes: node.body,
          props,
          addIndent: true,
          parsedStrings: (body) => `
func _init(${constructorArgs.content}).(${superCallArgs.content}): 
  ${body.trim().length > 0 ? body : "pass"}
        `,
        })
      }

      // The trim() is for a constructor with only one element: a super() call
      return combine({
        parent: node,
        nodes: node.body,
        props,
        addIndent: true,
        parsedStrings: (body) => `
func _init(${constructorArgs.content}): 
  ${body.trim().length > 0 ? body : "pass"}
  `,
      })
    } else {
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => `func _init():\n  pass`,
      })
    }
  }

  if (node.body) {
    // The trim() is for a constructor with only one element: a super() call

    return combine({
      parent: node,
      nodes: node.body,
      props,
      addIndent: true,
      parsedStrings: (body) => `
func _ready(): 
  ${body.trim().length > 0 ? body : "pass"}
`,
    })
  } else {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => `func _ready():\n  pass`,
    })
  }
}

export const testConstructorNoBody: Test = {
  ts: `
export default class Test {
  constructor();
}
    `,
  expected: `
class_name Test

func _ready():
  pass
  `,
}

export const testConstructorEmptyBody: Test = {
  ts: `
export default class Test {
  constructor() {

  }
}
    `,
  expected: `
class_name Test

func _ready():
  pass
  `,
}

export const testConstructor: Test = {
  ts: `
export default class Test {
  constructor() {
    print("Hello");
  }
}
    `,
  expected: `
class_name Test

func _ready():
  print("Hello")
  `,
}

export const testInnerClassConstructorEmptyBody: Test = {
  ts: `
export class Test {
  constructor() {

  }
}
    `,
  expected: `
class Test:
  func _init():
    pass
  `,
}

export const testExtendedInnerClassConstructorNoBody: Test = {
  ts: `
export class Test extends Node2D {
  constructor();
}
    `,
  expected: `
class Test extends Node2D:
  func _init():
    pass
  `,
}

export const testExtendedInnerClassConstructor: Test = {
  ts: `
export class Test extends Node2D {
  constructor() {
    super();
    print("Hello");
  }
}
    `,
  expected: `
class Test extends Node2D:
  func _init().():
    print("Hello")
  `,
}

export const testExtendedInnerClassConstructorWithArguments: Test = {
  ts: `
class Base extends Node2D {
  constructor(name: string) {
    super();
    print(name);
  }
}

export class Test extends Base {
  constructor() {
    super("TestName");
  }
}
    `,
  expected: `
class Base extends Node2D:
  func _init(name: String).():
    print(name)
class Test extends Base:
  func _init().("TestName"):
    pass
  `,
}
