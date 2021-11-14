
/**
 * This class implements a WebSocket client compatible with any RFC 6455-compliant WebSocket server.
 *
 * This client can be optionally used as a network peer for the [MultiplayerAPI].
 *
 * After starting the client ([method connect_to_url]), you will need to [method NetworkedMultiplayerPeer.poll] it at regular intervals (e.g. inside [method Node._process]).
 *
 * You will receive appropriate signals when connecting, disconnecting, or when new data is available.
 *
*/
declare class WebSocketClient extends WebSocketMultiplayerPeer  {

  
/**
 * This class implements a WebSocket client compatible with any RFC 6455-compliant WebSocket server.
 *
 * This client can be optionally used as a network peer for the [MultiplayerAPI].
 *
 * After starting the client ([method connect_to_url]), you will need to [method NetworkedMultiplayerPeer.poll] it at regular intervals (e.g. inside [method Node._process]).
 *
 * You will receive appropriate signals when connecting, disconnecting, or when new data is available.
 *
*/
  new(): WebSocketClient; 
  static "new"(): WebSocketClient 


/**
 * If specified, this [X509Certificate] will be the only one accepted when connecting to an SSL host. Any other certificate provided by the server will be regarded as invalid.
 *
 * **Note:** Specifying a custom `trusted_ssl_certificate` is not supported in HTML5 exports due to browsers restrictions.
 *
*/
trusted_ssl_certificate: X509Certificate;

/**
 * If `true`, SSL certificate verification is enabled.
 *
 * **Note:** You must specify the certificates to be used in the Project Settings for it to work when exported.
 *
*/
verify_ssl: boolean;

/**
 * Connects to the given URL requesting one of the given `protocols` as sub-protocol. If the list empty (default), no sub-protocol will be requested.
 *
 * If `true` is passed as `gd_mp_api`, the client will behave like a network peer for the [MultiplayerAPI], connections to non-Godot servers will not work, and [signal data_received] will not be emitted.
 *
 * If `false` is passed instead (default), you must call [PacketPeer] functions (`put_packet`, `get_packet`, etc.) on the [WebSocketPeer] returned via `get_peer(1)` and not on this object directly (e.g. `get_peer(1).put_packet(data)`).
 *
 * You can optionally pass a list of `custom_headers` to be added to the handshake HTTP request.
 *
 * **Note:** To avoid mixed content warnings or errors in HTML5, you may have to use a `url` that starts with `wss://` (secure) instead of `ws://`. When doing so, make sure to use the fully qualified domain name that matches the one defined in the server's SSL certificate. Do not connect directly via the IP address for `wss://` connections, as it won't match with the SSL certificate.
 *
 * **Note:** Specifying `custom_headers` is not supported in HTML5 exports due to browsers restrictions.
 *
*/
connect_to_url(url: string, protocols?: PoolStringArray, gd_mp_api?: boolean, custom_headers?: PoolStringArray): int;

/** Disconnects this client from the connected host. See [method WebSocketPeer.close] for more information. */
disconnect_from_host(code?: int, reason?: string): void;

/** Return the IP address of the currently connected host. */
get_connected_host(): string;

/** Return the IP port of the currently connected host. */
get_connected_port(): int;

  connect<T extends SignalsOf<WebSocketClient>>(signal: T, method: SignalFunction<WebSocketClient[T]>): number;





/**
 * Emitted when the connection to the server is closed. `was_clean_close` will be `true` if the connection was shutdown cleanly.
 *
*/
$connection_closed: Signal<(was_clean_close: boolean) => void>

/**
 * Emitted when the connection to the server fails.
 *
*/
$connection_error: Signal<() => void>

/**
 * Emitted when a connection with the server is established, `protocol` will contain the sub-protocol agreed with the server.
 *
*/
$connection_established: Signal<(protocol: string) => void>

/**
 * Emitted when a WebSocket message is received.
 *
 * **Note:** This signal is **not** emitted when used as high-level multiplayer peer.
 *
*/
$data_received: Signal<() => void>

/**
 * Emitted when the server requests a clean close. You should keep polling until you get a [signal connection_closed] signal to achieve the clean close. See [method WebSocketPeer.close] for more details.
 *
*/
$server_close_request: Signal<(code: int, reason: string) => void>

}

