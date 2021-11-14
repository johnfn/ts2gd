
/**
 * This class implements a WebSocket server that can also support the high-level multiplayer API.
 *
 * After starting the server ([method listen]), you will need to [method NetworkedMultiplayerPeer.poll] it at regular intervals (e.g. inside [method Node._process]). When clients connect, disconnect, or send data, you will receive the appropriate signal.
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
declare class WebSocketServer extends WebSocketMultiplayerPeer  {

  
/**
 * This class implements a WebSocket server that can also support the high-level multiplayer API.
 *
 * After starting the server ([method listen]), you will need to [method NetworkedMultiplayerPeer.poll] it at regular intervals (e.g. inside [method Node._process]). When clients connect, disconnect, or send data, you will receive the appropriate signal.
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
  new(): WebSocketServer; 
  static "new"(): WebSocketServer 


/** When not set to [code]*[/code] will restrict incoming connections to the specified IP address. Setting [code]bind_ip[/code] to [code]127.0.0.1[/code] will cause the server to listen only to the local host. */
bind_ip: string;

/** When using SSL (see [member private_key] and [member ssl_certificate]), you can set this to a valid [X509Certificate] to be provided as additional CA chain information during the SSL handshake. */
ca_chain: X509Certificate;

/** The time in seconds before a pending client (i.e. a client that has not yet finished the HTTP handshake) is considered stale and forcefully disconnected. */
handshake_timeout: float;

/** When set to a valid [CryptoKey] (along with [member ssl_certificate]) will cause the server to require SSL instead of regular TCP (i.e. the [code]wss://[/code] protocol). */
private_key: CryptoKey;

/** When set to a valid [X509Certificate] (along with [member private_key]) will cause the server to require SSL instead of regular TCP (i.e. the [code]wss://[/code] protocol). */
ssl_certificate: X509Certificate;

/** Disconnects the peer identified by [code]id[/code] from the server. See [method WebSocketPeer.close] for more information. */
disconnect_peer(id: int, code?: int, reason?: string): void;

/** Returns the IP address of the given peer. */
get_peer_address(id: int): string;

/** Returns the remote port of the given peer. */
get_peer_port(id: int): int;

/** Returns [code]true[/code] if a peer with the given ID is connected. */
has_peer(id: int): boolean;

/** Returns [code]true[/code] if the server is actively listening on a port. */
is_listening(): boolean;

/**
 * Starts listening on the given port.
 *
 * You can specify the desired subprotocols via the "protocols" array. If the list empty (default), no sub-protocol will be requested.
 *
 * If `true` is passed as `gd_mp_api`, the server will behave like a network peer for the [MultiplayerAPI], connections from non-Godot clients will not work, and [signal data_received] will not be emitted.
 *
 * If `false` is passed instead (default), you must call [PacketPeer] functions (`put_packet`, `get_packet`, etc.), on the [WebSocketPeer] returned via `get_peer(id)` to communicate with the peer with given `id` (e.g. `get_peer(id).get_available_packet_count`).
 *
*/
listen(port: int, protocols?: PoolStringArray, gd_mp_api?: boolean): int;

/** Stops the server and clear its state. */
stop(): void;

  connect<T extends SignalsOf<WebSocketServer>>(signal: T, method: SignalFunction<WebSocketServer[T]>): number;





/**
 * Emitted when a client requests a clean close. You should keep polling until you get a [signal client_disconnected] signal with the same `id` to achieve the clean close. See [method WebSocketPeer.close] for more details.
 *
*/
$client_close_request: Signal<(id: int, code: int, reason: string) => void>

/**
 * Emitted when a new client connects. "protocol" will be the sub-protocol agreed with the client.
 *
*/
$client_connected: Signal<(id: int, protocol: string) => void>

/**
 * Emitted when a client disconnects. `was_clean_close` will be `true` if the connection was shutdown cleanly.
 *
*/
$client_disconnected: Signal<(id: int, was_clean_close: boolean) => void>

/**
 * Emitted when a new message is received.
 *
 * **Note:** This signal is **not** emitted when used as high-level multiplayer peer.
 *
*/
$data_received: Signal<(id: int) => void>

}

