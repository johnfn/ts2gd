
/**
 * Base class for any object that keeps a reference count. [Resource] and many other helper objects inherit this class.
 *
 * Unlike other [Object] types, References keep an internal reference counter so that they are automatically released when no longer in use, and only then. References therefore do not need to be freed manually with [method Object.free].
 *
 * In the vast majority of use cases, instantiating and using [Reference]-derived types is all you need to do. The methods provided in this class are only for advanced users, and can cause issues if misused.
 *
 * **Note:** In C#, references will not be freed instantly after they are no longer in use. Instead, garbage collection will run periodically and will free references that are no longer in use. This means that unused references will linger on for a while before being removed.
 *
*/
declare class Reference extends Object {

  
/**
 * Base class for any object that keeps a reference count. [Resource] and many other helper objects inherit this class.
 *
 * Unlike other [Object] types, References keep an internal reference counter so that they are automatically released when no longer in use, and only then. References therefore do not need to be freed manually with [method Object.free].
 *
 * In the vast majority of use cases, instantiating and using [Reference]-derived types is all you need to do. The methods provided in this class are only for advanced users, and can cause issues if misused.
 *
 * **Note:** In C#, references will not be freed instantly after they are no longer in use. Instead, garbage collection will run periodically and will free references that are no longer in use. This means that unused references will linger on for a while before being removed.
 *
*/
  "new"(): Reference;
  static "new"(): Reference;




/**
 * Initializes the internal reference counter. Use this only if you really know what you are doing.
 *
 * Returns whether the initialization was successful.
 *
*/
init_ref(): boolean;

/**
 * Increments the internal reference counter. Use this only if you really know what you are doing.
 *
 * Returns `true` if the increment was successful, `false` otherwise.
 *
*/
reference(): boolean;

/**
 * Decrements the internal reference counter. Use this only if you really know what you are doing.
 *
 * Returns `true` if the decrement was successful, `false` otherwise.
 *
*/
unreference(): boolean;

  // connect<T extends SignalsOf<Reference>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ReferenceSignals>>(signal: T, method: SignalFunction<ReferenceSignals[T]>): number;




}

declare class ReferenceSignals extends ObjectSignals {
  
}
