import * as ts from "typescript";
import * as everything from './parse_node/'
import { parseNode } from "./parse_node";

export const compileTs = (code: string) => {
  const filename = "test.ts";

  const sourceFile = ts.createSourceFile(
    filename, code, ts.ScriptTarget.Latest, true
  );

  const defaultCompilerHost = ts.createCompilerHost({});

  const customCompilerHost: ts.CompilerHost = {
    getSourceFile: (name, languageVersion) => {
      if (name === filename) {
        return sourceFile;
      } else {
        return defaultCompilerHost.getSourceFile(
          name, languageVersion
        );
      }
    },
    writeFile: (filename, data) => { },
    getDefaultLibFileName: () => "lib.d.ts",
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: filename => filename,
    getCurrentDirectory: () => "",
    getNewLine: () => "\n",
    getDirectories: () => [],
    fileExists: () => true,
    readFile: () => "",
    getSourceFileByPath: (filename, path, languageVersion) => {
      return defaultCompilerHost.getSourceFile(
        filename, languageVersion
      );
    }
  };

  const program = ts.createProgram(
    ["test.ts"], {}, customCompilerHost
  );

  const godotFile = parseNode(sourceFile, {
    indent: "",
    isConstructor: false,
    program,
    project: {
      assets: [],
      mainScene: { fsPath: "", resPath: "" },
      scenes: [],
      sourceFiles: [],
      sourcePath: '',
      tsgdPath: '',
      tsgdPathWithFilename: '',
    },
    mostRecentControlStructureIsSwitch: false,
    isAutoload: false,
    usages: new Map(),
  });

  return godotFile.content;
};

export type Test = {
  ts: string;
  expected: string;
  only?: boolean;
  expectFail?: boolean;
}

type TestResult =
  | TestResultPass
  | TestResultFail;

type TestResultPass = { type: 'success' };
type TestResultFail = { type: 'fail'; result: string; name: string; expected: string; expectFail?: boolean };

const test = (props: Test, name: string): TestResult => {
  const { ts, expected } = props;

  const output = compileTs(ts);

  if (output.trim() === expected.trim()) {
    return { type: 'success' }
  }

  return {
    type: 'fail',
    result: output,
    expected,
    name,
    expectFail: props.expectFail ?? false,
  };
}

export const runTests = () => {
  let total = 0;

  let tests: (Test & { name: string })[] = [];

  for (const [name, mod] of Object.entries(everything)) {
    for (const [testName, testObj] of Object.entries(mod)) {
      if (testName.startsWith('test')) {
        tests.push({ ...testObj, name: testName });
      }
    }
  }

  tests = tests.filter(t => t.only).length > 0 ? tests.filter(t => t.only) : tests;

  const failures: TestResultFail[] = [];

  for (const testObj of tests) {
    const result = test(testObj, testObj.name);

    total++;
    if (result.type === 'fail') {
      failures.push(result);
    }
  }

  if (failures.length === 0) {
    console.log('All', total, 'tests passed!');
  } else if (failures.length > 0 && failures.filter(x => x.expectFail).length === failures.length) {
    console.log(total, 'tests passed!\n');
    console.log('Some failed, but they were expected to fail:');
    console.log(failures.map(f => '  ' + f.name).join('\n'))
  } else {
    console.log('Failed', failures.length, 'tests.\n\n');

    for (const { expected, name, result } of failures) {
      console.log('=============================================');
      console.log(name, 'failed:');
      console.log('=============================================\n');
      console.log('\x1b[31mExpected:\x1b[0m');
      console.log(expected.split('\n').map(x => '  ' + x + '\n').join(''));
      console.log('\x1b[32mActual:\x1b[0m');
      console.log(result.split('\n').map(x => '  ' + x + '\n').join(''));
    }
  }
};

runTests();