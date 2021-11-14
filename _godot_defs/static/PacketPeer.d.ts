
/**
 * PacketPeer is an abstraction and base class for packet-based protocols (such as UDP). It provides an API for sending and receiving packets both as raw data or variables. This makes it easy to transfer data over a protocol, without having to encode data as low-level bytes or having to worry about network ordering.
 *
*/
declare class PacketPeer extends Reference  {

  
/**
 * PacketPeer is an abstraction and base class for packet-based protocols (such as UDP). It provides an API for sending and receiving packets both as raw data or variables. This makes it easy to transfer data over a protocol, without having to encode data as low-level bytes or having to worry about network ordering.
 *
*/
  new(): PacketPeer; 
  static "new"(): PacketPeer 


/**
 * **Deprecated.** Use `get_var` and `put_var` parameters instead.
 *
 * If `true`, the PacketPeer will allow encoding and decoding of object via [method get_var] and [method put_var].
 *
 * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
 *
*/
allow_object_decoding: boolean;

/**
 * Maximum buffer size allowed when encoding [Variant]s. Raise this value to support heavier memory allocations.
 *
 * The [method put_var] method allocates memory on the stack, and the buffer used will grow automatically to the closest power of two to match the size of the [Variant]. If the [Variant] is bigger than `encode_buffer_max_size`, the method will error out with [constant ERR_OUT_OF_MEMORY].
 *
*/
encode_buffer_max_size: int;

/** Returns the number of packets currently available in the ring-buffer. */
get_available_packet_count(): int;

/** Gets a raw packet. */
get_packet(): PoolByteArray;

/** Returns the error state of the last packet received (via [method get_packet] and [method get_var]). */
get_packet_error(): int;

/**
 * Gets a Variant. If `allow_objects` (or [member allow_object_decoding]) is `true`, decoding objects is allowed.
 *
 * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
 *
*/
get_var(allow_objects?: boolean): any;

/** Sends a raw packet. */
put_packet(buffer: PoolByteArray): int;

/** Sends a [Variant] as a packet. If [code]full_objects[/code] (or [member allow_object_decoding]) is [code]true[/code], encoding objects is allowed (and can potentially include code). */
put_var(_var: any, full_objects?: boolean): int;

  connect<T extends SignalsOf<PacketPeer>>(signal: T, method: SignalFunction<PacketPeer[T]>): number;






}

