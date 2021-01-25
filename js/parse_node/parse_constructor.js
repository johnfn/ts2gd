"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConstructor = void 0;
const parse_node_1 = require("../parse_node");
const parseConstructor = (node, props) => {
    if (node.body) {
        // The trim() is for a constructor with only one element: a super() call
        return parse_node_1.combine({
            parent: node,
            nodes: node.body,
            props,
            addIndent: true,
            content: body => `
func _ready(): 
  ${body.trim().length > 0 ? body : 'pass'}
`
        });
    }
    else {
        return parse_node_1.combine({
            parent: node,
            nodes: [],
            props,
            content: () => `func _ready():\n pass`
        });
    }
};
exports.parseConstructor = parseConstructor;
//# sourceMappingURL=parse_constructor.js.map