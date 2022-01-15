import fs from "fs"
import path from "path"

import ts from "typescript"
import * as utils from "tsutils"
import chalk from "chalk"

import { ParseNodeType, parseNode } from "../parse_node"
import { Scope } from "../scope"
import { baseContentForTests } from "../generate_library_defs/generate_base"
import { ParsedArgs } from "../parse_args"
import TsGdProject, { TsGdError, Errors } from "../project"
import { Paths } from "../project/paths"
import { AssetSourceFile } from "../project/assets/asset_source_file"

import { mockProjectPath } from "./test_utils"

export type Test = {
  expected:
    | string
    | { type: "error"; error: string }
    | {
        type: "multiple-files"
        files: { fileName: string; expected: string }[]
      }
  ts: string
  fileName?: string
  isAutoload?: boolean
  only?: boolean
  expectFail?: boolean
}

type TestResult = TestResultPass | TestResultFail

type TestResultPass = { type: "success" }
type TestResultFail = {
  type: "fail" | "fail-error" | "fail-no-error"
  fileName?: string
  result: string
  name: string
  expected: string
  expectFail?: boolean
  path: string
  logs?: any[][]
}

export function compileTs(
  code: string,
  isAutoload = false
): [ParseNodeType, TsGdError[]] {
  const filename = mockProjectPath(isAutoload ? "Autoload.ts" : "Test.ts")
  const normalizedFilename = path.normalize(filename)

  const sourceFile = ts.createSourceFile(
    filename,
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )

  const libDTs = ts.createSourceFile(
    "lib.d.ts",
    baseContentForTests(),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )

  const tsconfigOptions: ts.CompilerOptions = {
    strict: true,
  }

  const defaultCompilerHost = ts.createCompilerHost(tsconfigOptions, true)

  const customCompilerHost: ts.CompilerHost = {
    getSourceFile: (name, languageVersion) => {
      const normalizedName = path.normalize(name)
      if (normalizedName === normalizedFilename) {
        return sourceFile
      } else if (name === "lib.d.ts") {
        return libDTs
      } else {
        return defaultCompilerHost.getSourceFile(name, languageVersion)
      }
    },
    writeFile: (filename, data) => {},
    getDefaultLibFileName: () => "lib.d.ts",
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: (filename) => filename,
    getCurrentDirectory: () => "",
    getNewLine: () => "\n",
    getDirectories: () => [],
    fileExists: () => true,
    readFile: () => "",
    getSourceFileByPath: (filename, path, languageVersion) => {
      return defaultCompilerHost.getSourceFile(filename, languageVersion)
    },
  }

  const program = ts.createProgram(
    [mockProjectPath("Test.ts"), mockProjectPath("Autoload.ts")],
    tsconfigOptions,
    customCompilerHost
  )

  const args: ParsedArgs = {
    buildLibraries: false,
    buildOnly: false,
    printVersion: false,
    debug: false,
    help: false,
    init: false,
    tsgdPath: mockProjectPath("ts2gd.json"),
  }

  const project = new TsGdProject({
    program,
    args,
    initialFilePaths: [
      mockProjectPath("project.godot"),
      mockProjectPath("main.tscn"),
      mockProjectPath("Test.ts"),
      mockProjectPath("Autoload.ts"),
    ],
    ts2gdJson: new Paths(args),
  })

  const sourceFileAsset = new AssetSourceFile(filename, project)

  const godotFile = parseNode(sourceFile, {
    indent: "",
    sourceFile: sourceFile,
    scope: new Scope(program),
    isConstructor: false,
    program,
    project,
    sourceFileAsset: sourceFileAsset,
    mostRecentControlStructureIsSwitch: false,
    isAutoload,
    usages: utils.collectVariableUsage(sourceFile),
  })

  return [godotFile, project.errors.get()]
}

const trim = (s: string) => {
  return s
    .split("\n")
    .map((x) => x.trimRight())
    .filter((x) => x.trim() !== "")
    .join("\n")
}

