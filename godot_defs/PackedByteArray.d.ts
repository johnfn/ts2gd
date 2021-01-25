
/**
 * An [Array] specifically designed to hold bytes. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/
declare class PackedByteArray {

  
/**
 * An [Array] specifically designed to hold bytes. Packs data tightly, so it saves memory for large array sizes.
 *
 * **Note:** This type is passed by value and not by reference.
 *
*/

  constructor(from: any[]);
  static "new"(): this;






/** Appends an element at the end of the array (alias of [method push_back]). */
append(byte: int): void;

/** Appends a [PackedByteArray] at the end of this array. */
append_array(array: PackedByteArray): void;

/** Returns a new [PackedByteArray] with the data compressed. Set the compression mode using one of [enum File.CompressionMode]'s constants. */
compress(compression_mode?: int): PackedByteArray;

/** Returns a new [PackedByteArray] with the data decompressed. Set [code]buffer_size[/code] to the size of the uncompressed data. Set the compression mode using one of [enum File.CompressionMode]'s constants. */
decompress(buffer_size: int, compression_mode?: int): PackedByteArray;

/**
 * Returns a new [PackedByteArray] with the data decompressed. Set the compression mode using one of [enum File.CompressionMode]'s constants. **This method only accepts gzip and deflate compression modes.**
 *
 * This method is potentially slower than `decompress`, as it may have to re-allocate it's output buffer multiple times while decompressing, where as `decompress` knows it's output buffer size from the beginning.
 *
 * GZIP has a maximal compression ratio of 1032:1, meaning it's very possible for a small compressed payload to decompress to a potentially very large output. To guard against this, you may provide a maximum size this function is allowed to allocate in bytes via `max_output_size`. Passing -1 will allow for unbounded output. If any positive value is passed, and the decompression exceeds that amount in bytes, then an error will be returned.
 *
*/
decompress_dynamic(max_output_size: int, compression_mode?: int): PackedByteArray;

/** Returns [code]true[/code] if the array is empty. */
empty(): boolean;

/** Converts ASCII/Latin-1 encoded array to [String]. Fast alternative to [method get_string_from_utf8] if the content is ASCII/Latin-1 only. Unlike the UTF-8 function this function maps every byte to a character in the array. Multibyte sequences will not be interpreted correctly. For parsing user input always use [method get_string_from_utf8]. */
get_string_from_ascii(): String;

/** Converts UTF-16 encoded array to [String]. If the BOM is missing, system endianness is assumed. Returns empty string if source array is not valid UTF-16 string. */
get_string_from_utf16(): String;

/** Converts UTF-32 encoded array to [String]. System endianness is assumed. Returns empty string if source array is not valid UTF-32 string. */
get_string_from_utf32(): String;

/** Converts UTF-8 encoded array to [String]. Slower than [method get_string_from_ascii] but supports UTF-8 encoded data. Use this function if you are unsure about the source of the data. For user input this function should always be preferred. Returns empty string if source array is not valid UTF-8 string. */
get_string_from_utf8(): String;

/** Returns [code]true[/code] if the array contains [code]value[/code]. */
has(value: int): boolean;

/**
 * Returns a hexadecimal representation of this array as a [String].
 *
 * @example 
 * 
 * var array = PackedByteArray([11, 46, 255])
 * print(array.hex_encode()) # Prints: 0b2eff
 * @summary 
 * 
 *
*/
hex_encode(): String;

/** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
insert(idx: int, byte: int): int;

/** Reverses the order of the elements in the array. */
invert(): void;

/** Appends an element at the end of the array. */
push_back(byte: int): void;

/** Removes an element from the array by index. */
remove(idx: int): void;

/** Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. */
resize(idx: int): void;

/** Changes the byte at the given index. */
set(idx: int, byte: int): void;

/** Returns the size of the array. */
size(): int;

/** Sorts the elements of the array in ascending order. */
sort(): void;

/** Returns the slice of the [PackedByteArray] between indices (inclusive) as a new [PackedByteArray]. Any negative index is considered to be from the end of the array. */
subarray(from: int, to: int): PackedByteArray;

  connect<T extends SignalsOf<PackedByteArray>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
