
/**
 * File type. This is used to permanently store data into the user device's file system and to read from it. This can be used to store game save data or player configuration files, for example.
 *
 * Here's a sample on how to write and read from a file:
 *
 * @example 
 * 
 * func save(content):
 *     var file = File.new()
 *     file.open("user://save_game.dat", File.WRITE)
 *     file.store_string(content)
 *     file.close()
 * func load():
 *     var file = File.new()
 *     file.open("user://save_game.dat", File.READ)
 *     var content = file.get_as_text()
 *     file.close()
 *     return content
 * @summary 
 * 
 *
 * In the example above, the file will be saved in the user data folder as specified in the [url=https://docs.godotengine.org/en/latest/tutorials/io/data_paths.html]Data paths[/url] documentation.
 *
*/
declare class File extends Reference {

  
/**
 * File type. This is used to permanently store data into the user device's file system and to read from it. This can be used to store game save data or player configuration files, for example.
 *
 * Here's a sample on how to write and read from a file:
 *
 * @example 
 * 
 * func save(content):
 *     var file = File.new()
 *     file.open("user://save_game.dat", File.WRITE)
 *     file.store_string(content)
 *     file.close()
 * func load():
 *     var file = File.new()
 *     file.open("user://save_game.dat", File.READ)
 *     var content = file.get_as_text()
 *     file.close()
 *     return content
 * @summary 
 * 
 *
 * In the example above, the file will be saved in the user data folder as specified in the [url=https://docs.godotengine.org/en/latest/tutorials/io/data_paths.html]Data paths[/url] documentation.
 *
*/
  "new"(): File;
  static "new"(): File;



/**
 * If `true`, the file's endianness is swapped. Use this if you're dealing with files written on big-endian machines.
 *
 * **Note:** This is about the file format, not CPU type. This is always reset to `false` whenever you open the file.
 *
*/
endian_swap: boolean;

/** Closes the currently opened file. */
close(): void;

/**
 * Returns `true` if the file cursor has read past the end of the file.
 *
 * **Note:** This function will still return `false` while at the end of the file and only activates when reading past it. This can be confusing but it conforms to how low-level file access works in all operating systems. There is always [method get_len] and [method get_position] to implement a custom logic.
 *
*/
eof_reached(): boolean;

/**
 * Returns `true` if the file exists in the given path.
 *
 * **Note:** Many resources types are imported (e.g. textures or sound files), and that their source asset will not be included in the exported game, as only the imported version is used (in the `res://.import` folder). To check for the existence of such resources while taking into account the remapping to their imported location, use [method ResourceLoader.exists]. Typically, using `File.file_exists` on an imported resource would work while you are developing in the editor (the source asset is present in `res://`, but fail when exported).
 *
*/
file_exists(path: string): boolean;

/** Returns the next 16 bits from the file as an integer. See [method store_16] for details on what values can be stored and retrieved this way. */
get_16(): int;

/** Returns the next 32 bits from the file as an integer. See [method store_32] for details on what values can be stored and retrieved this way. */
get_32(): int;

/** Returns the next 64 bits from the file as an integer. See [method store_64] for details on what values can be stored and retrieved this way. */
get_64(): int;

/** Returns the next 8 bits from the file as an integer. See [method store_8] for details on what values can be stored and retrieved this way. */
get_8(): int;

/**
 * Returns the whole file as a [String].
 *
 * Text is interpreted as being UTF-8 encoded.
 *
*/
get_as_text(): string;

/** Returns next [code]len[/code] bytes of the file as a [PoolByteArray]. */
get_buffer(len: int): PoolByteArray;

/**
 * Returns the next value of the file in CSV (Comma-Separated Values) format. You can pass a different delimiter `delim` to use other than the default `","` (comma). This delimiter must be one-character long.
 *
 * Text is interpreted as being UTF-8 encoded.
 *
*/
get_csv_line(delim?: string): PoolStringArray;

/** Returns the next 64 bits from the file as a floating-point number. */
get_double(): float;

/** Returns the last error that happened when trying to perform operations. Compare with the [code]ERR_FILE_*[/code] constants from [enum Error]. */
get_error(): int;

/** Returns the next 32 bits from the file as a floating-point number. */
get_float(): float;

/** Returns the size of the file in bytes. */
get_len(): int;

/**
 * Returns the next line of the file as a [String].
 *
 * Text is interpreted as being UTF-8 encoded.
 *
*/
get_line(): string;

/** Returns an MD5 String representing the file at the given path or an empty [String] on failure. */
get_md5(path: string): string;

/** Returns the last time the [code]file[/code] was modified in unix timestamp format or returns a [String] "ERROR IN [code]file[/code]". This unix timestamp can be converted to datetime by using [method OS.get_datetime_from_unix_time]. */
get_modified_time(file: string): int;

/**
 * Returns a [String] saved in Pascal format from the file.
 *
 * Text is interpreted as being UTF-8 encoded.
 *
*/
get_pascal_string(): string;

/** Returns the path as a [String] for the current open file. */
get_path(): string;

/** Returns the absolute path as a [String] for the current open file. */
get_path_absolute(): string;

/** Returns the file cursor's position. */
get_position(): int;

/** Returns the next bits from the file as a floating-point number. */
get_real(): float;

/** Returns a SHA-256 [String] representing the file at the given path or an empty [String] on failure. */
get_sha256(path: string): string;

/**
 * Returns the next [Variant] value from the file. If `allow_objects` is `true`, decoding objects is allowed.
 *
 * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
 *
*/
get_var(allow_objects?: boolean): any;

/** Returns [code]true[/code] if the file is currently opened. */
is_open(): boolean;

/** Opens the file for writing or reading, depending on the flags. */
open(path: string, flags: int): int;

/** Opens a compressed file for reading or writing. */
open_compressed(path: string, mode_flags: int, compression_mode?: int): int;

/**
 * Opens an encrypted file in write or read mode. You need to pass a binary key to encrypt/decrypt it.
 *
 * **Note:** The provided key must be 32 bytes long.
 *
*/
open_encrypted(path: string, mode_flags: int, key: PoolByteArray): int;

/** Opens an encrypted file in write or read mode. You need to pass a password to encrypt/decrypt it. */
open_encrypted_with_pass(path: string, mode_flags: int, pass: string): int;

/** Changes the file reading/writing cursor to the specified position (in bytes from the beginning of the file). */
seek(position: int): void;

/**
 * Changes the file reading/writing cursor to the specified position (in bytes from the end of the file).
 *
 * **Note:** This is an offset, so you should use negative numbers or the cursor will be at the end of the file.
 *
*/
seek_end(position?: int): void;

/**
 * Stores an integer as 16 bits in the file.
 *
 * **Note:** The `value` should lie in the interval `[0, 2^16 - 1]`. Any other value will overflow and wrap around.
 *
 * To store a signed integer, use [method store_64] or store a signed integer from the interval `[-2^15, 2^15 - 1]` (i.e. keeping one bit for the signedness) and compute its sign manually when reading. For example:
 *
 * @example 
 * 
 * const MAX_15B = 1 << 15
 * const MAX_16B = 1 << 16
 * func unsigned16_to_signed(unsigned):
 *     return (unsigned + MAX_15B) % MAX_16B - MAX_15B
 * func _ready():
 *     var f = File.new()
 *     f.open("user://file.dat", File.WRITE_READ)
 *     f.store_16(-42) # This wraps around and stores 65494 (2^16 - 42).
 *     f.store_16(121) # In bounds, will store 121.
 *     f.seek(0) # Go back to start to read the stored value.
 *     var read1 = f.get_16() # 65494
 *     var read2 = f.get_16() # 121
 *     var converted1 = unsigned16_to_signed(read1) # -42
 *     var converted2 = unsigned16_to_signed(read2) # 121
 * @summary 
 * 
 *
*/
store_16(value: int): void;

/**
 * Stores an integer as 32 bits in the file.
 *
 * **Note:** The `value` should lie in the interval `[0, 2^32 - 1]`. Any other value will overflow and wrap around.
 *
 * To store a signed integer, use [method store_64], or convert it manually (see [method store_16] for an example).
 *
*/
store_32(value: int): void;

/**
 * Stores an integer as 64 bits in the file.
 *
 * **Note:** The `value` must lie in the interval `[-2^63, 2^63 - 1]` (i.e. be a valid [int] value).
 *
*/
store_64(value: int): void;

/**
 * Stores an integer as 8 bits in the file.
 *
 * **Note:** The `value` should lie in the interval `[0, 255]`. Any other value will overflow and wrap around.
 *
 * To store a signed integer, use [method store_64], or convert it manually (see [method store_16] for an example).
 *
*/
store_8(value: int): void;

/** Stores the given array of bytes in the file. */
store_buffer(buffer: PoolByteArray): void;

/**
 * Store the given [PoolStringArray] in the file as a line formatted in the CSV (Comma-Separated Values) format. You can pass a different delimiter `delim` to use other than the default `","` (comma). This delimiter must be one-character long.
 *
 * Text will be encoded as UTF-8.
 *
*/
store_csv_line(values: PoolStringArray, delim?: string): void;

/** Stores a floating-point number as 64 bits in the file. */
store_double(value: float): void;

/** Stores a floating-point number as 32 bits in the file. */
store_float(value: float): void;

/**
 * Stores the given [String] as a line in the file.
 *
 * Text will be encoded as UTF-8.
 *
*/
store_line(line: string): void;

/**
 * Stores the given [String] as a line in the file in Pascal format (i.e. also store the length of the string).
 *
 * Text will be encoded as UTF-8.
 *
*/
store_pascal_string(string: string): void;

/** Stores a floating-point number in the file. */
store_real(value: float): void;

/**
 * Stores the given [String] in the file.
 *
 * Text will be encoded as UTF-8.
 *
*/
store_string(string: string): void;

/** Stores any Variant value in the file. If [code]full_objects[/code] is [code]true[/code], encoding objects is allowed (and can potentially include code). */
store_var(value: any, full_objects?: boolean): void;

