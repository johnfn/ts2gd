"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayErrors = exports.ErrorName = void 0;
const chalk_1 = __importDefault(require("chalk"));
var ErrorName;
(function (ErrorName) {
    ErrorName[ErrorName["InvalidNumber"] = 0] = "InvalidNumber";
    ErrorName[ErrorName["InvalidImport"] = 1] = "InvalidImport";
    ErrorName[ErrorName["ClassNameNotFound"] = 2] = "ClassNameNotFound";
    ErrorName[ErrorName["ClassDoesntExtendAnything"] = 3] = "ClassDoesntExtendAnything";
    ErrorName[ErrorName["TooManyClassesFound"] = 4] = "TooManyClassesFound";
    ErrorName[ErrorName["ClassCannotBeAnonymous"] = 5] = "ClassCannotBeAnonymous";
    ErrorName[ErrorName["CantFindAutoloadInstance"] = 6] = "CantFindAutoloadInstance";
    ErrorName[ErrorName["UnknownTsSyntax"] = 7] = "UnknownTsSyntax";
    ErrorName[ErrorName["PathNotFound"] = 8] = "PathNotFound";
    ErrorName[ErrorName["Ts2GdError"] = 9] = "Ts2GdError";
    ErrorName[ErrorName["AutoloadProjectButNotDecorated"] = 10] = "AutoloadProjectButNotDecorated";
    ErrorName[ErrorName["AutoloadDecoratedButNotProject"] = 11] = "AutoloadDecoratedButNotProject";
    ErrorName[ErrorName["AutoloadNotExported"] = 12] = "AutoloadNotExported";
    ErrorName[ErrorName["NoComplicatedConnect"] = 13] = "NoComplicatedConnect";
})(ErrorName = exports.ErrorName || (exports.ErrorName = {}));
const displayErrors = (errors) => {
    for (const error of errors) {
        if (typeof error.location === "string") {
            console.warn("Error at", `${chalk_1.default.blueBright(error.location)}`);
        }
        else {
            const { line, character, } = error.location
                .getSourceFile()
                ?.getLineAndCharacterOfPosition(error.location.getStart());
            console.warn();
            console.warn("Error at", `${chalk_1.default.blueBright(error.location.getSourceFile().fileName)}:${chalk_1.default.yellow(line + 1)}:${chalk_1.default.yellow(character + 1)}`);
        }
        console.info(error.description);
    }
};
exports.displayErrors = displayErrors;
//# sourceMappingURL=errors.js.map