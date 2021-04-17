import fs from "fs"
import path from "path"
import { ArrayDefinition } from "./custom_defs/array_def"
import { DictionaryDefinition } from "./custom_defs/dictionary_def"
import { PackedSceneDef } from "./custom_defs/packed_scene_def"
import { TsGdProjectClass } from "../project/project"

export const baseFileContent = `

declare interface Boolean {

}

declare interface CallableFunction { };

interface Function {

}

declare function exports(target: Node, name: string): void;
declare function autoload(target: typeof Node): void

declare type int = number;
declare type float = number;

declare function int(x: number): number
declare function float(x: number): number

// Used for typing connect()
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
type SignalsOf<T> = KeysMatching<T, Signal<any>>;
type SignalFunction<T> = T extends Signal<infer R> ? R : never;

interface FunctionConstructor {
  (...args: string[]): Function;
}

interface IArguments {

}

declare const Yield: <A extends Object, T extends SignalsOf<A>>(node: A, name: T) => void;

interface NewableFunction {

}

interface Number {

}

interface String {
  [Symbol.iterator](): IterableIterator<string>;
}

interface RegExp {

}

// This puts Dictionary methods on *all* classes, which is incorrect and also
// causes clashes with Node because they have differenty defined duplicate
// methods.
// interface Object extends Dictionary { }

declare function Dict<T>(obj: T): Dictionary & T

interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}

interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}

declare const print: (...args: any[]) => void;

type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = undefined> extends Object {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;

  completed: Signal<any>;
}

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;

  // Generator functions found on GDScriptFunctionState

  is_valid(extended_check: bool = false);
  resume(arg?: any);
}

${ArrayDefinition}
${DictionaryDefinition}
${PackedSceneDef}

declare class Signal<T extends (...args: any[]) => any> {
  /** Don't use this - it's only to get typechecking working! */
  private __unused: T;
}
`

export const buildBase = () => {
  fs.writeFileSync(
    path.join(TsGdProjectClass.Paths.staticGodotDefsPath, "@base.d.ts"),
    baseFileContent
  )
}

export const baseContentForTests = `
${baseFileContent}
interface Vector2 {}
interface Vector3 {}
interface Vector2i {}
interface Vector3i {}
`
