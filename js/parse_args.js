"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHelp = exports.parseArgs = void 0;
const parseArgs = () => {
    const args = process.argv.slice(2);
    const flags = {
        help: false,
        buildLibraries: false,
    };
    for (const arg of args) {
        if (arg.trim().length === 0) {
            continue;
        }
        if (arg === "-help") {
            flags.help = true;
        }
        else if (arg === "-buildLibraries") {
            flags.buildLibraries = true;
        }
        else {
            flags.help = true;
        }
    }
    return flags;
};
exports.parseArgs = parseArgs;
const printHelp = () => {
    console.log();
    console.log("Arguments:");
    console.log("-help              Print this help.");
    console.log("-buildLibraries    Force ts2gd to regenerate the TypeScript definitions for Godot.");
    console.log();
    console.log();
    console.log("See README on GitHub for much more detail: https://github.com/johnfn/ts2gd");
};
exports.printHelp = printHelp;
//# sourceMappingURL=parse_args.js.map