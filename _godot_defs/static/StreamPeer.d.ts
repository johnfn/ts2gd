
/**
 * StreamPeer is an abstraction and base class for stream-based protocols (such as TCP). It provides an API for sending and receiving data through streams as raw data or strings.
 *
*/
declare class StreamPeer extends Reference  {

  
/**
 * StreamPeer is an abstraction and base class for stream-based protocols (such as TCP). It provides an API for sending and receiving data through streams as raw data or strings.
 *
*/
  new(): StreamPeer; 
  static "new"(): StreamPeer 


/** If [code]true[/code], this [StreamPeer] will using big-endian format for encoding and decoding. */
big_endian: boolean;

/** Gets a signed 16-bit value from the stream. */
get_16(): int;

/** Gets a signed 32-bit value from the stream. */
get_32(): int;

/** Gets a signed 64-bit value from the stream. */
get_64(): int;

/** Gets a signed byte from the stream. */
get_8(): int;

/** Returns the amount of bytes this [StreamPeer] has available. */
get_available_bytes(): int;

/** Returns a chunk data with the received bytes. The amount of bytes to be received can be requested in the [code]bytes[/code] argument. If not enough bytes are available, the function will block until the desired amount is received. This function returns two values, an [enum @GlobalScope.Error] code and a data array. */
get_data(bytes: int): any[];

/** Gets a double-precision float from the stream. */
get_double(): float;

/** Gets a single-precision float from the stream. */
get_float(): float;

/** Returns a chunk data with the received bytes. The amount of bytes to be received can be requested in the "bytes" argument. If not enough bytes are available, the function will return how many were actually received. This function returns two values, an [enum @GlobalScope.Error] code, and a data array. */
get_partial_data(bytes: int): any[];

/** Gets a string with byte-length [code]bytes[/code] from the stream. If [code]bytes[/code] is negative (default) the length will be read from the stream using the reverse process of [method put_string]. */
get_string(bytes?: int): string;

/** Gets an unsigned 16-bit value from the stream. */
get_u16(): int;

/** Gets an unsigned 32-bit value from the stream. */
get_u32(): int;

/** Gets an unsigned 64-bit value from the stream. */
get_u64(): int;

/** Gets an unsigned byte from the stream. */
get_u8(): int;

/** Gets an UTF-8 string with byte-length [code]bytes[/code] from the stream (this decodes the string sent as UTF-8). If [code]bytes[/code] is negative (default) the length will be read from the stream using the reverse process of [method put_utf8_string]. */
get_utf8_string(bytes?: int): string;

/**
 * Gets a Variant from the stream. If `allow_objects` is `true`, decoding objects is allowed.
 *
 * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
 *
*/
get_var(allow_objects?: boolean): any;

/** Puts a signed 16-bit value into the stream. */
put_16(value: int): void;

/** Puts a signed 32-bit value into the stream. */
put_32(value: int): void;

/** Puts a signed 64-bit value into the stream. */
put_64(value: int): void;

/** Puts a signed byte into the stream. */
put_8(value: int): void;

/** Sends a chunk of data through the connection, blocking if necessary until the data is done sending. This function returns an [enum @GlobalScope.Error] code. */
put_data(data: PoolByteArray): int;

/** Puts a double-precision float into the stream. */
put_double(value: float): void;

/** Puts a single-precision float into the stream. */
put_float(value: float): void;

/** Sends a chunk of data through the connection. If all the data could not be sent at once, only part of it will. This function returns two values, an [enum @GlobalScope.Error] code and an integer, describing how much data was actually sent. */
put_partial_data(data: PoolByteArray): any[];

/**
 * Puts a zero-terminated ASCII string into the stream prepended by a 32-bit unsigned integer representing its size.
 *
 * **Note:** To put an ASCII string without prepending its size, you can use [method put_data]:
 *
 * @example 
 * 
 * put_data("Hello world".to_ascii())
 * @summary 
 * 
 *
*/
put_string(value: string): void;

/** Puts an unsigned 16-bit value into the stream. */
put_u16(value: int): void;

/** Puts an unsigned 32-bit value into the stream. */
put_u32(value: int): void;

/** Puts an unsigned 64-bit value into the stream. */
put_u64(value: int): void;

/** Puts an unsigned byte into the stream. */
put_u8(value: int): void;

/**
 * Puts a zero-terminated UTF-8 string into the stream prepended by a 32 bits unsigned integer representing its size.
 *
 * **Note:** To put an UTF-8 string without prepending its size, you can use [method put_data]:
 *
 * @example 
 * 
 * put_data("Hello world".to_utf8())
 * @summary 
 * 
 *
*/
put_utf8_string(value: string): void;

/** Puts a Variant into the stream. If [code]full_objects[/code] is [code]true[/code] encoding objects is allowed (and can potentially include code). */
put_var(value: any, full_objects?: boolean): void;

  connect<T extends SignalsOf<StreamPeer>>(signal: T, method: SignalFunction<StreamPeer[T]>): number;






}

