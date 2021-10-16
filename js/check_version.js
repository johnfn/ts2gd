"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVersionAsync = void 0;
const package_json_1 = __importDefault(require("./package.json"));
const https_1 = __importDefault(require("https"));
const chalk_1 = __importDefault(require("chalk"));
const checkVersionAsync = async () => {
    console.info(chalk_1.default.blueBright("ts2gd", "v" + package_json_1.default.version));
    const options = {
        hostname: "registry.npmjs.org",
        path: "/ts2gd",
    };
    let response = "";
    await new Promise((resolve) => {
        const req = https_1.default.request(options, (res) => {
            res.on("data", (d) => {
                response += d;
            });
            res.on("end", () => {
                resolve();
            });
        });
        req.end();
    });
    const versionNameDate = Object.entries(JSON.parse(response).time)
        .sort((first, second) => new Date(second[1]).getTime() - new Date(first[1]).getTime())
        .map(([a, b]) => [a, new Date(b)]);
    let latestPublishedVersion = "";
    for (const [versionName, date] of versionNameDate) {
        if (versionName === "modified") {
            continue;
        }
        latestPublishedVersion = versionName;
        break;
    }
    if (latestPublishedVersion !== package_json_1.default.version) {
        console.info(``);
        console.info(`There is a new version (${latestPublishedVersion}) of ts2gd. (You have ${package_json_1.default.version}.)`);
        console.info(`Install it with`);
        console.info(``);
        console.info(chalk_1.default.blue(`npm install --global ts2gd`));
    }
};
exports.checkVersionAsync = checkVersionAsync;
//# sourceMappingURL=check_version.js.map