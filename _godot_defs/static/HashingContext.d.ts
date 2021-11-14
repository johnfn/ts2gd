
/**
 * The HashingContext class provides an interface for computing cryptographic hashes over multiple iterations. This is useful for example when computing hashes of big files (so you don't have to load them all in memory), network streams, and data streams in general (so you don't have to hold buffers).
 *
 * The [enum HashType] enum shows the supported hashing algorithms.
 *
 * @example 
 * 
 * const CHUNK_SIZE = 1024
 * func hash_file(path):
 *     var ctx = HashingContext.new()
 *     var file = File.new()
 *     # Start a SHA-256 context.
 *     ctx.start(HashingContext.HASH_SHA256)
 *     # Check that file exists.
 *     if not file.file_exists(path):
 *         return
 *     # Open the file to hash.
 *     file.open(path, File.READ)
 *     # Update the context after reading each chunk.
 *     while not file.eof_reached():
 *         ctx.update(file.get_buffer(CHUNK_SIZE))
 *     # Get the computed hash.
 *     var res = ctx.finish()
 *     # Print the result as hex string and array.
 *     printt(res.hex_encode(), Array(res))
 * @summary 
 * 
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
declare class HashingContext extends Reference  {

  
/**
 * The HashingContext class provides an interface for computing cryptographic hashes over multiple iterations. This is useful for example when computing hashes of big files (so you don't have to load them all in memory), network streams, and data streams in general (so you don't have to hold buffers).
 *
 * The [enum HashType] enum shows the supported hashing algorithms.
 *
 * @example 
 * 
 * const CHUNK_SIZE = 1024
 * func hash_file(path):
 *     var ctx = HashingContext.new()
 *     var file = File.new()
 *     # Start a SHA-256 context.
 *     ctx.start(HashingContext.HASH_SHA256)
 *     # Check that file exists.
 *     if not file.file_exists(path):
 *         return
 *     # Open the file to hash.
 *     file.open(path, File.READ)
 *     # Update the context after reading each chunk.
 *     while not file.eof_reached():
 *         ctx.update(file.get_buffer(CHUNK_SIZE))
 *     # Get the computed hash.
 *     var res = ctx.finish()
 *     # Print the result as hex string and array.
 *     printt(res.hex_encode(), Array(res))
 * @summary 
 * 
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
  new(): HashingContext; 
  static "new"(): HashingContext 



/** Closes the current context, and return the computed hash. */
finish(): PoolByteArray;

/** Starts a new hash computation of the given [code]type[/code] (e.g. [constant HASH_SHA256] to start computation of a SHA-256). */
start(type: int): int;

/** Updates the computation with the given [code]chunk[/code] of data. */
update(chunk: PoolByteArray): int;

  connect<T extends SignalsOf<HashingContext>>(signal: T, method: SignalFunction<HashingContext[T]>): number;



/**
 * Hashing algorithm: MD5.
 *
*/
static HASH_MD5: any;

/**
 * Hashing algorithm: SHA-1.
 *
*/
static HASH_SHA1: any;

/**
 * Hashing algorithm: SHA-256.
 *
*/
static HASH_SHA256: any;



}

