
/**
 * An [Array] specifically designed to hold [Vector3]. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/
declare class PackedVector3Array {

  
/**
 * An [Array] specifically designed to hold [Vector3]. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/

  constructor(from: any[]);
  static "new"(): this;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(vector3: Vector3): void;

/** Appends a [PackedVector3Array] at the end of this array. */
append_array(array: PackedVector3Array): void;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Returns [code]true[/code] if the array contains [code]value[/code]. */
has(value: Vector3): boolean;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, vector3: Vector3): int;

/** Reverses the order of the elements in the array. */
invert(): void;

/** Inserts a [Vector3] at the end. */
push_back(vector3: Vector3): void;

/** Removes an element from the array by index. */
remove(idx: int): void;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): void;

/** Changes the [Vector3] at the given index. */
set(idx: int, vector3: Vector3): void;

/** Returns the size of the array. */
size(): int;

/** Sorts the elements of the array in ascending order. */
sort(): void;

  connect<T extends SignalsOf<PackedVector3Array>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
