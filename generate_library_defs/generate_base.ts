import fs from "fs"
import path from "path"

import { Paths } from "../project"

import { ArrayDefinition } from "./custom_defs/array_def"
import { DictionaryDefinition } from "./custom_defs/dictionary_def"
import { PackedSceneDef } from "./custom_defs/packed_scene_def"

export const baseFileContent = `

declare interface Boolean {

}

// These are the 4 constants found in @GDScript.xml

/**
 * Positive floating-point infinity. This is the result of floating-point
 * division when the divisor is [code]0.0[/code]. For negative infinity, use
 * [code]-INF[/code]. Dividing by [code]-0.0[/code] will result in negative
 * infinity if the numerator is positive, so dividing by [code]0.0[/code] is not
 * the same as dividing by [code]-0.0[/code] (despite [code]0.0 == -0.0[/code]
 * returning [code]true[/code]).
 *
 * [b]Note:[/b] Numeric infinity is only a concept with floating-point numbers,
 * and has no equivalent for integers.  Dividing an integer number by
 * [code]0[/code] will not result in [constant INF] and will result in a
 * run-time error instead.
 */
declare const INF: float;

/**
 * Constant that represents how many times the diameter of a circle fits around
 * its perimeter. This is equivalent to [code]TAU / 2[/code].
 */
declare const PI: float;

/**
 * The circle constant, the circumference of the unit circle in radians. This is
 * equivalent to [code]PI * 2[/code], or 360 degrees in rotations.
 */
declare const TAU: float;

/**
 * "Not a Number", an invalid floating-point value. [constant NAN] has special
 * properties, including that it is not equal to itself ([code]NAN == NAN[/code]
 * returns [code]false[/code]). It is output by some invalid operations, such as
 * dividing floating-point [code]0.0[/code] by [code]0.0[/code].
 *
 * [b]Note:[/b] "Not a Number" is only a concept with floating-point numbers,
 * and has no equivalent for integers. Dividing an integer [code]0[/code] by
 * [code]0[/code] will not result in [constant NAN] and will result in a
 * run-time error instead.
 */
declare const NAN: float;

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

declare enum ExportHint {
  RANGE,
  EXP,
  FILE,
  DIR,
  GLOBAL,
  MULTILINE,
  EASE,
  RGB,
  RGBA,
  FLAGS,
  LAYERS_2D_PHYSICS,
  LAYERS_2D_RENDER,
  LAYERS_3D_PHYSICS,
  LAYERS_3D_RENDER
}

declare function exports(...args: (ExportHint | string | number)[]): (target: Node, name: string) => void;
declare function exports(target: Node, name: string): void;
declare const export_flags: (...flags: any[]) => (target: Node, name: string) => void
declare function autoload(target: typeof Node): void
declare function tool(target: typeof Node): void;

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

${ArrayDefinition}
${DictionaryDefinition}
${PackedSceneDef}

declare class Signal<T extends (...args: any[]) => any = () => void> {
  /** This lets us yield* this signal. */
  [Symbol.iterator](): Generator<T, ReturnType<T>, any>;

  /** Connect a callback to this signal. */
  connect(callback: T): void

  /** Emit this signal. */
  emit(...args: Parameters<T>): void;
}
`

export default function writeBaseDefinitions(paths: Paths) {
  fs.writeFileSync(
    path.join(paths.staticGodotDefsPath, "@base.d.ts"),
    baseFileContent
  )
}

export function baseContentForTests() {
  return `
${fs.readFileSync(
  path.join(process.cwd(), "_godot_defs", "static", "Vector2.d.ts")
)}
${fs.readFileSync(
  path.join(process.cwd(), "_godot_defs", "static", "Vector3.d.ts")
)}
${baseFileContent}
`
}
