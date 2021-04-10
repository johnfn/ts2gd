"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseContentForTests = exports.buildBase = exports.baseFileContent = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const array_def_1 = require("./custom_defs/array_def");
const dictionary_def_1 = require("./custom_defs/dictionary_def");
const packed_scene_def_1 = require("./custom_defs/packed_scene_def");
const project_1 = require("../project/project");
exports.baseFileContent = `

declare interface Boolean {

}

declare interface CallableFunction { };

interface Function {

}

declare function exports(target: Node, name: string): void;
declare function autoload(target: typeof Node): void

declare type int = number;
declare type float = number;

// Used for typing connect()
type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
type SignalsOf<T> = KeysMatching<T, Signal<any>>;
type SignalArguments<T> = T extends Signal<infer R> ? R : any;

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

${array_def_1.ArrayDefinition}
${dictionary_def_1.DictionaryDefinition}
${packed_scene_def_1.PackedSceneDef}

declare class Signal<T extends any[]> {
  /** Don't use this - it's only to get typechecking working! */
  private __unused: T;
}
`;
const buildBase = () => {
    fs_1.default.writeFileSync(path_1.default.join(project_1.TsGdProjectClass.Paths.staticGodotDefsPath, "@base.d.ts"), exports.baseFileContent);
};
exports.buildBase = buildBase;
exports.baseContentForTests = `
${exports.baseFileContent}
interface Vector2 {}
interface Vector3 {}
interface Vector2i {}
interface Vector3i {}
`;
//# sourceMappingURL=generate_base.js.map