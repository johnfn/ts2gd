import * as ts from "typescript";
import { parseNode } from "./parse_node";
import { baseContentForTests } from "./generate_base";
import fs from 'fs';
import path from 'path';

export const compileTs = (code: string) => {
  const filename = "test.ts";

  const sourceFile = ts.createSourceFile(
    filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS
  );

  const libDTs = ts.createSourceFile(
    "lib.d.ts", baseContentForTests, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS
  );

  const defaultCompilerHost = ts.createCompilerHost({});

  const customCompilerHost: ts.CompilerHost = {
    getSourceFile: (name, languageVersion) => {
      if (name === filename) {
        return sourceFile;
      } else if (name === 'lib.d.ts') {
        return libDTs;
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
type TestResultFail = { type: 'fail'; result: string; name: string; expected: string; expectFail?: boolean; fileName: string; logs?: any[][] };

const trim = (s: string) => {
  return s.split('\n').map(x => x.trimRight()).filter(x => x.trim() !== '').join('\n');
}

const test = (props: Test, name: string, fileName: string): TestResult => {
  const { ts, expected } = props;

  const output = compileTs(ts);

  if (trim(output) === trim(expected)) {
    return { type: 'success' }
  }

  return {
    type: 'fail',
    result: trim(output),
    expected: trim(expected),
    name,
    expectFail: props.expectFail ?? false,
    fileName,
  };
}

const getAllFiles = async () => {
  const files = fs.readdirSync('./parse_node');
  const results: { [key: string]: any } = {};

  for (const fts of files) {
    const f = path.basename(fts);

    if (f === 'index') { continue; }

    const obj = await import('./parse_node/' + f);

    results[f] = obj;
  }

  return results;
}

export const runTests = async () => {
  let total = 0;
  let tests: (Test & { testName: string; fileName: string })[] = [];

  const everything = await getAllFiles()

  for (const [fileName, mod] of Object.entries(everything)) {
    for (const [testName, testObj] of Object.entries(mod)) {
      if (testName.startsWith('test')) {
        tests.push({ ...(testObj as any), testName, fileName });
      }
    }
  }

  tests = tests.filter(t => t.only).length > 0 ? tests.filter(t => t.only) : tests;

  const failures: TestResultFail[] = [];

  for (const testObj of tests) {
    // mock out console.log to display logs nicer

    const logged: any[][] = [];
    const oldConsoleLog = console.log
    console.log = (...args: any[]) => logged.push(args);
    const result = test(testObj, testObj.testName, testObj.fileName);
    console.log = oldConsoleLog;

    total++;
    if (result.type === 'fail') {
      result.logs = logged;
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

    for (let { expected, name, result, fileName, logs } of failures.filter(x => !x.expectFail)) {
      console.log('=============================================');
      console.log(name, 'failed:');
      console.log('  in', `./parse_node/${fileName}`);
      console.log('=============================================\n');
      console.log('\x1b[31mExpected:\x1b[0m');

      let str = '';

      for (let i = 0; i < expected.length; i++) {
        if (expected[i] !== result[i]) {
          if (expected[i].trim() === '') {
            str += `\x1b[41m${expected[i]}\x1b[0m`
          } else {
            str += `\x1b[31m${expected[i]}\x1b[0m`
          }
        } else {
          str += expected[i];
        }
      }

      console.log(str.split('\n').map(x => '  ' + x + '\n').join(''));
      console.log('\x1b[32mActual:\x1b[0m');
      console.log(result.split('\n').map(x => '  ' + x + '\n').join(''));

      if (logs) {
        console.log('Logs:')

        for (const log of logs) {
          console.log(...log);
        }
      }
    }
  }
};

runTests();