"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_node_1 = require("../parse_node");
/**
 * Like this.set_text("blah", Color.red)
 *                    ^^^^^^^^^^^^^^^^^
 */
exports.parseArgumentList = (parent, list, props) => {
    if (!list) {
        return { content: "" };
    }
    return parse_node_1.combine({ parent, nodes: [...list], props, content: (...args) => `${args.join(", ")}` });
};
//# sourceMappingURL=parse_argument_list.js.map