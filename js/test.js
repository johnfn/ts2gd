"use strict";
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
exports.runTests = exports.compileTs = void 0;
const ts = __importStar(require("typescript"));
const parse_node_1 = require("./parse_node");
const generate_base_1 = require("./generate_library_defs/generate_base");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const scope_1 = require("./scope");
const chalk_1 = __importDefault(require("chalk"));
const compileTs = (code, isAutoload) => {
    const filename = isAutoload ? "autoload.ts" : "test.ts";
    const sourceFile = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const libDTs = ts.createSourceFile("lib.d.ts", generate_base_1.baseContentForTests, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const tsconfigOptions = {
        strict: true,
    };
    const defaultCompilerHost = ts.createCompilerHost(tsconfigOptions);
    const customCompilerHost = {
        getSourceFile: (name, languageVersion) => {
            if (name === filename) {
                return sourceFile;
            }
            else if (name === "lib.d.ts") {
                return libDTs;
            }
            else {
                return defaultCompilerHost.getSourceFile(name, languageVersion);
            }
        },
        writeFile: (filename, data) => { },
        getDefaultLibFileName: () => "lib.d.ts",
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: (filename) => filename,
        getCurrentDirectory: () => "",
        getNewLine: () => "\n",
        getDirectories: () => [],
        fileExists: () => true,
        readFile: () => "",
        getSourceFileByPath: (filename, path, languageVersion) => {
            return defaultCompilerHost.getSourceFile(filename, languageVersion);
        },
    };
    const program = ts.createProgram(["test.ts", "autoload.ts"], tsconfigOptions, customCompilerHost);
    let i = 0;
    const genUniqueName = () => `func${++i}`;
    // TODO: Make this less silly.
    const godotFile = parse_node_1.parseNode(sourceFile, {
        indent: "",
        scope: new scope_1.Scope(program),
        isConstructor: false,
        program,
        genUniqueName,
        project: {
            buildAllDefinitions: async () => { },
            assets: [],
            program: undefined,
            compileAllSourceFiles: () => { },
            shouldBuildDefinitions: () => false,
            mainScene: {
                fsPath: "",
                resPath: "",
                nodes: [],
                resources: [],
                name: "mainScene",
                project: {},
                rootNode: {},
            },
            godotScenes: () => [],
            createAsset: () => 0,
            godotClasses: () => [],
            godotFonts: () => [],
            godotImages: () => [],
            godotGlbs: () => [],
            godotProject: {
                fsPath: "",
                autoloads: [{ resPath: "autoload.ts" }],
                mainScene: {},
                rawConfig: 0,
                actionNames: [],
                project: {},
            },
            monitor: () => 0,
            onAddAsset: () => { },
            onChangeAsset: () => { },
            onRemoveAsset: () => { },
            sourceFiles: () => [
                {
                    className: () => "",
                    fsPath: "autoload.ts",
                    isAutoload: () => true,
                    resPath: "",
                    tsRelativePath: "",
                    getEnumPath: () => "",
                    _lastCompilationResult: undefined,
                    gdContainingDirectory: "",
                    destroy: () => { },
                    project: {},
                    tsType: () => "",
                    compile: async () => { },
                    gdPath: "",
                    reload: () => { },
                },
                {
                    className: () => "",
                    fsPath: "test.ts",
                    isAutoload: () => false,
                    resPath: "",
                    gdPath: "",
                    tsRelativePath: "",
                    getEnumPath: () => "",
                    gdContainingDirectory: "",
                    _lastCompilationResult: undefined,
                    destroy: () => { },
                    project: {},
                    tsType: () => "",
                    compile: async () => { },
                    reload: () => { },
                },
            ],
        },
        mostRecentControlStructureIsSwitch: false,
        isAutoload: false,
        usages: new Map(),
    });
    return godotFile;
};
exports.compileTs = compileTs;
const trim = (s) => {
    return s
        .split("\n")
        .map((x) => x.trimRight())
        .filter((x) => x.trim() !== "")
        .join("\n");
};
const test = (props, name, testFileName, path) => {
    const { ts, expected } = props;
    const compiled = exports.compileTs(ts, props.isAutoload ?? false);
    const output = compiled.content;
    if (props.expectedFiles) {
        // Go into file comparison mode
        for (const { filename, content } of props.expectedFiles) {
            const match = (compiled.enums ?? []).find((e) => e.name + ".gd" === filename);
            if (!match) {
                return {
                    type: "fail",
                    result: "",
                    expected: `${filename} was not created.`,
                    name,
                    expectFail: props.expectFail ?? false,
                    fileName: testFileName,
                    path: "[generated]/" + testFileName,
                };
            }
            if (trim(content) !== trim(match.content)) {
                return {
                    type: "fail",
                    result: content,
                    expected: match.content,
                    name,
                    expectFail: props.expectFail ?? false,
                    fileName: testFileName,
                    path: "[generated]/" + testFileName,
                };
            }
        }
    }
    if (trim(output) === trim(expected)) {
        return { type: "success" };
    }
    return {
        type: "fail",
        result: trim(output),
        expected: trim(expected),
        name,
        expectFail: props.expectFail ?? false,
        fileName: testFileName,
        path,
    };
};
const getAllFiles = async () => {
    const files = fs_1.default.readdirSync("./parse_node");
    const results = {};
    for (const fts of files) {
        const f = path_1.default.basename(fts);
        if (f === "index") {
            continue;
        }
        let relativePath = "./parse_node/" + f;
        const obj = await Promise.resolve().then(() => __importStar(require(relativePath)));
        results[f] = {
            content: obj,
            path: path_1.default.resolve(relativePath),
        };
    }
    return results;
};
const runTests = async () => {
    let total = 0;
    let tests = [];
    const everything = await getAllFiles();
    for (const [fileName, { path, content }] of Object.entries(everything)) {
        for (const [testName, testObj] of Object.entries(content)) {
            if (testName.startsWith("test")) {
                tests.push({ ...testObj, testName, fileName, path });
            }
        }
    }
    tests =
        tests.filter((t) => t.only).length > 0 ? tests.filter((t) => t.only) : tests;
    const failures = [];
    const start = new Date().getTime();
    for (const testObj of tests) {
        // mock out console.log to display logs nicer
        const logged = [];
        const oldConsoleLog = console.log;
        console.log = (...args) => logged.push(args);
        const result = test(testObj, testObj.testName, testObj.fileName, testObj.path);
        console.log = oldConsoleLog;
        total++;
        if (result.type === "fail") {
            result.logs = logged;
            failures.push(result);
        }
    }
    const elapsed = (new Date().getTime() - start) / 1000 + "s";
    if (failures.length === 0) {
        console.info("All", total, "tests passed!");
    }
    else if (failures.length > 0 &&
        failures.filter((x) => x.expectFail).length === failures.length) {
        console.info(total, "tests passed, in", elapsed);
        console.info("\nSome failed, but they were expected to fail:");
        console.info(failures.map((f) => "  " + f.name).join("\n"));
    }
    else {
        for (let { expected, name, result, logs, path } of failures.filter((x) => !x.expectFail)) {
            const fileContents = fs_1.default.readFileSync(path, "utf-8");
            const lines = fileContents.split("\n");
            // Take a guess at line
            let line = (lines.findIndex((l) => l.includes(`export const ${name}`)) ?? -1) + 1;
            console.info("=============================================");
            console.info(name, "failed:");
            console.info(`  in`, chalk_1.default.yellowBright(`${path}${line ? `:${line}:0` : ``}`));
            console.info("=============================================\n");
            console.info("\x1b[31mExpected:\x1b[0m");
            let str = "";
            for (let i = 0; i < expected.length; i++) {
                if (expected[i] !== result[i]) {
                    if (expected[i].trim() === "") {
                        str += `\x1b[41m${expected[i]}\x1b[0m`;
                    }
                    else {
                        str += `\x1b[31m${expected[i]}\x1b[0m`;
                    }
                }
                else {
                    str += expected[i];
                }
            }
            console.info(str
                .split("\n")
                .map((x) => "  " + x + "\n")
                .join(""));
            console.info("\x1b[32mActual:\x1b[0m");
            console.info(result
                .split("\n")
                .map((x) => "  " + x + "\n")
                .join(""));
            if (logs && logs.length > 0) {
                console.info("Logs:");
                for (const log of logs) {
                    console.info(...log);
                }
            }
        }
        const failureCount = failures.filter((x) => !x.expectFail).length;
        console.info("\n");
        console.info("Failed", failureCount, failureCount > 1 ? "tests." : "test.");
    }
};
exports.runTests = runTests;
exports.runTests();
//# sourceMappingURL=test.js.map