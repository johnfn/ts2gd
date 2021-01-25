"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
const typescript_1 = require("typescript");
class Scope {
    constructor(program) {
        this.namesInScope = [[]];
        this.program = program;
    }
    enterScope() {
        this.namesInScope.push([]);
    }
    leaveScope() {
        this.namesInScope.pop();
    }
    getName(node) {
        let ourSymbol = this.program.getTypeChecker().getSymbolAtLocation(node);
        for (const scope of this.namesInScope.slice().reverse()) {
            for (const [otherNode, name] of scope) {
                if (!otherNode) {
                    continue;
                }
                const theirSymbol = this.program
                    .getTypeChecker()
                    .getSymbolAtLocation(otherNode);
                if (ourSymbol === theirSymbol) {
                    return name;
                }
            }
        }
        return null;
    }
    addName(node) {
        let declaredVariableName = "";
        if (node.kind === typescript_1.SyntaxKind.Identifier) {
            declaredVariableName = node.text;
        }
        else if (node.kind === typescript_1.SyntaxKind.ObjectBindingPattern) {
            throw new Error(" Havent handled destructuring yet");
        }
        else if (node.kind === typescript_1.SyntaxKind.ArrayBindingPattern) {
            throw new Error(" Havent handled destructuring yet");
        }
        const matchingNames = this.namesInScope.flat();
        let newName = declaredVariableName;
        let increment = 0;
        while (matchingNames.filter((x) => x[1] === newName).length > 0) {
            newName = declaredVariableName + String(++increment);
        }
        this.namesInScope[this.namesInScope.length - 1].push([node, newName]);
    }
    createName() {
        let declaredVariableName = "__gen";
        const matchingNames = this.namesInScope.flat();
        let newName = declaredVariableName;
        let increment = 0;
        while (matchingNames.filter((x) => x[1] === newName).length > 0) {
            newName = declaredVariableName + String(++increment);
        }
        this.namesInScope[this.namesInScope.length - 1].push([undefined, newName]);
        return newName;
    }
}
exports.Scope = Scope;
//# sourceMappingURL=scope.js.map