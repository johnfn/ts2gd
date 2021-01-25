
/**
 * An [Array] specifically designed to hold floating-point values ([float]). Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/
declare class PoolRealArray {

  
/**
 * An [Array] specifically designed to hold floating-point values ([float]). Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/

  constructor(from: any[]);
  static "new"(): PoolRealArray;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(value: float): any;

/** Appends a [PoolRealArray] at the end of this array. */
append_array(array: PoolRealArray): any;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, value: float): int;

/** Reverses the order of the elements in the array. */
invert(): any;

/** Appends an element at the end of the array. */
push_back(value: float): any;

/** Removes an element from the array by index. */
remove(idx: int): any;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): any;

/** Changes the float at the given index. */
set(idx: int, value: float): any;

/** Returns the size of the array. */
size(): int;

  connect<T extends SignalsOf<PoolRealArray>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
