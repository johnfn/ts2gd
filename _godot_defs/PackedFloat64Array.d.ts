
/**
 * An [Array] specifically designed to hold 64-bit floating-point values. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
 * If you only need to pack 32-bit floats tightly, see [PackedFloat32Array] for a more memory-friendly alternative.
 *
*/
declare class PackedFloat64Array {

  
/**
 * An [Array] specifically designed to hold 64-bit floating-point values. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
 * If you only need to pack 32-bit floats tightly, see [PackedFloat32Array] for a more memory-friendly alternative.
 *
*/

  constructor(from: any[]);
  static "new"(): this;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(value: float): void;

/** Appends a [PackedFloat64Array] at the end of this array. */
append_array(array: PackedFloat64Array): void;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Returns [code]true[/code] if the array contains [code]value[/code]. */
has(value: float): boolean;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, value: float): int;

/** Reverses the order of the elements in the array. */
invert(): void;

/** Appends an element at the end of the array. */
push_back(value: float): void;

/** Removes an element from the array by index. */
remove(idx: int): void;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): void;

/** Changes the float at the given index. */
set(idx: int, value: float): void;

/** Returns the size of the array. */
size(): int;

/** Sorts the elements of the array in ascending order. */
sort(): void;

  connect<T extends SignalsOf<PackedFloat64Array>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
