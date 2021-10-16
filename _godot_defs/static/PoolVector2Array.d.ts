
/**
 * An [Array] specifically designed to hold [Vector2]. Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/
declare class PoolVector2Array {

  
/**
 * An [Array] specifically designed to hold [Vector2]. Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/

  constructor(from: any[]);
  static "new"(): PoolVector2Array;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(vector2: Vector2): any;

/** Appends a [PoolVector2Array] at the end of this array. */
append_array(array: PoolVector2Array): any;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, vector2: Vector2): int;

/** Reverses the order of the elements in the array. */
invert(): any;

/** Inserts a [Vector2] at the end. */
push_back(vector2: Vector2): any;

/** Removes an element from the array by index. */
remove(idx: int): any;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): any;

/** Changes the [Vector2] at the given index. */
set(idx: int, vector2: Vector2): any;

/** Returns the size of the array. */
size(): int;

  // connect<T extends SignalsOf<PoolVector2Array>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PoolVector2ArraySignals>>(signal: T, method: SignalFunction<PoolVector2ArraySignals[T]>): number;




}

declare class PoolVector2ArraySignals {
  
}
