"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paths = void 0;
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const fs_1 = __importDefault(require("fs"));
const process_1 = __importDefault(require("process"));
// TODO: Do sourceTsPath and destGdPath have to be relative?
// TODO: rename this to something like "paths"
class Paths {
    constructor() {
        let commandLineArgument = process_1.default.argv[2];
        if (commandLineArgument === "--init") {
            this.init();
            process_1.default.exit(0);
        }
        let ts2gdPath = "";
        if (commandLineArgument) {
            ts2gdPath = commandLineArgument;
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
        // relativeTs2gdPath is now a path of some sort, but it could be a relative path (e.g. "./ts2gd.json").
        // Let's make it fully qualified.
        let fullyQualifiedTs2gdPathWithFilename;
        let fullyQualifiedTs2gdPath;
        if (ts2gdPath.startsWith("/")) {
            // absolute path
            fullyQualifiedTs2gdPathWithFilename = ts2gdPath;
        }
        else if (ts2gdPath.startsWith(".")) {
            // some sort of relative path, so resolve it
            fullyQualifiedTs2gdPathWithFilename = path_1.default.join(__dirname, commandLineArgument);
        }
        fullyQualifiedTs2gdPathWithFilename = ts2gdPath;
        fullyQualifiedTs2gdPath = path_1.default.dirname(fullyQualifiedTs2gdPathWithFilename);
        const tsgdJson = JSON.parse(fs_1.default.readFileSync(fullyQualifiedTs2gdPathWithFilename, "utf-8"));
        // TODO: Assert that these are found on the json object
        this.sourceTsPath = path_1.default.join(fullyQualifiedTs2gdPath, tsgdJson.source);
        this.destGdPath = path_1.default.join(fullyQualifiedTs2gdPath, tsgdJson.destination);
        this.rootPath = fullyQualifiedTs2gdPath;
        this.staticGodotDefsPath = path_1.default.join(this.rootPath, "godot_defs", "static");
        this.dynamicGodotDefsPath = path_1.default.join(this.rootPath, "godot_defs", "dynamic");
        this.godotSourceRepoPath = tsgdJson.godotSourceRepoPath || undefined;
        let tsconfigPath = typescript_1.default.findConfigFile(path_1.default.dirname(fullyQualifiedTs2gdPathWithFilename), typescript_1.default.sys.fileExists, "tsconfig.json");
        if (!tsconfigPath) {
            console.error("tsconfig.json must be in the same folder as tsgd.json. Thanks!");
            process_1.default.exit(0);
        }
        else {
            this.tsconfigPath = tsconfigPath;
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
        fs_1.default.mkdirSync("compiled");
        fs_1.default.mkdirSync("src");
        console.info("ts2gd.json created.");
        console.info("compiled/ created.");
        console.info("src/ created.");
    }
}
exports.Paths = Paths;
//# sourceMappingURL=tsgd_json.js.map