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

// Contents of these two interfaces were copied from FuncRef.d.ts

declare interface CallableFunction { 
  /** The name of the referenced function. */
  function: string

  /** Calls the referenced function previously set in [member function] or [method @GDScript.funcref]. */
  call_func(...args: any[]): any

  /** Calls the referenced function previously set in [member function] or [method @GDScript.funcref]. Contrarily to [method call_func], this method does not support a variable number of arguments but expects all parameters to be passed via a single [Array]. */
  call_funcv(arg_array: any[]): any

  /** Returns whether the object still exists and has the function assigned. */
  is_valid(): boolean

  /** The object containing the referenced function. This object must be of a type actually inheriting from [Object], not a built-in type such as [int], [Vector2] or [Dictionary]. */
  set_instance(instance: Object): void

  rpc<T extends (...args: any[]) => void>(this: T, ...args: Parameters<T>): void;

  rpc_id<T extends (...args: any[]) => void>(this: T, id: int, ...args: Parameters<T>): void;
}

interface Function {
  /** The name of the referenced function. */
  function: string;

  /** Calls the referenced function previously set in [member function] or [method @GDScript.funcref]. */
  call_func(...args: any[]): any;

  /** Calls the referenced function previously set in [member function] or [method @GDScript.funcref]. Contrarily to [method call_func], this method does not support a variable number of arguments but expects all parameters to be passed via a single [Array]. */
  call_funcv(arg_array: any[]): any;

  /** Returns whether the object still exists and has the function assigned. */
  is_valid(): boolean;

  /** The object containing the referenced function. This object must be of a type actually inheriting from [Object], not a built-in type such as [int], [Vector2] or [Dictionary]. */
  set_instance(instance: Object): void;
}

declare function exports(target: Node, name: string): void;
declare function autoload(target: typeof Node): void

declare type int = number;
declare type float = number;

declare function int(x: number): number
declare function float(x: number): number

declare type NodePathType = string

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * From T, pick a set of properties whose keys are in the union K
 */
 type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type GeneratorReturnType<T extends Generator> = T extends Generator<any, infer R, any> ? R: never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// Used for typing connect()
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type KeysOnly<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] }
type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
type SignalsOf<T> = KeysMatching<T, Signal<any>>;
type SignalFunction<T> = T extends Signal<infer R> ? R : never;
type SignalReturnValue<T> = T extends Signal<infer U> ? ReturnType<U> : never;

// Used for typing rpc(), rpc_id() etc
type FunctionsOf<T> = KeysMatching<T, Function>;

interface FunctionConstructor {
  (...args: string[]): Function;
}

interface IArguments {

}

declare const Yield: <T, U extends keyof T> (obj: KeysOnly<T, Signal<any>>, name: U) => void;
declare const y: <T, U extends keyof T> (obj: KeysOnly<T, Signal<any>>, name: U) => SignalReturnValue<T[U]>;

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

declare function Dict<T>(obj: T): Dictionary<string, any> & T

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

  $completed: Signal<() => TReturn>;
}

interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return(value: TReturn): IteratorResult<T, TReturn>;
  throw(e: any): IteratorResult<T, TReturn>;
  [Symbol.iterator](): Generator<T, TReturn, TNext>;

  $completed: Signal<() => TReturn>;
}

interface Symbol { }

interface SymbolConstructor {
  /**
   * A method that returns the default iterator for an object. Called by the semantics of the
   * for-of statement.
   */
  readonly iterator: symbol;
}

declare var Symbol: SymbolConstructor;

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;

  // Generator functions found on GDScriptFunctionState

  is_valid(extended_check: boolean): boolean;
  resume(arg?: any): void;
}

${array_def_1.ArrayDefinition}
${dictionary_def_1.DictionaryDefinition}
${packed_scene_def_1.PackedSceneDef}

declare class Signal<T extends (...args: any[]) => any = () => void> {
  /** This lets us yield* this signal. */
  [Symbol.iterator](): Generator<T, ReturnType<T>, any>;

  /** Connect a callback to this signal. */
  connect(callback: T): void

  /** Emit this signal. */
  emit(...args: Parameters<T>): void;
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