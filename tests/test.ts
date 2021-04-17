import * as ts from "typescript"
import { parseNode, ParseNodeType } from "../parse_node"
import { baseContentForTests } from "../generate_library_defs/generate_base"
import fs from "fs"
import path from "path"
import { Scope } from "../scope"
import chalk from "chalk"
import { TsGdError } from "../errors"

export const compileTs = (
  code: string,
  isAutoload: boolean
): { compiled: ParseNodeType; errors: TsGdError[] } => {
  const filename = isAutoload ? "autoload.ts" : "test.ts"

  const sourceFile = ts.createSourceFile(
    filename,
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )

  const libDTs = ts.createSourceFile(
    "lib.d.ts",
    baseContentForTests,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )

  const tsconfigOptions: ts.CompilerOptions = {
    strict: true,
  }

  const defaultCompilerHost = ts.createCompilerHost(tsconfigOptions)

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
    ["test.ts", "autoload.ts"],
    tsconfigOptions,
    customCompilerHost
  )

  let i = 0
  const errors: TsGdError[] = []

  // TODO: Make this less silly.
  const godotFile = parseNode(sourceFile, {
    indent: "",
    scope: new Scope(program),
    isConstructor: false,
    program,
    addError: (error) => errors.push(error),
    project: {
      buildDynamicDefinitions: async () => {},
      assets: [],
      program: undefined as any,
      compileAllSourceFiles: async () => {},
      shouldBuildLibraryDefinitions: () => false,
      validateAutoloads: () => [],
      buildLibraryDefinitions: async () => {},
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
      godotClasses: () => [],
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
      onAddAsset: async () => ({ result: null }),
      onChangeAsset: async () => {
        return { result: null }
      },
      onRemoveAsset: () => {},
      sourceFiles: () => [
        {
          exportedTsClassName: () => "",
          fsPath: "autoload.ts",
          isProjectAutoload: () => true,
          isAutoload: () => true,
          resPath: "",
          tsRelativePath: "",
          getEnumPath: () => "",
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
        {
          exportedTsClassName: () => "",
          fsPath: "test.ts",
          isProjectAutoload: () => false,
          resPath: "",
          gdPath: "",
          tsRelativePath: "",
          isAutoload: () => false,
          getEnumPath: () => "",
          gdContainingDirectory: "",
          destroy: () => {},
          project: {} as any,
          tsType: () => "",
          compile: async () => {},
          reload: () => {},
          ...({} as any),
        },
      ],
    },
    mostRecentControlStructureIsSwitch: false,
    isAutoload: false,
    usages: new Map(),
  })

  return { compiled: godotFile, errors }
}

export type Test = {
  expected: string
  ts: string
  expectedFiles?: { filename: string; content: string }[]

  isAutoload?: boolean
  only?: boolean
  expectFail?: boolean
}

type TestResult = TestResultPass | TestResultFail

type TestResultPass = { type: "success" }
type TestResultFail = {
  type: "fail" | "fail-error"
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
    .map((x) => x.trimRight())
    .filter((x) => x.trim() !== "")
    .join("\n")
}

const test = (
  props: Test,
  name: string,
  testFileName: string,
  path: string
): TestResult => {
  const { ts, expected } = props

  const { compiled, errors } = compileTs(ts, props.isAutoload ?? false)
  const output = compiled.content

  if (errors.length > 0) {
    return {
      type: "fail-error",
      result: "",
      expected: `Got an unexpected error:\n\n${errors
        .map((err) => err.description)
        .join("\n")}`,
      name,
      expectFail: props.expectFail ?? false,
      path,
    }
  }

  if (props.expectedFiles) {
    // Go into file comparison mode
    for (const { filename, content } of props.expectedFiles) {
      const match = (compiled.enums ?? []).find(
        (e) => e.name + ".gd" === filename
      )

      if (!match) {
        return {
          type: "fail",
          result: "",
          expected: `${filename} was not created.`,
          name,
          expectFail: props.expectFail ?? false,
          path: "[generated]/" + testFileName,
        }
      }

      if (trim(content) !== trim(match.content)) {
        return {
          type: "fail",
          result: content,
          expected: match.content,
          name,
          expectFail: props.expectFail ?? false,
          path: "[generated]/" + testFileName,
        }
      }
    }
  }

  if (trim(output) === trim(expected)) {
    return { type: "success" }
  }

  return {
    type: "fail",
    result: trim(output),
    expected: trim(expected),
    name,
    expectFail: props.expectFail ?? false,
    path,
  }
}

const getAllFiles = async (): Promise<{
  [key: string]: { path: string; content: any }
}> => {
  const files = fs.readdirSync("./parse_node")
  const results: { [key: string]: any } = {}

  for (const fts of files) {
    const f = path.basename(fts)

    if (f === "index") {
      continue
    }

    let relativePath = "./parse_node/" + f

    const obj = await import("./../parse_node/" + f)

    results[f] = {
      content: obj,
      path: path.resolve(relativePath),
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
    if (result.type === "fail" || result.type === "fail-error") {
      result.logs = logged
      failures.push(result)
    }
  }
  const elapsed = (new Date().getTime() - start) / 1000 + "s"

  if (failures.length === 0) {
    console.info("All", total, "tests passed!")
  } else if (
    failures.length > 0 &&
    failures.filter((x) => x.expectFail).length === failures.length
  ) {
    console.info(total, "tests passed, in", elapsed)
    console.info("\nSome failed, but they were expected to fail:")
    console.info(failures.map((f) => "  " + f.name).join("\n"))
  } else {
    for (let { expected, name, result, logs, path, type } of failures.filter(
      (x) => !x.expectFail
    )) {
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
      } else {
        console.info("\x1b[31mExpected:\x1b[0m")

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
    console.info("Failed", failureCount, failureCount > 1 ? "tests." : "test.")
  }
}

runTests()
