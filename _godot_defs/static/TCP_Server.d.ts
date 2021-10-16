
/**
 * A TCP server. Listens to connections on a port and returns a [StreamPeerTCP] when it gets an incoming connection.
 *
*/
declare class TCP_Server extends Reference {

  
/**
 * A TCP server. Listens to connections on a port and returns a [StreamPeerTCP] when it gets an incoming connection.
 *
*/
  "new"(): TCP_Server;
  static "new"(): TCP_Server;




/** Returns [code]true[/code] if a connection is available for taking. */
is_connection_available(): boolean;

/** Returns [code]true[/code] if the server is currently listening for connections. */
is_listening(): boolean;

/**
 * Listen on the `port` binding to `bind_address`.
 *
 * If `bind_address` is set as `"*"` (default), the server will listen on all available addresses (both IPv4 and IPv6).
 *
 * If `bind_address` is set as `"0.0.0.0"` (for IPv4) or `"::"` (for IPv6), the server will listen on all available addresses matching that IP type.
 *
 * If `bind_address` is set to any valid address (e.g. `"192.168.1.101"`, `"::1"`, etc), the server will only listen on the interface with that addresses (or fail if no interface with the given address exists).
 *
*/
listen(port: int, bind_address?: string): int;

/** Stops listening. */
stop(): void;

/** If a connection is available, returns a StreamPeerTCP with the connection. */
take_connection(): StreamPeerTCP;

  // connect<T extends SignalsOf<TCP_Server>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TCP_ServerSignals>>(signal: T, method: SignalFunction<TCP_ServerSignals[T]>): number;




}

declare class TCP_ServerSignals extends ReferenceSignals {
  
}
