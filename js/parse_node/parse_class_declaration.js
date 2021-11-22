"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseClassDeclaration = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const ts_utils_1 = require("../ts_utils");
const parse_property_declaration_1 = require("./parse_property_declaration");
const getSettersAndGetters = (members, props) => {
    const setOrGetters = members.filter((member) => member.kind === typescript_1.SyntaxKind.SetAccessor ||
        member.kind === typescript_1.SyntaxKind.GetAccessor);
    const pairings = [];
    for (const setGet of setOrGetters) {
        let exportText = null;
        if (parse_property_declaration_1.isDecoratedAsExports(setGet)) {
            const typeGodotName = ts_utils_1.getGodotType(setGet, props.program.getTypeChecker().getTypeAtLocation(setGet), props, true, // isExported
            undefined, setGet.type);
            exportText = `export(${typeGodotName.result ?? "null"}) `;
        }
        if (setGet.kind === typescript_1.SyntaxKind.SetAccessor) {
            const setter = setGet;
            const name = setter.name.getText();
            const existingObj = pairings.find((pair) => pair.name === name);
            if (existingObj) {
                existingObj.setter = setter;
                existingObj.exportText ??= exportText;
            }
            else {
                pairings.push({ setter, name, exportText });
            }
        }
        if (setGet.kind === typescript_1.SyntaxKind.GetAccessor) {
            const getter = setGet;
            const name = getter.name.getText();
            const existingObj = pairings.find((pair) => pair.name === name);
            if (existingObj) {
                existingObj.getter = getter;
                existingObj.exportText ??= exportText;
            }
            else {
                pairings.push({ getter, name, exportText });
            }
        }
    }
    return pairings;
};
const parseClassDeclaration = (node, props) => {
    const modifiers = node.modifiers?.map((x) => x.getText());
    // skip class declarations; there's no code to generate here
    if (modifiers?.includes("declare")) {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            parsedStrings: () => "",
        });
    }
    // Preprocess set/get to make setget declarations
    const settersAndGetters = getSettersAndGetters(node.members, props);
    const parsedSetterGetters = settersAndGetters
        .map(({ setter, getter, name, exportText }) => {
        return `${exportText ?? ""}var ${name} setget ${setter ? name + "_set" : ""}, ${getter ? name + "_get" : ""}`;
    })
        .join("\n");
    // NOTE: Since extends and class_name *must* come first in the file,
    // they are added ahead of time by parse_source_file.ts.
    return parse_node_1.combine({
        parent: node,
        nodes: node.members,
        props,
        parsedStrings: (...members) => {
            return `
${parsedSetterGetters}
${members.join("")}
`;
        },
    });
};
exports.parseClassDeclaration = parseClassDeclaration;
// export const testConditionalExpression: Test = {
//   ts: `
// export class Foo {
//   x = 1
// }
// class Bar {
//   x = 2
// }
//   `,
//   expected: `var _x = 1 if true else 2`,
// }
//# sourceMappingURL=parse_class_declaration.js.map