  connect<T extends SignalsOf<File>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Opens the file for read operations. The cursor is positioned at the beginning of the file.
 *
*/
static READ: 1;

/**
 * Opens the file for write operations. The file is created if it does not exist, and truncated if it does.
 *
*/
static WRITE: 2;

/**
 * Opens the file for read and write operations. Does not truncate the file. The cursor is positioned at the beginning of the file.
 *
*/
static READ_WRITE: 3;

/**
 * Opens the file for read and write operations. The file is created if it does not exist, and truncated if it does. The cursor is positioned at the beginning of the file.
 *
*/
static WRITE_READ: 7;

/**
 * Uses the [url=http://fastlz.org/]FastLZ[/url] compression method.
 *
*/
static COMPRESSION_FASTLZ: 0;

/**
 * Uses the [url=https://en.wikipedia.org/wiki/DEFLATE]DEFLATE[/url] compression method.
 *
*/
static COMPRESSION_DEFLATE: 1;

/**
 * Uses the [url=https://facebook.github.io/zstd/]Zstandard[/url] compression method.
 *
*/
static COMPRESSION_ZSTD: 2;

/**
 * Uses the [url=https://www.gzip.org/]gzip[/url] compression method.
 *
*/
static COMPRESSION_GZIP: 3;


  
}
