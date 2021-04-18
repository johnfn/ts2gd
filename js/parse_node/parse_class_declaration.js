"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseClassDeclaration = void 0;
const typescript_1 = require("typescript");
const parse_node_1 = require("../parse_node");
const getSettersAndGetters = (members) => {
    const setOrGetters = members.filter((member) => member.kind === typescript_1.SyntaxKind.SetAccessor ||
        member.kind === typescript_1.SyntaxKind.GetAccessor);
    const pairings = [];
    for (const setGet of setOrGetters) {
        if (setGet.kind === typescript_1.SyntaxKind.SetAccessor) {
            const setter = setGet;
            const name = setter.name.getText();
            const existingObj = pairings.find((pair) => pair.name === name);
            if (existingObj) {
                existingObj.setter = setter;
            }
            else {
                pairings.push({ setter, name });
            }
        }
        if (setGet.kind === typescript_1.SyntaxKind.GetAccessor) {
            const getter = setGet;
            const name = getter.name.getText();
            const existingObj = pairings.find((pair) => pair.name === name);
            if (existingObj) {
                existingObj.getter = getter;
            }
            else {
                pairings.push({ getter, name });
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
    const settersAndGetters = getSettersAndGetters(node.members);
    const parsedSetterGetters = settersAndGetters
        .map(({ setter, getter, name }) => {
        return `var ${name} setget ${setter ? name + "_set" : ""}, ${getter ? name + "_get" : ""}`;
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
//# sourceMappingURL=parse_class_declaration.js.map