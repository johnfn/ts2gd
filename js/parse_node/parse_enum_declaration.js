"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEnumDeclaration2 = exports.testEnumDeclaration = exports.parseEnumDeclaration = void 0;
const parse_node_1 = require("../parse_node");
const parse_import_declaration_1 = require("./parse_import_declaration");
const parseEnumDeclaration = (node, props) => {
    const enumText = parse_node_1.combine({
        parent: node,
        nodes: node.members.map((member) => member.initializer ?? undefined),
        props,
        content: (...initializers) => {
            let result = `const ${node.name.text} = {\n`;
            let initializedValue = 0;
            for (let i = 0; i < initializers.length; i++) {
                result += `  "${node.members[i].name.getText()}": ${initializers[i] ? initializers[i] : initializedValue},\n`;
                if (initializers[i] && !isNaN(Number(initializers[i]))) {
                    initializedValue = Number(initializers[i]) + 1;
                }
                else {
                    initializedValue++;
                }
            }
            result += "}";
            return result;
        },
    });
    const enumType = props.program.getTypeChecker().getTypeAtLocation(node);
    const { resPath, enumName } = parse_import_declaration_1.getImportResPathForEnum(enumType, props);
    const importString = `const ${enumName} = preload("${resPath}").${enumName}`;
    return {
        content: "",
        hoistedEnumImports: [importString],
        enums: [
            {
                content: enumText.content,
                name: node.name.text,
            },
        ],
    };
};
exports.parseEnumDeclaration = parseEnumDeclaration;
exports.testEnumDeclaration = {
    ts: `
export enum Test { A, B }

print(Test.A)
  `,
    expected: `
const Test = preload("_Test.gd").Test

print(Test.A)
  `,
    expectedFiles: [
        {
            filename: "Test.gd",
            content: `
const Test = {
  "A": 0,
  "B": 1,
}      
`,
        },
    ],
};
exports.testEnumDeclaration2 = {
    ts: `
export enum Test { 
  A = "A", 
  B = "B"
}

print(Test.A)
  `,
    expected: `
const Test = preload("_Test.gd").Test

print(Test.A)
  `,
    expectedFiles: [
        {
            filename: "Test.gd",
            content: `
const Test = {
  "A": "A",
  "B": "B",
}      
`,
        },
    ],
};
//# sourceMappingURL=parse_enum_declaration.js.map