import chalk from "chalk"
import ts from "typescript"
import { ParsedArgs } from "./parse_args"

export enum ErrorName {
  InvalidNumber,
  InvalidImport,
  ClassNameNotFound,
  ClassDoesntExtendAnything,
  ClassMustBeExported,
  TooManyClassesFound,
  ClassCannotBeAnonymous,
  TwoClassesWithSameName,
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

// export type TsGdReturn<T> = {
//   errors?: TsGdError[]
//   result: T
// }

export type TsGdError = {
  error: ErrorName
  location: ts.Node | string
  stack: string
  description: string
}

let errors: TsGdError[] = []

export const addError = (error: TsGdError) => {
  errors.push(error)
}

export const displayErrors = (args: ParsedArgs, message: string) => {
  if (!args.debug) {
    console.clear()
  }

  if (errors.length === 0) {
    console.info(message)
    console.info()
    console.info(chalk.greenBright("No errors."))

    return
  }

  console.info(message)
  console.info()
  console.info(
    chalk.redBright(`${errors.length} error${errors.length > 1 ? "s" : ""}.`)
  )

  for (const error of errors) {
    if (typeof error.location === "string") {
      console.warn(`${chalk.blueBright(error.location)}`)
    } else {
      const lineAndChar = error.location
        .getSourceFile()
        ?.getLineAndCharacterOfPosition(error.location.getStart())

      if (!lineAndChar && args.debug) {
        console.log(lineAndChar)
        console.log(error.location)
        console.log(error.stack)
      }

      const { line, character } = lineAndChar

      console.warn()
      console.warn(
        `${chalk.blueBright(
          error.location.getSourceFile().fileName
        )}:${chalk.yellow(line + 1)}:${chalk.yellow(character + 1)}`
      )

      if (args.debug) {
        console.log(error.stack)
      }
    }

    console.info(error.description)
  }

  errors = []
}

export const __getErrorsTestOnly = () => {
  const result = errors

  errors = []

  return result
}
