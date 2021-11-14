
/**
 * An [Array] specifically designed to hold bytes. Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/
declare class PoolByteArray {

  
/**
 * An [Array] specifically designed to hold bytes. Optimized for memory usage, does not fragment the memory.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/

  new(from: any[]): PoolByteArray;
  static "new"(): PoolByteArray 





/** Appends an element at the end of the array (alias of [method push_back]). */
append(byte: int): any;

/** Appends a [PoolByteArray] at the end of this array. */
append_array(array: PoolByteArray): any;

/** Returns a new [PoolByteArray] with the data compressed. Set the compression mode using one of [enum File.CompressionMode]'s constants. */
compress(compression_mode?: int): PoolByteArray;

/** Returns a new [PoolByteArray] with the data decompressed. Set [code]buffer_size[/code] to the size of the uncompressed data. Set the compression mode using one of [enum File.CompressionMode]'s constants. */
decompress(buffer_size: int, compression_mode?: int): PoolByteArray;

/**
 * Returns a new [PoolByteArray] with the data decompressed. Set the compression mode using one of [enum File.CompressionMode]'s constants. **This method only accepts gzip and deflate compression modes.**
 *
 * This method is potentially slower than `decompress`, as it may have to re-allocate it's output buffer multiple times while decompressing, where as `decompress` knows it's output buffer size from the begining.
 *
 * GZIP has a maximal compression ratio of 1032:1, meaning it's very possible for a small compressed payload to decompress to a potentially very large output. To guard against this, you may provide a maximum size this function is allowed to allocate in bytes via `max_output_size`. Passing -1 will allow for unbounded output. If any positive value is passed, and the decompression exceeds that ammount in bytes, then an error will be returned.
 *
*/
decompress_dynamic(max_output_size: int, compression_mode?: int): PoolByteArray;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Returns a copy of the array's contents as [String]. Fast alternative to [method get_string_from_utf8] if the content is ASCII-only. Unlike the UTF-8 function this function maps every byte to a character in the array. Multibyte sequences will not be interpreted correctly. For parsing user input always use [method get_string_from_utf8]. */
get_string_from_ascii(): string;

/** Returns a copy of the array's contents as [String]. Slower than [method get_string_from_ascii] but supports UTF-8 encoded data. Use this function if you are unsure about the source of the data. For user input this function should always be preferred. */
get_string_from_utf8(): string;

/**
 * Returns a hexadecimal representation of this array as a [String].
 *
 * @example 
 * 
 * var array = PoolByteArray([11, 46, 255])
 * print(array.hex_encode()) # Prints: 0b2eff
 * @summary 
 * 
 *
*/
hex_encode(): string;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, byte: int): int;

/** Reverses the order of the elements in the array. */
invert(): any;

/** Appends an element at the end of the array. */
push_back(byte: int): any;

/** Removes an element from the array by index. */
remove(idx: int): any;

/**
 * Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size.
 *
 * **Note:** Added elements are not automatically initialized to 0 and will contain garbage, i.e. indeterminate values.
 *
*/
resize(idx: int): any;

/** Changes the byte at the given index. */
set(idx: int, byte: int): any;

/** Returns the size of the array. */
size(): int;

/** Returns the slice of the [PoolByteArray] between indices (inclusive) as a new [PoolByteArray]. Any negative index is considered to be from the end of the array. */
subarray(from: int, to: int): PoolByteArray;

  connect<T extends SignalsOf<PoolByteArray>>(signal: T, method: SignalFunction<PoolByteArray[T]>): number;






}

