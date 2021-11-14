
/**
 * This class represents a specific WebSocket connection, allowing you to do lower level operations with it.
 *
 * You can choose to write to the socket in binary or text mode, and you can recognize the mode used for writing by the other peer.
 *
*/
declare class WebSocketPeer extends PacketPeer  {

  
/**
 * This class represents a specific WebSocket connection, allowing you to do lower level operations with it.
 *
 * You can choose to write to the socket in binary or text mode, and you can recognize the mode used for writing by the other peer.
 *
*/
  new(): WebSocketPeer; 
  static "new"(): WebSocketPeer 



/**
 * Closes this WebSocket connection. `code` is the status code for the closure (see RFC 6455 section 7.4 for a list of valid status codes). `reason` is the human readable reason for closing the connection (can be any UTF-8 string that's smaller than 123 bytes).
 *
 * **Note:** To achieve a clean close, you will need to keep polling until either [signal WebSocketClient.connection_closed] or [signal WebSocketServer.client_disconnected] is received.
 *
 * **Note:** The HTML5 export might not support all status codes. Please refer to browser-specific documentation for more details.
 *
*/
close(code?: int, reason?: string): void;

/**
 * Returns the IP address of the connected peer.
 *
 * **Note:** Not available in the HTML5 export.
 *
*/
get_connected_host(): string;

/**
 * Returns the remote port of the connected peer.
 *
 * **Note:** Not available in the HTML5 export.
 *
*/
get_connected_port(): int;

/** Returns the current amount of data in the outbound websocket buffer. [b]Note:[/b] HTML5 exports use WebSocket.bufferedAmount, while other platforms use an internal buffer. */
get_current_outbound_buffered_amount(): int;

/** Gets the current selected write mode. See [enum WriteMode]. */
get_write_mode(): int;

/** Returns [code]true[/code] if this peer is currently connected. */
is_connected_to_host(): boolean;

/**
 * Disable Nagle's algorithm on the underling TCP socket (default). See [method StreamPeerTCP.set_no_delay] for more information.
 *
 * **Note:** Not available in the HTML5 export.
 *
*/
set_no_delay(enabled: boolean): void;

/** Sets the socket to use the given [enum WriteMode]. */
set_write_mode(mode: int): void;

/** Returns [code]true[/code] if the last received packet was sent as a text payload. See [enum WriteMode]. */
was_string_packet(): boolean;

  connect<T extends SignalsOf<WebSocketPeer>>(signal: T, method: SignalFunction<WebSocketPeer[T]>): number;



/**
 * Specifies that WebSockets messages should be transferred as text payload (only valid UTF-8 is allowed).
 *
*/
static WRITE_MODE_TEXT: any;

/**
 * Specifies that WebSockets messages should be transferred as binary payload (any byte combination is allowed).
 *
*/
static WRITE_MODE_BINARY: any;



}

