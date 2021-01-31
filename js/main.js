#!/usr/bin/env ts-node
"use strict";
// TODO: We need to generate additional code for a == b when they arent the same type.
// TODO: There are bugs when you have both a constructor and an _init() method.
// TODO: Rename "@globals" to globals or something
//   There is a clash betweeh us using @ to mean "generated d.ts based on project"
//   and Godot's somewhat-random use of @
// TODO: new assets aren't immediately imported.
// TODO: clash between this.foo and foo() since this is removed by godot
// TODO: ": float" in parameters is not respected
// TODO: we need to clean up old node_paths when we delete or rename a class.
// TODO: template strings
// TODO: str()
// TODO: Godot globals
// TODO: For autoload classes, create the global variable implicitly ? is this possible?  (b/c namespace problems)
// TODO: For autoload classes, marking them would then update the config file
//         - this would require being able to save back config files accurately.
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
// TODO: new Thing() should find the appropriate scene to initialize if there is one.
// TODO: "a" + 1 doesnt work but prob should
// TODO: this.collision.connect("mouseexit", this, () => {})
// TODO: refactor resPath and tsPath and etc
// TODO: Find most commonly used godot functions etc and see if we can do anything w them.
// TODO: it's hard to compile ++/-- properly.
// TODO: Resolve node paths even through instances.
// TODO: Inline gdscript
// TODO: "collision/safe_margin"
// TODO: change_scene should accept a AssetPath filtered on tscn
// TODO: Move get/set to the same hoisting thing - and then classes - and then functions.
// TODO: Modulo expects int instead of float and will error if it sees the wrong one...
// TODO: sanitize variable and function name generation
// TODO: There's a bug where cleaning up self. can cause variable name collisions.
// TODO: Clean up TS errors and output - only output if something is
// seriously wrong!
// TODO: this.blah.add() doesnt parse right
// TODO: SUbtracting vectors gives a number for some reason
// TODO: Workout SpontaneousDialog.instance()
// TODO: Handle the case when a class exists in multiple scenes - probably just error at this point.
// TODO: Mark things as onready with @onready
// TODO: You can have _ready() and constructor
// TODO: _prefixed names could possibly clash
// TODO: Discarded return values from function calls?
// TODO: The whole Class() thing is clearly possible - see String() for
//       an example!
// TODO: Node2D has a size() property.
// TODO: tile_get_shapes is any[] when it shouldn't be
// TODO: Labeled break??? See SpontaneousDialog.ts say() for an example
// TODO: Use AST transformers?
const typescript_1 = __importDefault(require("typescript"));
const process = __importStar(require("process"));
const project_1 = require("./project/project");
const tsgd_json_1 = require("./project/tsgd_json");
const setup = () => {
    const tsgdJson = new tsgd_json_1.Paths();
    const formatHost = {
        getCanonicalFileName: (path) => path,
        getCurrentDirectory: typescript_1.default.sys.getCurrentDirectory,
        getNewLine: () => typescript_1.default.sys.newLine,
    };
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
    const onTsUpdate = {
        resolve: () => { },
    };
    const reportWatchStatusChanged = (diagnostic, newLine) => {
        onTsUpdate.resolve();
    };
    const host = typescript_1.default.createWatchCompilerHost(tsgdJson.tsconfigPath, {}, typescript_1.default.sys, typescript_1.default.createEmitAndSemanticDiagnosticsBuilderProgram, reportDiagnostic, reportWatchStatusChanged);
    const watchProgram = typescript_1.default.createWatchProgram(host);
    const configFile = typescript_1.default.readJsonConfigFile(tsgdJson.tsconfigPath, typescript_1.default.sys.readFile);
    const opt = typescript_1.default.parseConfigFileTextToJson(tsgdJson.tsconfigPath, configFile.text);
    opt.config.useCaseSensitiveFileNames = false;
    return {
        watchProgram,
        tsgdJson,
        reportWatchStatusChanged,
        onTsUpdate,
    };
};
const main = async () => {
    const start = new Date().getTime();
    const { watchProgram, tsgdJson, onTsUpdate } = setup();
    let project = await project_1.makeTsGdProject(tsgdJson, watchProgram);
    await project.buildAllDefinitions();
    // This resolves a race condition where TS would not be aware of all the files
    // we just saved in buildAllDefinitions().
    await Promise.race([
        new Promise((resolve) => setTimeout(resolve, 500)),
        new Promise((resolve) => {
            onTsUpdate.resolve = resolve;
        }),
    ]);
    project.compileAllSourceFiles();
    console.info("Initial compilation complete in", (new Date().getTime() - start) / 1000 + "s");
};
if (!process.argv[1].includes("test")) {
    main();
}
//# sourceMappingURL=main.js.map