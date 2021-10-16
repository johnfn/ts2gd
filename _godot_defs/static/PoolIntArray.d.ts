
/**
 * An [Array] specifically designed to hold integer values ([int]). Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
 * **Note:** This type is limited to signed 32-bit integers, which means it can only take values in the interval `[-2^31, 2^31 - 1]`, i.e. `[-2147483648, 2147483647]`. Exceeding those bounds will wrap around. In comparison, [int] uses signed 64-bit integers which can hold much larger values.
 *
*/
declare class PoolIntArray {

  
/**
 * An [Array] specifically designed to hold integer values ([int]). Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
 * **Note:** This type is limited to signed 32-bit integers, which means it can only take values in the interval `[-2^31, 2^31 - 1]`, i.e. `[-2147483648, 2147483647]`. Exceeding those bounds will wrap around. In comparison, [int] uses signed 64-bit integers which can hold much larger values.
 *
*/

  constructor(from: any[]);
  static "new"(): PoolIntArray;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(integer: int): any;

/** Appends a [PoolIntArray] at the end of this array. */
append_array(array: PoolIntArray): any;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Inserts a new int at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, integer: int): int;

/** Reverses the order of the elements in the array. */
invert(): any;

/** Appends a value to the array. */
push_back(integer: int): any;

/** Removes an element from the array by index. */
remove(idx: int): any;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): any;

/** Changes the int at the given index. */
set(idx: int, integer: int): any;

/** Returns the array size. */
size(): int;

  // connect<T extends SignalsOf<PoolIntArray>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PoolIntArraySignals>>(signal: T, method: SignalFunction<PoolIntArraySignals[T]>): number;




}

declare class PoolIntArraySignals {
  
}
