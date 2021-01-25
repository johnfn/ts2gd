
/**
 * An [Array] specifically designed to hold [String]s. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/
declare class PackedStringArray {

  
/**
 * An [Array] specifically designed to hold [String]s. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/

  constructor(from: any[]);
  static "new"(): this;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(string: String): void;

/** Appends a [PackedStringArray] at the end of this array. */
append_array(array: PackedStringArray): void;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Returns [code]true[/code] if the array contains [code]value[/code]. */
has(value: String): boolean;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, string: String): int;

/** Reverses the order of the elements in the array. */
invert(): void;

/** Appends a string element at end of the array. */
push_back(string: String): void;

/** Removes an element from the array by index. */
remove(idx: int): void;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): void;

/** Changes the [String] at the given index. */
set(idx: int, string: String): void;

/** Returns the size of the array. */
size(): int;

/** Sorts the elements of the array in ascending order. */
sort(): void;

  connect<T extends SignalsOf<PackedStringArray>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
