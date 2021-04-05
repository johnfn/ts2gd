#!/usr/bin/env ts-node
"use strict";
// how do u access global label
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
/Users/johnfn/code/tsgd/ts2gd/project/godot_parser.ts:77
    while (file[nextNonemptyIndex].trim() === "") {
                                   ^
TypeError: Cannot read property 'trim' of undefined
    at eof (/Users/johnfn/code/tsgd/ts2gd/project/godot_parser.ts:77:36)
    at Object.parseGodotConfigFile (/Users/johnfn/code/tsgd/ts2gd/project/godot
*/
// HIGH
// TODO: Better print() output, with spacing
// TODO: Document @exports
// TODO: parseGodotConfigFile() can fail if the config is in a bad state, e.g.
// merge conflicts. should just retry after a while.
// TODO: change_scene should autocomplete .tscn files only
// TODO: "cannot find module typescript"
// TODO: if you dont have a tsconfig.json it just goes into an infinite loop
// and we need to generate one for the skipping library stuff
// TODO: we need to clean up old node_paths when we delete or rename a class.
// TODO: Import constants from other files.
// TODO: Taking in funcrefs and calling them.
//   specifically for mapping over my 2d board.
// TODO: Godot doesnt allow shadowing tho TS does.
// TODO: Renaming files crashes when the previously named thing was imported somewhere.
// TODO: new assets aren't immediately imported.
// TODO: There are bugs when you have both a constructor and an _ready() method.
// TODO: this.collision.connect("mouseexit", this, () => {})
// TODO: Inline gdscript
// TODO: Resolve node paths even through instances.
// TODO: Fun idea: array[1-1] (or some other notation) could translate into slicing
//   Eh it wouldnt typecheck though...
//   Might be possible if an array had 2 index signatures and it was something like array["1:1"]
// MED
// TODO: Add __filter and __map to symbol table
// TODO: new Thing() should find the appropriate scene to initialize if there is one.
// TODO: template strings
// TODO: str()
// TODO: ": float" in parameters is not respected
// TODO: change_scene should accept a AssetPath filtered on tscn
// TODO: parse_json return type.
// TODO: Why is car.tscn a Node, not a Spatial?
// TODO: Can prob autowrite "extends Object" if we dont write an explicit extends
// TODO: Labeled break??? See SpontaneousDialog.ts say() for an example
// TODO: better support for int and float types.
//   TODO: Modulo expects int instead of float and will error if it sees the wrong one...
// TODO: Rename "@globals" to globals or something
//   There is a clash betweeh us using @ to mean "generated d.ts based on project"
//   and Godot's somewhat-random use of @
// TODO: "a" + 1 doesnt work but prob should
// TODO: refactor resPath and tsPath and etc
// TODO: Find most commonly used godot functions etc and see if we can do anything w them.
// TODO: The whole Class() thing is clearly possible - see String() for
//       an example!
// TODO: SUbtracting vectors gives a number for some reason
// LOW
// TODO: Move get/set to the same hoisting thing - and then classes - and then functions.
// TODO: For autoload classes, marking them @autoload would then update the config file
//         - this would require being able to save back config files accurately.
const typescript_1 = __importDefault(require("typescript"));
const process = __importStar(require("process"));
const project_1 = require("./project/project");
const tsgd_json_1 = require("./project/tsgd_json");
const check_version_1 = require("./check_version");
const parse_args_1 = require("./parse_args");
const setup = () => {
    const tsgdJson = new tsgd_json_1.Paths();
    const formatHost = {
        getCanonicalFileName: (path) => path,
        getCurrentDirectory: typescript_1.default.sys.getCurrentDirectory,
        getNewLine: () => typescript_1.default.sys.newLine,
    };
    let tsUpdateResolve;
    const tsUpdate = new Promise((resolve) => {
        tsUpdateResolve = resolve;
    });
    let watchProgram;
    function reportDiagnostic(diagnostic) {
        const errorMessage = typescript_1.default.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine());
        // Quiet the errors which are not really errors.
        if (errorMessage.match(/Operator '[+\-*/]=?' cannot be applied to types 'Vector[23]' and '(Vector[23]|number)'/)) {
            return;
        }
        if (errorMessage.match(/The left-hand side of an 'in' expression must be of type/)) {
            return;
        }
    }
    const reportWatchStatusChanged = (diagnostic, newLine) => { };
    // Wait until we've definitely loaded in the definitions
    let interval = setInterval(() => {
        let allSourceFiles = watchProgram
            ?.getProgram()
            .getSourceFiles()
            .map((x) => x.fileName) ?? [];
        if (allSourceFiles.find((name) => name.includes("@globals.d.ts"))) {
            clearInterval(interval);
            tsUpdateResolve();
        }
    }, 100);
    const host = typescript_1.default.createWatchCompilerHost(tsgdJson.tsconfigPath, {}, typescript_1.default.sys, typescript_1.default.createEmitAndSemanticDiagnosticsBuilderProgram, reportDiagnostic, reportWatchStatusChanged);
    watchProgram = typescript_1.default.createWatchProgram(host);
    const configFile = typescript_1.default.readJsonConfigFile(tsgdJson.tsconfigPath, typescript_1.default.sys.readFile);
    const opt = typescript_1.default.parseConfigFileTextToJson(tsgdJson.tsconfigPath, configFile.text);
    opt.config.useCaseSensitiveFileNames = false;
    return {
        watchProgram,
        tsgdJson,
        reportWatchStatusChanged,
        tsUpdate,
    };
};
const main = async (flags) => {
    const start = new Date().getTime();
    const { watchProgram, tsgdJson, tsUpdate } = setup();
    let project = await project_1.makeTsGdProject(tsgdJson, watchProgram);
    if (project.shouldBuildDefinitions(flags)) {
        await project.buildAllDefinitions();
    }
    // This resolves a race condition where TS would not be aware of all the files
    // we just saved in buildAllDefinitions().
    await tsUpdate;
    project.compileAllSourceFiles();
    console.info("Initial compilation complete in", (new Date().getTime() - start) / 1000 + "s");
};
if (!process.argv[1].includes("test")) {
    const flags = parse_args_1.parseArgs();
    check_version_1.checkVersionAsync();
    if (flags.help) {
        parse_args_1.printHelp();
    }
    else {
        main(flags);
    }
}
//# sourceMappingURL=main.js.map