const removeCommentLines = (s: string) => {
  return s
    .split("\n")
    .filter((x) => !x.startsWith("#"))
    .join("\n")
}

const normalize = (s: string) => {
  return removeCommentLines(trim(s))
}

const areOutputsEqual = (left: string, right: string) => {
  const leftTrimmed = removeCommentLines(trim(left))
  const rightTrimmed = removeCommentLines(trim(right))

  return leftTrimmed === rightTrimmed
}

const test = (
  props: Test,
  name: string,
  testFileName: string,
  path: string
): TestResult => {
  const { ts, expected } = props

  let compiled: ParseNodeType | null = null
  let errors: TsGdError[] = []

  try {
    let tuple = compileTs(ts, props.isAutoload)
    compiled = tuple[0]
    errors = tuple[1]
  } catch (e) {
    return {
      type: "fail",
      result: `Threw the following error: ${(e as any).stack}`,
      expected: `No errors`,
      name,
      expectFail: props.expectFail ?? false,
      path,
    }
  }

  const output = compiled.files?.[0]?.body ?? "[no output]"

  if (typeof expected !== "string" && "error" in expected) {
    if (errors.length > 0) {
      if (errors.length > 1) {
        return {
          type: "fail-error",
          result: "",
          expected: `Got more than one error but expected one:\n\n${errors
            .map((err) => err.description)
            .join("\n")}`,
          name,
          expectFail: props.expectFail ?? false,
          path,
        }
      } else {
        if (errors[0].description.includes(expected.error)) {
          return { type: "success" }
        } else {
          return {
            type: "fail-error",
            result: "",
            expected: `Got an error of the wrong type.

Wanted: ${expected.error}

Got: 

${errors[0].description}
`,
            name,
            expectFail: props.expectFail ?? false,
            path,
          }
        }
      }
    } else {
      return {
        type: "fail-no-error",
        result: "",
        expected: `Didn't get an error, but wanted: ${expected.error}`,
        name,
        expectFail: props.expectFail ?? false,
        path,
      }
    }
  }

  if (typeof expected === "string") {
    if (areOutputsEqual(output, expected)) {
      return { type: "success" }
    }
  } else {
    if (expected.files.length !== compiled.files?.length) {
      return {
        type: "fail",
        result:
          compiled.files
            ?.map(({ filePath: fileName }) => fileName)
            .join(", ") ?? "[no files]",
        expected: expected.files.map(({ fileName }) => fileName).join(", "),
        name,
        expectFail: props.expectFail ?? false,
        path,
      }
    }

    for (const expectedFile of expected.files) {
      let found = false

      for (const actualFile of compiled.files ?? []) {
        if (actualFile.filePath === expectedFile.fileName) {
          if (!areOutputsEqual(actualFile.body, expectedFile.expected)) {
            return {
              type: "fail",
              fileName: actualFile.filePath,
              result: normalize(actualFile.body),
              expected: normalize(expectedFile.expected),
              name,
              expectFail: props.expectFail ?? false,
              path,
            }
          }

          found = true
        }
      }

      if (!found) {
        return {
          type: "fail",
          result: `No file named ${
            expectedFile.fileName
          } was written.\n\nWritten files: ${compiled.files
            ?.map((f) => f.filePath)
            .join(", ")}`,
          expected: "",
          name,
          expectFail: props.expectFail ?? false,
          path,
        }
      }
    }

    return { type: "success" }
  }

  return {
    type: "fail",
    result: normalize(output),
    expected: normalize(expected),
    name,
    expectFail: props.expectFail ?? false,
    path,
  }
}

const getAllFiles = async (): Promise<{
  [key: string]: { path: string; content: any }
}> => {
  // __dirname allows this to either run via ts-node in developer mode or on CI with normal node
  // then __dirname will be within the js folder
  const basePath = path.join(__dirname, "..", "parse_node")
  const files = fs.readdirSync(basePath)
  const results: { [key: string]: any } = {}

  for (const fts of files) {
    const f = path.basename(fts)
    const ext = path.extname(fts)
    if (f === "index" || ext === ".map") {
      continue
    }

    let filePath = path.join(basePath, f)
    const obj = await import(filePath)

    results[f] = {
      content: obj,
      path: filePath,
    }
  }

  return results
}

