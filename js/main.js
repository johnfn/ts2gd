"use strict";
// VERY USEFUL
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
exports.main = exports.showLoadingMessage = void 0;
// TODO: Turn off skipLibCheck
// TODO: Import constants from other files.
// - we'd have to extract these into a standard global autoload class, and point all references to constants to that global autoload.
// TODO: Rename ParsedArgs to ParsedFlags
// TODO: It would be extremely useful for some things - like the project settings and ParsedArgs - to be singletons.
// USEFUL
// TODO: Have a github action that auto publishes an html5 build
// TODO: https://gist.github.com/tmaybe/4c9d94712711229cd506 use this strategy to avoid conflicts in the /compiled folder
// TODO  make load/preload() work and return proper string
// TODO make FooTscn return proper type of root node (without script, not just Node)
// TODO: Merge conflict markets in project.godot cause a ts2gd crash.
// TODO: Better print() output, with spacing
// TODO: check for E_OK
// TODO: Deleting a scene can cause a "I dont know the type of that thing." error.
// TODO: Ensure that there aren't any bugs with _ prefixes.
// HIGH
// TODO: It might be handy to keep ParseNodeTypes around for subnodes etc and return an entire tree of them. this would help code in parse_call_express that wants to inspect child nodes to see what they are etc
// TODO: this.gold_instance?.queue_free() doesn't gen right.
// TODO: while (foo++) { } might put the increment in the wrong place
// TODO: if (foo++) { } else { } will DEFINTELY put it in the wrong place, as it needs to be in both true and false blocks.
// TODO: Refactor error handling strategy.
// TODO: change_scene_to takes a PackedScene but since it's a <T> it's treated as an any.
// TODO: Make a testing harness for project-related stuff.
// TODO: I need to abstract over the TS and chokidar file watcher interface thingy.
// TODO: The onChange flow in project.ts delets the old obj and adds a new one - but then you lose local state. I should think of a way to address this.
// TODO: Could get best of both worlds with yield Yield() (although that looks stupid).
// TODO: have a way to compile all files, and collate all errors.
// TODO: we need to clean up old node_paths when we delete or rename a class.
// TODO: Taking in funcrefs and calling them.
//   specifically for mapping over my 2d board.
// TODO: new assets aren't immediately imported.
// TODO: There are bugs when you have both a constructor and an _ready() method.
// TODO: Inline gdscript
// TODO: Resolve node paths even through instances.
// MED
// TODO: Godot doesnt allow shadowing tho TS does.
// TODO: Do I even handle nested folders?
// TODO: str() with no arguments is technically an error
// TODO: Add __filter and __map to symbol table
// TODO: new Thing() should find the appropriate scene to initialize if there is one.
// TODO: template strings
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
// TODO:
// Instead of doing stuff like         const script = this.sourceFiles().find((sf) => sf.resPath === resPath)
// just have autoloads stored as Assets
// TODO: Move get/set to the same hoisting thing - and then classes - and then functions.
const typescript_1 = __importDefault(require("typescript"));
const process = __importStar(require("process"));
const package_json_1 = __importDefault(require("./package.json"));
const project_1 = require("./project/project");
const tsgd_json_1 = require("./project/tsgd_json");
const check_version_1 = require("./check_version");
const parse_args_1 = require("./parse_args");
const chalk_1 = __importDefault(require("chalk"));
const setup = (tsgdJson) => {
    const formatHost = {
        getCanonicalFileName: (path) => path,
        getCurrentDirectory: typescript_1.default.sys.getCurrentDirectory,
        getNewLine: () => typescript_1.default.sys.newLine,
    };
    let tsUpdateResolve;
    const tsInitializationFinished = new Promise((resolve) => {
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
        tsInitializationFinished,
    };
};
const showLoadingMessage = (msg, args, done = false) => {
    if (!args.debug)
        console.clear();
    console.info(chalk_1.default.blueBright("ts2gd v" + package_json_1.default.version), "-", msg + (done ? "" : "..."));
};
exports.showLoadingMessage = showLoadingMessage;
const main = async (args) => {
    const start = new Date().getTime();
    const tsgdJson = new tsgd_json_1.Paths(args);
    exports.showLoadingMessage("Initializing TypeScript", args);
    const { watchProgram, tsInitializationFinished } = setup(tsgdJson);
    exports.showLoadingMessage("Scanning project", args);
    let project = await project_1.makeTsGdProject(tsgdJson, watchProgram, args);
    if (args.buildLibraries || project.shouldBuildLibraryDefinitions(args)) {
        exports.showLoadingMessage("Building definition files", args);
        await project.buildLibraryDefinitions();
    }
    await project.buildDynamicDefinitions();
    // This resolves a race condition where TS would not be aware of all the files
    // we just saved in buildAllDefinitions().
    exports.showLoadingMessage("Waiting for TypeScript to finish", args);
    await tsInitializationFinished;
    if (!project.validateAutoloads()) {
        process.exit(0);
    }
    exports.showLoadingMessage("Compiling all source files", args);
    project.compileAllSourceFiles();
    exports.showLoadingMessage(`Startup complete in ${(new Date().getTime() - start) / 1000 + "s"}`, args, true);
};
exports.main = main;
if (!process.argv[1].includes("test")) {
    const args = parse_args_1.parseArgs();
    check_version_1.checkVersionAsync();
    if (args.help) {
        parse_args_1.printHelp();
    }
    else {
        exports.main(args);
    }
}
//# sourceMappingURL=main.js.map