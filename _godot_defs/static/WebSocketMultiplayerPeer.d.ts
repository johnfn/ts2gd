
/**
 * Base class for WebSocket server and client, allowing them to be used as network peer for the [MultiplayerAPI].
 *
*/
declare class WebSocketMultiplayerPeer extends NetworkedMultiplayerPeer  {

  
/**
 * Base class for WebSocket server and client, allowing them to be used as network peer for the [MultiplayerAPI].
 *
*/
  new(): WebSocketMultiplayerPeer; 
  static "new"(): WebSocketMultiplayerPeer 




/** Returns the [WebSocketPeer] associated to the given [code]peer_id[/code]. */
get_peer(peer_id: int): WebSocketPeer;

/**
 * Configures the buffer sizes for this WebSocket peer. Default values can be specified in the Project Settings under `network/limits`. For server, values are meant per connected peer.
 *
 * The first two parameters define the size and queued packets limits of the input buffer, the last two of the output buffer.
 *
 * Buffer sizes are expressed in KiB, so `4 = 2^12 = 4096 bytes`. All parameters will be rounded up to the nearest power of two.
 *
 * **Note:** HTML5 exports only use the input buffer since the output one is managed by browsers.
 *
*/
set_buffers(input_buffer_size_kb: int, input_max_packets: int, output_buffer_size_kb: int, output_max_packets: int): int;

  connect<T extends SignalsOf<WebSocketMultiplayerPeer>>(signal: T, method: SignalFunction<WebSocketMultiplayerPeer[T]>): number;





/**
 * Emitted when a packet is received from a peer.
 *
 * **Note:** This signal is only emitted when the client or server is configured to use Godot multiplayer API.
 *
*/
$peer_packet: Signal<(peer_source: int) => void>

}

