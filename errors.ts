import chalk from "chalk"
import ts from "typescript"
import { syntaxKindToString } from "./ts_utils"

export enum ErrorName {
  InvalidNumber,
  InvalidImport,
  ClassNameNotFound,
  ClassDoesntExtendAnything,
  ClassMustBeExported,
  TooManyClassesFound,
  ClassCannotBeAnonymous,
  CantFindAutoloadInstance,
  UnknownTsSyntax,
  PathNotFound,
  ExportedVariableError,
  InvalidFile,

  Ts2GdError,

  AutoloadProjectButNotDecorated,
  AutoloadDecoratedButNotProject,
  AutoloadNotExported,

  NoComplicatedConnect,

  SignalsMustBePrefixedWith$,

  DeclarationNotGiven,
}

export type TsGdReturn<T> = {
  errors?: TsGdError[]
  result: T
}

export type TsGdError = {
  error: ErrorName
  location: ts.Node | string
  stack: string
  description: string
}

export const displayErrors = (errors: TsGdError[]) => {
  for (const error of errors) {
    if (typeof error.location === "string") {
      console.warn("Error at", `${chalk.blueBright(error.location)}`)
    } else {
      const lineAndChar = error.location
        .getSourceFile()
        ?.getLineAndCharacterOfPosition(error.location.getStart())

      if (!lineAndChar) {
        console.log(lineAndChar)
        console.log(error.location)
        console.log(error.stack)
      }

      const { line, character } = lineAndChar

      console.warn()
      console.warn(
        "Error at",
        `${chalk.blueBright(
          error.location.getSourceFile().fileName
        )}:${chalk.yellow(line + 1)}:${chalk.yellow(character + 1)}`
      )
    }

    console.info(error.description)
  }
}
