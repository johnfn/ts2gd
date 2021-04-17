import chalk from "chalk"
import ts from "typescript"

export enum ErrorName {
  InvalidNumber,
  InvalidImport,
  ClassNameNotFound,
  TooManyClassesFound,
  ClassCannotBeAnonymous,
  CantFindAutoloadInstance,
  UnknownTsSyntax,
  PathNotFound,

  Ts2GdError,

  AutoloadProjectButNotDecorated,
  AutoloadDecoratedButNotProject,
  AutoloadNotExported,
  NoComplicatedConnect,
}

export type TsGdReturn<T> = {
  errors?: TsGdError[]
  result: T
}

export type TsGdError = {
  error: ErrorName
  location: ts.Node | string
  description: string
}

export const displayErrors = (errors: TsGdError[]) => {
  for (const error of errors) {
    if (typeof error.location === "string") {
      console.warn("Error at", `${chalk.blueBright(error.location)}`)
    } else {
      const {
        line,
        character,
      } = error.location
        .getSourceFile()
        ?.getLineAndCharacterOfPosition(error.location.getStart())
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
