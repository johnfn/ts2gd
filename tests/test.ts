import fs from "fs"
import path from "path"

import chalk from "chalk"
import { diffChars } from "diff"
import * as utils from "tsutils"
import ts from "typescript"

import { TsGdError, __getErrorsTestOnly } from "../errors"
import { baseContentForTests } from "../generate_library_defs/generate_base"
import { ParseNodeType, parseNode } from "../parse_node"
import { Scope } from "../scope"

import { createStubSourceFileAsset } from "./stubs"

export const compileTs = (code: string, isAutoload: boolean): ParseNodeType => {
  const filename = isAutoload ? "autoload.ts" : "Test.ts"

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
      if (name === filename) {
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
    ["Test.ts", "autoload.ts"],
    tsconfigOptions,
    customCompilerHost
  )

  const sourceFileAsset = createStubSourceFileAsset("Test")

  // TODO: Make this less silly.
  // I suppose we could actually use the example project
  const godotFile = parseNode(sourceFile, {
    indent: "",
    sourceFile: sourceFile,
    scope: new Scope(program),
    isConstructor: false,
    program,
    isMainClass: false,
    project: {
      args: {
        buildLibraries: false,
        buildOnly: false,
        printVersion: false,
        debug: false,
        help: false,
        init: false,
      },
      buildDynamicDefinitions: async () => {},
      assets: [],
      program: undefined as any,
      compileAllSourceFiles: async () => true,
      shouldBuildLibraryDefinitions: () => false,
      validateAutoloads: () => [],
      buildLibraryDefinitions: async () => {},
      paths: {} as any,
      definitionBuilder: {} as any,
      mainScene: {
        fsPath: "",
        resPath: "",
        nodes: [],
        resources: [],
        name: "mainScene",
        project: {} as any,
        rootNode: {} as any,
      } as any,
      godotScenes: () => [],
      createAsset: () => 0 as any,
      godotFonts: () => [],
      godotImages: () => [],
      godotGlbs: () => [],
      godotProject: {
        fsPath: "",
        autoloads: [{ resPath: "autoload.ts" }],
        mainScene: {} as any,
        rawConfig: 0 as any,
        actionNames: [],
        project: {} as any,
        addAutoload: {} as any,
        removeAutoload: {} as any,
      },
      monitor: () => 0 as any,
      onAddAsset: async () => "",
      onChangeAsset: async () => "",
      onRemoveAsset: async () => {},
      sourceFiles: () => [
        {
          exportedTsClassName: () => "",
          fsPath: "autoload.ts",
          isProjectAutoload: () => true,
          isAutoload: () => true,
          resPath: "",
          tsRelativePath: "",
          gdContainingDirectory: "",
          destroy: () => {},
          project: {} as any,
          tsType: () => "",
          compile: async () => {},
          gdPath: "",
          reload: () => {},
          isDecoratedAutoload: {} as any,
          ...({} as any), // ssh about private properties.
        },
        sourceFileAsset,
      ],
    },
    sourceFileAsset: sourceFileAsset,
    mostRecentControlStructureIsSwitch: false,
    isAutoload: false,
    usages: utils.collectVariableUsage(sourceFile),
  })

  return godotFile
}

type TestCaseConfig = {
  name: string
  typescript?: string
  gdscript?: string
  error?: string
  skip?: string
}

