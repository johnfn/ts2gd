import chalk from "chalk"
import ts from "typescript"

import { ParsedArgs } from "../parse_args"

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

export type TsGdError = {
  error: ErrorName
  location: ts.Node | string
  stack: string
  description: string
}

export class Errors {
  private errors: TsGdError[] = []

  constructor(private args: ParsedArgs) {}

  get() {
    return this.errors
  }

  add(error: TsGdError) {
    this.errors.push(error)
  }

  display(message: string) {
    if (!this.args.debug) {
      console.clear()
    }

    if (this.errors.length === 0) {
      console.info(message)
      console.info()
      console.info(chalk.greenBright("No errors."))

      return false
    }

    console.info(message)
    console.info()
    console.info(
      chalk.redBright(
        `${this.errors.length} error${this.errors.length > 1 ? "s" : ""}.`
      )
    )

    for (const error of this.errors) {
      if (typeof error.location === "string") {
        console.warn(`${chalk.blueBright(error.location)}`)
      } else {
        const lineAndChar = error.location
          .getSourceFile()
          ?.getLineAndCharacterOfPosition(error.location.getStart())

        if (!lineAndChar && this.args.debug) {
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

        if (this.args.debug) {
          console.log(error.stack)
        }
      }

      console.info(error.description)
    }

    this.errors = []
    return true
  }
}

export default Errors
