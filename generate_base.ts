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

interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}

interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}

type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = undefined> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

${ArrayDefinition}
${PackedSceneDef}

declare const len: (obj: any[]) => number;
declare const range: (length: number) => number[];
declare const print: (...args: any[]) => void;
`;

export const buildBase = (basePath: string) => {
  fs.writeFileSync(path.join(basePath, "@base.d.ts"), baseFileContent);
}