export const runTests = async () => {
  let total = 0
  let tests: (Test & {
    testName: string
    fileName: string
    path: string
  })[] = []

  const everything = await getAllFiles()

  for (const [fileName, { path, content }] of Object.entries(everything)) {
    for (const [testName, testObj] of Object.entries(content)) {
      if (testName.startsWith("test")) {
        tests.push({ ...(testObj as any), testName, fileName, path })
      }
    }
  }

  tests =
    tests.filter((t) => t.only).length > 0 ? tests.filter((t) => t.only) : tests

  const failures: TestResultFail[] = []
  const start = new Date().getTime()

  for (const testObj of tests) {
    // mock out console.log to display logs nicer

    const logged: any[][] = []
    const oldConsoleLog = console.log
    console.log = (...args: any[]) => logged.push(args)
    const result = test(
      testObj,
      testObj.testName,
      testObj.fileName,
      testObj.path
    )
    console.log = oldConsoleLog

    total++
    if (
      result.type === "fail" ||
      result.type === "fail-error" ||
      result.type === "fail-no-error"
    ) {
      result.logs = logged
      failures.push(result)
    }
  }

  const elapsed = (new Date().getTime() - start) / 1000 + "s"

  if (failures.length === 0) {
    console.info(
      `All ${total} tests ` + chalk.green(`passed`) + ` in ${elapsed}!`
    )
  } else if (
    failures.length > 0 &&
    failures.filter((x) => x.expectFail).length === failures.length
  ) {
    console.info(total, "tests passed, in", elapsed)
    console.info("\nSome failed, but they were expected to fail:")
    console.info(failures.map((f) => "  " + f.name).join("\n"))
  } else {
    for (let {
      expected,
      name,
      result,
      logs,
      path,
      type,
      fileName,
    } of failures.filter((x) => !x.expectFail)) {
      const fileContents = fs.readFileSync(path, "utf-8")
      const lines = fileContents.split("\n")
      // Take a guess at line
      let line =
        (lines.findIndex((l) => l.includes(`export const ${name}`)) ?? -1) + 1

      console.info("=============================================")
      console.info(name, "failed:")
      console.info(
        `  in`,
        chalk.yellowBright(`${path}${line ? `:${line}:0` : ``}`)
      )
      console.info("=============================================\n")

      if (type === "fail-error") {
        console.info(expected + "\n")
      } else if (type === "fail-no-error") {
        console.info(expected + "\n")
      } else {
        if (fileName) {
          console.info(`${chalk.red("Expected")} (In file ${fileName}):`)
        } else {
          console.info(`${chalk.red("Expected")}`)
        }

        let str = ""

        for (let i = 0; i < expected.length; i++) {
          if (expected[i] !== result[i]) {
            if (expected[i].trim() === "") {
              str += `\x1b[41m${expected[i]}\x1b[0m`
            } else {
              str += `\x1b[31m${expected[i]}\x1b[0m`
            }
          } else {
            str += expected[i]
          }
        }

        console.info(
          str
            .split("\n")
            .map((x) => x + "\n")
            .join("")
        )
        console.info("\x1b[32mActual:\x1b[0m")
        console.info(
          result
            .split("\n")
            .map((x) => x + "\n")
            .join("")
        )
      }

      if (logs && logs.length > 0) {
        console.info("Logs:")

        for (const log of logs) {
          console.info(...log)
        }
      }
    }

    const failureCount = failures.filter((x) => !x.expectFail).length

    console.info("\n")
    console.info(
      "Failed",
      failureCount,
      failureCount > 1 ? "tests" : "test",
      "in",
      elapsed
    )
    process.exit(failureCount > 0 ? -1 : 0)
  }
}

void (async () => {
  try {
    await runTests()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