export class TestCase {
  readonly input: string
  readonly expected: string | { type: "error"; error: string } = ""
  readonly sourcePath: string
  readonly name: string
  private _isAutoload = false
  private _skipped = ""
  constructor(sourcePath: string, config: TestCaseConfig) {
    this.sourcePath = sourcePath
    this.name = config.name
    if (config.typescript) {
      this.input = normalize(config.typescript)
      this._isAutoload = this.input.includes("@autoload")
    } else {
      this.input = ""
    }
    if (config.gdscript !== undefined) {
      this.expected = normalize(config.gdscript)
    }
    if (config.error !== undefined) {
      this.expected = { type: "error", error: config.error }
    }
    if (config.skip !== undefined) {
      this._skipped = config.skip
    }
  }
  /*
  Create a list of test cases from markdown file. Markdown file format:
  ~~~markdown
  This file contains multiple test cases. Every text, ecept `### test-name`, 
  `typescript` block, `gdscript` block, `error` block and `skip` block are
  stripped.

  Lets write our first test case:

  ### test-name: some-test-that-should-pass
  ```typescript
  // source type script, all comments are stripped during validation
  let a = 2 + 3;
  ```
  ```gdscript
  # expected output, all comments are stripped during validation
  var a = 2 + 3
  ```

  ### test-name: some-test-that-should-fail
  ```typescript
  // source type script, all comments are stripped during validation
  let a = 2 + 3;
  ```
  ```error
  // expected error, all comments are stripped during validation
  Expected an error here.
  ```

  ### test-name: some-test-that-should-be-skipped
  ```skip
  This test is skipped because it is not implemented yet.
  ```
  ~~~markdown
  */
  static fromMarkdownContent(markdownFilePath: string): TestCase[] {
    const content = fs.readFileSync(markdownFilePath, "utf-8")
    let args: null | TestCaseConfig = null
    let currentBlock:
      | ""
      | "markdown"
      | "typescript"
      | "gdscript"
      | "error"
      | "skip" = ""
    let tests: TestCase[] = []
    let lineNumber = 0
    let testLineNumber = 0
    for (const line of content.split("\n")) {
      lineNumber += 1
      if (line.startsWith("~~~markdown") && currentBlock === "markdown") {
        currentBlock = ""
        continue
      } else if (line.startsWith("~~~markdown")) {
        currentBlock = "markdown"
        continue
      } else if (currentBlock === "markdown") {
        continue
      } else if (line.startsWith("### test-name:")) {
        if (args) {
          tests.push(
            new TestCase(`${markdownFilePath}:${testLineNumber}`, args)
          )
          args = null
        }
        testLineNumber = lineNumber
        args = {
          name: "",
          typescript: "",
        }
        args.name = line.replace("### test-name:", "").trim()
      } else if (line.startsWith("```") && !args) {
        console.error(
          `Invalid test format at line ${lineNumber} in ${markdownFilePath}, expected '### test-name:' block`
        )
        return tests
      } else if (line.startsWith("```typescript")) {
        currentBlock = "typescript"
      } else if (line.startsWith("```gdscript")) {
        currentBlock = "gdscript"
      } else if (line.startsWith("```error")) {
        currentBlock = "error"
      } else if (line.startsWith("```skip")) {
        currentBlock = "skip"
      } else if (line.trim() === "```") {
        currentBlock = ""
      } else if (currentBlock) {
        if (args != null) {
          if (args[currentBlock] === undefined) {
            args[currentBlock] = ""
          }
          args[currentBlock] += line + "\n"
        } else {
          console.warn(
            `Invalid test format at line ${lineNumber} in ${markdownFilePath}`
          )
        }
      }
    }
    if (args) {
      tests.push(new TestCase(`${markdownFilePath}:${testLineNumber}`, args))
    }
    return tests
  }
  get isAutoload() {
    return this._isAutoload
  }
  get skipped(): string {
    return this._skipped
  }
}

type TestResult = TestResultPass | TestResultFail

type TestResultPass = { type: "success" }
type TestResultFail = {
  type: "fail" | "fail-error" | "fail-no-error"
  result: string
  name: string
  expected: string
  expectFail?: boolean
  path: string
  logs?: any[][]
}

const trim = (s: string) => {
  return s
    .split("\n")
    .map((x) => x.trimEnd())
    .filter((x) => x.trim() !== "")
    .join("\n")
}

