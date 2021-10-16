
/**
 * TCP stream peer. This object can be used to connect to TCP servers, or also is returned by a TCP server.
 *
*/
declare class StreamPeerTCP extends StreamPeer {

  
/**
 * TCP stream peer. This object can be used to connect to TCP servers, or also is returned by a TCP server.
 *
*/
  "new"(): StreamPeerTCP;
  static "new"(): StreamPeerTCP;




/** Connects to the specified [code]host:port[/code] pair. A hostname will be resolved if valid. Returns [constant OK] on success or [constant FAILED] on failure. */
connect_to_host(host: string, port: int): int;

/** Disconnects from host. */
disconnect_from_host(): void;

/** Returns the IP of this peer. */
get_connected_host(): string;

/** Returns the port of this peer. */
get_connected_port(): int;

/** Returns the status of the connection, see [enum Status]. */
get_status(): int;

/** Returns [code]true[/code] if this peer is currently connected or is connecting to a host, [code]false[/code] otherwise. */
is_connected_to_host(): boolean;

/**
 * If `enabled` is `true`, packets will be sent immediately. If `enabled` is `false` (the default), packet transfers will be delayed and combined using [url=https://en.wikipedia.org/wiki/Nagle%27s_algorithm]Nagle's algorithm[/url].
 *
 * **Note:** It's recommended to leave this disabled for applications that send large packets or need to transfer a lot of data, as enabling this can decrease the total available bandwidth.
 *
*/
set_no_delay(enabled: boolean): void;

  // connect<T extends SignalsOf<StreamPeerTCP>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<StreamPeerTCPSignals>>(signal: T, method: SignalFunction<StreamPeerTCPSignals[T]>): number;



/**
 * The initial status of the [StreamPeerTCP]. This is also the status after disconnecting.
 *
*/
static STATUS_NONE: any;

/**
 * A status representing a [StreamPeerTCP] that is connecting to a host.
 *
*/
static STATUS_CONNECTING: any;

/**
 * A status representing a [StreamPeerTCP] that is connected to a host.
 *
*/
static STATUS_CONNECTED: any;

/**
 * A status representing a [StreamPeerTCP] in error state.
 *
*/
static STATUS_ERROR: any;

}

declare class StreamPeerTCPSignals extends StreamPeerSignals {
  
}
