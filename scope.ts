import ts, { SyntaxKind } from "typescript"

export class Scope {
  namesInScope: [ts.BindingName | ts.ParameterDeclaration, string][][] = [[]]
  program: ts.Program

  constructor(program: ts.Program) {
    this.program = program
  }

  enterScope() {
    this.namesInScope.push([])
  }

  leaveScope() {
    this.namesInScope.pop()
  }

  getName(node: ts.BindingName): string | null {
    let ourSymbol = this.program.getTypeChecker().getSymbolAtLocation(node)

    for (const scope of this.namesInScope.slice().reverse()) {
      for (const [otherNode, name] of scope) {
        const theirSymbol = this.program
          .getTypeChecker()
          .getSymbolAtLocation(otherNode)

        if (ourSymbol === theirSymbol) {
          return name
        }
      }
    }

    return null
  }

  addName(node: ts.BindingName): void {
    let declaredVariableName = ""

    if (node.kind === SyntaxKind.Identifier) {
      declaredVariableName = (node as ts.Identifier).text
    } else if (node.kind === SyntaxKind.ObjectBindingPattern) {
      throw new Error(" Havent handled destructuring yet")
    } else if (node.kind === SyntaxKind.ArrayBindingPattern) {
      throw new Error(" Havent handled destructuring yet")
    }

    const matchingNames = this.namesInScope.flat()
    let newName = declaredVariableName
    let increment = 0

    while (matchingNames.filter((x) => x[1] === newName).length > 0) {
      newName = declaredVariableName + String(++increment)
    }

    this.namesInScope[this.namesInScope.length - 1].push([node, newName])
  }
}