const removeCommentLines = (s: string) => {
  return s
    .split("\n")
    .map((x) => x.replace(/^\s*#.*$/, ""))
    .map((x) => x.replace(/^\s*\/\/.*$/, ""))
    .filter((x) => x.trim() !== "")
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

const runTest = (
  testCase: TestCase,
  allowSkip = true
  // name: string,
  // testFileName: string,
  // path: string
): TestResult => {
  if (testCase.skipped) {
    return {
      type: "fail-no-error",
      result: "",
      expected: `Skipped test because: ${testCase.skipped}`,
      name: testCase.name,
      expectFail: allowSkip,
      path: testCase.sourcePath,
    }
  }
  const { input: ts, expected } = testCase
  let compiled: ParseNodeType | null = null
  let errors: TsGdError[] = []

  try {
    compiled = compileTs(ts, testCase.isAutoload ?? false)

    errors = __getErrorsTestOnly()
  } catch (e) {
    return {
      type: "fail",
      result: `Threw the following error: ${(e as any).stack}`,
      expected: `No errors`,
      name: testCase.name,
      expectFail: !!testCase.skipped && allowSkip,
      path: testCase.sourcePath,
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
          name: testCase.name,
          expectFail: !!testCase.skipped && allowSkip,
          path: testCase.sourcePath,
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
            name: testCase.name,
            expectFail: !!testCase.skipped && allowSkip,
            path: testCase.sourcePath,
          }
        }
      }
    } else {
      return {
        type: "fail-no-error",
        result: "",
        expected: `Didn't get an error, but wanted: ${expected.error}`,
        name: testCase.name,
        expectFail: !!testCase.skipped && allowSkip,
        path: testCase.sourcePath,
      }
    }
  } else {
    if (errors.length > 0) {
      // Need to check if errors occured otherwise some passing tests are false positive

      return {
        type: "fail-error",
        result: "",
        expected: `Expected a string value but got an error:\n\n${errors
          .map((err) => err.description)
          .join("\n")}`,
        name: testCase.name,
        expectFail: !!testCase.skipped && allowSkip,
        path: testCase.sourcePath,
      }
    }

    if (areOutputsEqual(output, expected)) {
      return { type: "success" }
    }
  }

  return {
    type: "fail",
    result: normalize(output),
    expected: normalize(expected),
    name: testCase.name,
    expectFail: !!testCase.skipped && allowSkip,
    path: testCase.sourcePath,
  }
}

const loadTestCases = (): TestCase[] => {
  // __dirname allows this to either run via ts-node in developer mode or on CI with normal node
  // then __dirname will be within the js folder
  const basePath = path.join(__dirname, "..", "test_cases")
  return fs
    .readdirSync(basePath)
    .filter((f) => f.endsWith(".md"))
    .map((f) => TestCase.fromMarkdownContent(path.join(basePath, f)))
    .flat()
}

function stringVisibleLength(str: string): number {
  // Remove ANSI escape codes
  // eslint-disable-next-line no-control-regex
  const ansiRegex = /\x1b\[[0-9;]*m/g
  const clean = str.replace(ansiRegex, "")
  // Count Unicode grapheme clusters (for emoji, etc.)
  return Array.from(clean).length
}

export const runTests = async () => {
  let total = 0
  const tests = loadTestCases()
  const failures: TestResultFail[] = []
  const start = new Date().getTime()

  for (const testCase of tests) {
    // mock out console.log to display logs nicer

    const logged: any[][] = []
    const oldConsoleLog = console.log
    console.log = (...args: any[]) => logged.push(args)
    const args = process.argv.slice(2)
    const noSkip = args.includes("no-skip")
    const result = runTest(testCase, !noSkip)
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
    console.info("\nUse 'npm test -- no-skip' to run all tests")
  } else {
    for (let { expected, name, result, logs, path, type } of failures.filter(
      (x) => !x.expectFail
    )) {
      const header = ` ${chalk.whiteBright(name)} ${chalk.red("failed")}:`
      const footer = `    in ${chalk.yellowBright(path)}`
      const delim = "=".repeat(
        1 + Math.max(stringVisibleLength(header), stringVisibleLength(footer))
      )
      console.info(delim)
      console.info(header)
      console.info(footer)
      console.info(delim)
      console.log("")

      if (type === "fail-error") {
        console.info(expected + "\n")
      } else if (type === "fail-no-error") {
        console.info(expected + "\n")
      } else {
        console.info(`${chalk.red("Expected")}:\n`)
        console.log(
          diffChars(result, expected)
            .map((part) =>
              part.added
                ? chalk.whiteBright(part.value)
                : part.removed
                ? ""
                : part.value
            )
            .join("")
        )
        console.log("")
        console.info(`${chalk.blue("Result")}:\n`)
        console.log(
          diffChars(result, expected)
            .map((part) =>
              part.added
                ? ""
                : part.removed
                ? chalk.whiteBright(part.value)
                : part.value
            )
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
