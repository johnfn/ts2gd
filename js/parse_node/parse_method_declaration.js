"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDefaultValuesSelfReference = exports.testDefaultValues = exports.testDefaultValue = exports.testProcessDoesntGetArgsAdded = exports.testProcessGetsArgsAdded = exports.parseMethodDeclaration = void 0;
const parse_node_1 = require("../parse_node");
const specialMethods = [
    { name: "_process", args: "_delta: float" },
    { name: "_physics_process", args: "_delta: float" },
    { name: "_unhandled_input", args: "_event: InputEvent" },
    { name: "_unhandled_key_input", args: "_event: InputEventKey" },
];
const parseMethodDeclaration = (node, props) => {
    const funcName = node.name.getText();
    props.scope.enterScope();
    let isRemote = false;
    let isRemoteSync = false;
    for (const dec of node.decorators ?? []) {
        if (dec.expression.getText() === "remote") {
            isRemote = true;
        }
        if (dec.expression.getText() === "remotesync") {
            isRemoteSync = true;
        }
    }
    // Need to grab extra lines for default parameters
    const compiledParameters = parse_node_1.combine({
        parent: node,
        nodes: node.parameters,
        props,
        parsedStrings: (...params) => params.join(", "),
    });
    let result = parse_node_1.combine({
        parent: node,
        nodes: [node.body],
        props,
        addIndent: true,
        parsedStrings: (body) => {
            let joinedParams = compiledParameters.content;
            const specialMethod = specialMethods.find((method) => method.name === funcName);
            if (specialMethod && joinedParams.trim() === "") {
                joinedParams = specialMethod.args;
            }
            let bodyLines = [
                ...(compiledParameters.extraLines?.map((param) => param.line) ?? []),
                ...(body.trim() === "" ? [] : [body]),
            ];
            if (bodyLines.length === 0) {
                bodyLines = ["pass"];
            }
            body = bodyLines.map((line) => "  " + line + "\n").join("");
            return `
${isRemote ? "remote " : ""}${isRemoteSync ? "remotesync " : ""}func ${funcName}(${joinedParams}):
${body.trim() === "" ? "pass" : body}
`;
        },
    });
    props.scope.leaveScope();
    return result;
};
exports.parseMethodDeclaration = parseMethodDeclaration;
exports.testProcessGetsArgsAdded = {
    ts: `
class Foo extends Node2D {
  _process() {}
}
  `,
    expected: `
extends Node2D
class_name Foo
func _process(_delta: float):
  pass
  `,
};
exports.testProcessDoesntGetArgsAdded = {
    ts: `
class Foo extends Node2D {
  _process(d: float) {}
}
  `,
    expected: `
extends Node2D
class_name Foo
func _process(_d: float):
  pass
  `,
};
exports.testDefaultValue = {
    ts: `
class Foo extends Node2D {
  testDefault(a = 1) { }
}
  `,
    expected: `
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]"):
  a = (1 if (typeof(a) == TYPE_STRING and a == "[no value passed in]") else a)
`,
};
exports.testDefaultValues = {
    ts: `
class Foo extends Node2D {
  testDefault(a = 1, b = 2) { 
    print("OK")
    print("OK")
  }
}
  `,
    expected: `
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]", b = "[no value passed in]"):
  a = (1 if (typeof(a) == TYPE_STRING and a == "[no value passed in]") else a)
  b = (2 if (typeof(b) == TYPE_STRING and b == "[no value passed in]") else b)
  print("OK")
  print("OK")
`,
};
exports.testDefaultValuesSelfReference = {
    ts: `
class Foo extends Node2D {
  testDefault(a = 1, b: int = a) { 
  }
}
  `,
    expected: `
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]", b = "[no value passed in]"):
  a = (1 if (typeof(a) == TYPE_STRING and a == "[no value passed in]") else a)
  b = (a if (typeof(b) == TYPE_STRING and b == "[no value passed in]") else b)
`,
};
//# sourceMappingURL=parse_method_declaration.js.map