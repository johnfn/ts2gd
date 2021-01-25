
/**
 * An [Array] specifically designed to hold 64-bit integer values. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
 * **Note:** This type stores signed 64-bit integers, which means it can take values in the interval `[-2^63, 2^63 - 1]`, i.e. `[-9223372036854775808, 9223372036854775807]`. Exceeding those bounds will wrap around. If you only need to pack 32-bit integers tightly, see [PackedInt32Array] for a more memory-friendly alternative.
 *
*/
declare class PackedInt64Array {

  
/**
 * An [Array] specifically designed to hold 64-bit integer values. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
 * **Note:** This type stores signed 64-bit integers, which means it can take values in the interval `[-2^63, 2^63 - 1]`, i.e. `[-9223372036854775808, 9223372036854775807]`. Exceeding those bounds will wrap around. If you only need to pack 32-bit integers tightly, see [PackedInt32Array] for a more memory-friendly alternative.
 *
*/

  constructor(from: any[]);
  static "new"(): this;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(integer: int): void;

/** Appends a [PackedInt64Array] at the end of this array. */
append_array(array: PackedInt64Array): void;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Returns [code]true[/code] if the array contains [code]value[/code]. */
has(value: int): boolean;

/** Inserts a new integer at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, integer: int): int;

/** Reverses the order of the elements in the array. */
invert(): void;

/** Appends a value to the array. */
push_back(integer: int): void;

/** Removes an element from the array by index. */
remove(idx: int): void;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): void;

/** Changes the integer at the given index. */
set(idx: int, integer: int): void;

/** Returns the array size. */
size(): int;

/** Sorts the elements of the array in ascending order. */
sort(): void;

  connect<T extends SignalsOf<PackedInt64Array>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
