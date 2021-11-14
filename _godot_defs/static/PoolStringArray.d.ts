
/**
 * An [Array] specifically designed to hold [String]s. Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/
declare class PoolStringArray {

  
/**
 * An [Array] specifically designed to hold [String]s. Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/

  new(from: any[]): PoolStringArray;
  static "new"(): PoolStringArray 





/** Appends an element at the end of the array (alias of [method push_back]). */
append(string: string): any;

/** Appends a [PoolStringArray] at the end of this array. */
append_array(array: PoolStringArray): any;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, string: string): int;

/** Reverses the order of the elements in the array. */
invert(): any;

/** Returns a [String] with each element of the array joined with the given [code]delimiter[/code]. */
join(delimiter: string): string;

/** Appends a string element at end of the array. */
push_back(string: string): any;

/** Removes an element from the array by index. */
remove(idx: int): any;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): any;

/** Changes the [String] at the given index. */
set(idx: int, string: string): any;

/** Returns the size of the array. */
size(): int;

  connect<T extends SignalsOf<PoolStringArray>>(signal: T, method: SignalFunction<PoolStringArray[T]>): number;






}

