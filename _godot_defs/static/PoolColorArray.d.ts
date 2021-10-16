
/**
 * An [Array] specifically designed to hold [Color]. Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/
declare class PoolColorArray {

  
/**
 * An [Array] specifically designed to hold [Color]. Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/

  constructor(from: any[]);
  static "new"(): PoolColorArray;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(color: Color): any;

/** Appends a [PoolColorArray] at the end of this array. */
append_array(array: PoolColorArray): any;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, color: Color): int;

/** Reverses the order of the elements in the array. */
invert(): any;

/** Appends a value to the array. */
push_back(color: Color): any;

/** Removes an element from the array by index. */
remove(idx: int): any;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): any;

/** Changes the [Color] at the given index. */
set(idx: int, color: Color): any;

/** Returns the size of the array. */
size(): int;

  // connect<T extends SignalsOf<PoolColorArray>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PoolColorArraySignals>>(signal: T, method: SignalFunction<PoolColorArraySignals[T]>): number;




}

declare class PoolColorArraySignals {
  
}
