
/**
 * IP contains support functions for the Internet Protocol (IP). TCP/IP support is in different classes (see [StreamPeerTCP] and [TCP_Server]). IP provides DNS hostname resolution support, both blocking and threaded.
 *
*/
declare class IPClass extends Object {

  
/**
 * IP contains support functions for the Internet Protocol (IP). TCP/IP support is in different classes (see [StreamPeerTCP] and [TCP_Server]). IP provides DNS hostname resolution support, both blocking and threaded.
 *
*/
  "new"(): IPClass;
  static "new"(): IPClass;




/** Removes all of a [code]hostname[/code]'s cached references. If no [code]hostname[/code] is given, all cached IP addresses are removed. */
clear_cache(hostname?: string): void;

/** Removes a given item [code]id[/code] from the queue. This should be used to free a queue after it has completed to enable more queries to happen. */
erase_resolve_item(id: int): void;

/** Returns all of the user's current IPv4 and IPv6 addresses as an array. */
get_local_addresses(): any[];

/**
 * Returns all network adapters as an array.
 *
 * Each adapter is a dictionary of the form:
 *
 * @example 
 * 
 * {
 *     "index": "1", # Interface index.
 *     "name": "eth0", # Interface name.
 *     "friendly": "Ethernet One", # A friendly name (might be empty).
 *     "addresses": ["192.168.1.101"], # An array of IP addresses associated to this interface.
 * }
 * @summary 
 * 
 *
*/
get_local_interfaces(): any[];

/** Returns a queued hostname's IP address, given its queue [code]id[/code]. Returns an empty string on error or if resolution hasn't happened yet (see [method get_resolve_item_status]). */
get_resolve_item_address(id: int): string;

/** Returns a queued hostname's status as a [enum ResolverStatus] constant, given its queue [code]id[/code]. */
get_resolve_item_status(id: int): int;

/** Returns a given hostname's IPv4 or IPv6 address when resolved (blocking-type method). The address type returned depends on the [enum Type] constant given as [code]ip_type[/code]. */
resolve_hostname(host: string, ip_type?: int): string;

/** Creates a queue item to resolve a hostname to an IPv4 or IPv6 address depending on the [enum Type] constant given as [code]ip_type[/code]. Returns the queue ID if successful, or [constant RESOLVER_INVALID_ID] on error. */
resolve_hostname_queue_item(host: string, ip_type?: int): int;

  connect<T extends SignalsOf<IPClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * DNS hostname resolver status: No status.
 *
*/
static RESOLVER_STATUS_NONE: 0;

/**
 * DNS hostname resolver status: Waiting.
 *
*/
static RESOLVER_STATUS_WAITING: 1;

/**
 * DNS hostname resolver status: Done.
 *
*/
static RESOLVER_STATUS_DONE: 2;

/**
 * DNS hostname resolver status: Error.
 *
*/
static RESOLVER_STATUS_ERROR: 3;

/**
 * Maximum number of concurrent DNS resolver queries allowed, [constant RESOLVER_INVALID_ID] is returned if exceeded.
 *
*/
static RESOLVER_MAX_QUERIES: 32;

/**
 * Invalid ID constant. Returned if [constant RESOLVER_MAX_QUERIES] is exceeded.
 *
*/
 static RESOLVER_INVALID_ID: null;

/**
 * Address type: None.
 *
*/
static TYPE_NONE: 0;

/**
 * Address type: Internet protocol version 4 (IPv4).
 *
*/
static TYPE_IPV4: 1;

/**
 * Address type: Internet protocol version 6 (IPv6).
 *
*/
static TYPE_IPV6: 2;

/**
 * Address type: Any.
 *
*/
static TYPE_ANY: 3;


  
}
