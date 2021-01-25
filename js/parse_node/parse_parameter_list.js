"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_node_1 = require("../parse_node");
/*
 * Like func set_text(s: string, c: Color)
 *                    ^^^^^^^^^^^^^^^^^^^
 */
exports.parseParameterList = (parent, list, props) => {
    return parse_node_1.combine({ parent, nodes: list, props, content: (...params) => params.join(', ') });
};
//# sourceMappingURL=parse_parameter_list.js.map