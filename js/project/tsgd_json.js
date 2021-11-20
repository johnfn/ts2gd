"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paths = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const process_1 = __importDefault(require("process"));
const main_1 = require("../main");
const generate_tsconfig_1 = require("../generate_library_defs/generate_tsconfig");
// TODO: Do sourceTsPath and destGdPath have to be relative?
class Paths {
    /** Where the .ts files live, e.g. ./src */
    sourceTsPath;
    /** Where the compiled .gd files go, e.g. ./compiled */
    destGdPath;
    /** The root path of the project */
    rootPath;
    /** The full path to the tsconfig file. e.g. /Users/johnfn/GodotProject/tsconfig.json */
    tsconfigPath;
    /** The path to the Godot definitions folder for unchanging library definitions.
     * e.g. /Users/johnfn/GodotProject/_godot_defs/static */
    staticGodotDefsPath;
    /** The path to the Godot definitions folder for definitions based off user files.
     * e.g. /Users/johnfn/GodotProject/_godot_defs/dynamic */
    dynamicGodotDefsPath;
    /** The path to the Godot repository, e.g. /Users/johnfn/Godot */
    godotSourceRepoPath;
    constructor(args) {
        if (args.init) {
            this.init();
            process_1.default.exit(0);
        }
        let ts2gdPath = "";
        let fullyQualifiedTs2gdPathWithFilename;
        let fullyQualifiedTs2gdPath;
        if (args.tsgdPath) {
            ts2gdPath = args.tsgdPath;
            // relativeTs2gdPath is now a path of some sort, but it could be a relative path (e.g. "./ts2gd.json").
            // Let's make it fully qualified.
            if (ts2gdPath.startsWith("/")) {
                // absolute path
                fullyQualifiedTs2gdPathWithFilename = ts2gdPath;
            }
            else if (ts2gdPath.startsWith(".")) {
                // some sort of relative path, so resolve it
                fullyQualifiedTs2gdPathWithFilename = path_1.default.join(__dirname, args.tsgdPath);
            }
        }
        else {
            // Check if we can find the ts2gd.json in the current folder
            const ts2gdInCurrentFolderPath = path_1.default.join(process_1.default.cwd(), "ts2gd.json");
            if (!fs_1.default.existsSync(ts2gdInCurrentFolderPath)) {
                console.error("No ts2gd.json file found.");
                console.error("Try running ts2gd --init.");
                process_1.default.exit(0);
            }
            ts2gdPath = ts2gdInCurrentFolderPath;
        }
        fullyQualifiedTs2gdPathWithFilename = ts2gdPath;
        fullyQualifiedTs2gdPath = path_1.default.dirname(fullyQualifiedTs2gdPathWithFilename);
        const tsgdJson = JSON.parse(fs_1.default.readFileSync(fullyQualifiedTs2gdPathWithFilename, "utf-8"));
        // TODO: Assert that these are found on the json object
        this.sourceTsPath = path_1.default.join(fullyQualifiedTs2gdPath, tsgdJson.source);
        this.destGdPath = path_1.default.join(fullyQualifiedTs2gdPath, tsgdJson.destination);
        this.rootPath = fullyQualifiedTs2gdPath;
        this.staticGodotDefsPath = path_1.default.join(this.rootPath, "_godot_defs", "static");
        this.dynamicGodotDefsPath = path_1.default.join(this.rootPath, "_godot_defs", "dynamic");
        this.godotSourceRepoPath = tsgdJson.godotSourceRepoPath || undefined;
        this.tsconfigPath = path_1.default.join(path_1.default.dirname(fullyQualifiedTs2gdPathWithFilename), "tsconfig.json");
        if (!fs_1.default.existsSync(this.tsconfigPath)) {
            main_1.showLoadingMessage("Creating tsconfig.json", args);
            fs_1.default.writeFileSync(this.tsconfigPath, generate_tsconfig_1.defaultTsconfig);
        }
    }
    /**
     * Called when a user types ts2gd --init
     */
    init() {
        let destPath = path_1.default.join(process_1.default.cwd(), "ts2gd.json");
        fs_1.default.writeFileSync(destPath, `{
  "destination": "./compiled",
  "source": "./src"
}`);
        // Can't hurt!
        fs_1.default.mkdirSync("compiled", { recursive: true });
        fs_1.default.mkdirSync("src", { recursive: true });
        fs_1.default.mkdirSync(".vscode", { recursive: true });
        const launch = path_1.default.join(process_1.default.cwd(), ".vscode", "launch.json");
        // TODO: Put in a separate file.
        if (!fs_1.default.existsSync(launch))
            fs_1.default.writeFileSync(launch, `{
      "version": "0.2.0",
      "configurations": [
        {
          "name": "GDScript Godot",
          "type": "godot",
          "request": "launch",
          "project": "$\{workspaceFolder}",
          "port": 6007,
          "address": "127.0.0.1",
          "launch_game_instance": true,
          "launch_scene": false
        }
      ]
    }`);
        console.info("ts2gd.json created.");
        console.info("compiled/ created.");
        console.info("src/ created.");
    }
}
exports.Paths = Paths;
//# sourceMappingURL=tsgd_json.js.map