import fs from 'fs';
import path from 'path';
import { ArrayDefinition } from './custom_defs/array_def';
import { PackedSceneDef } from './custom_defs/packed_scene_def';

const baseFileContent = `
declare interface Boolean {

}

declare interface CallableFunction { };

interface Function {

}
interface FunctionConstructor {
  (...args: string[]): Function;
}

interface IArguments {

}

interface NewableFunction {

}

interface Number {

}

interface RegExp {

}

interface Object extends Dictionary {}

${ArrayDefinition}
${PackedSceneDef}

declare const len: (obj: any[]) => number;
declare const range: (length: number) => number[];
declare const print: (...args: any[]) => void;
`;

export const buildBase = (basePath: string) => {
  fs.writeFileSync(path.join(basePath, "@base.d.ts"), baseFileContent);
}
