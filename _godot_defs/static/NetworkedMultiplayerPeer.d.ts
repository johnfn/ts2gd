
/**
 * Manages the connection to network peers. Assigns unique IDs to each client connected to the server. See also [MultiplayerAPI].
 *
 * **Note:** The high-level multiplayer API protocol is an implementation detail and isn't meant to be used by non-Godot servers. It may change without notice.
 *
*/
declare class NetworkedMultiplayerPeer extends PacketPeer {

  
/**
 * Manages the connection to network peers. Assigns unique IDs to each client connected to the server. See also [MultiplayerAPI].
 *
 * **Note:** The high-level multiplayer API protocol is an implementation detail and isn't meant to be used by non-Godot servers. It may change without notice.
 *
*/
  "new"(): NetworkedMultiplayerPeer;
  static "new"(): NetworkedMultiplayerPeer;



/** If [code]true[/code], this [NetworkedMultiplayerPeer] refuses new connections. */
refuse_new_connections: boolean;

/** The manner in which to send packets to the [code]target_peer[/code]. See [enum TransferMode]. */
transfer_mode: int;

/** Returns the current state of the connection. See [enum ConnectionStatus]. */
get_connection_status(): int;

/** Returns the ID of the [NetworkedMultiplayerPeer] who sent the most recent packet. */
get_packet_peer(): int;

/** Returns the ID of this [NetworkedMultiplayerPeer]. */
get_unique_id(): int;

/** Waits up to 1 second to receive a new network event. */
poll(): void;

/**
 * Sets the peer to which packets will be sent.
 *
 * The `id` can be one of: [constant TARGET_PEER_BROADCAST] to send to all connected peers, [constant TARGET_PEER_SERVER] to send to the peer acting as server, a valid peer ID to send to that specific peer, a negative peer ID to send to all peers except that one. By default, the target peer is [constant TARGET_PEER_BROADCAST].
 *
*/
set_target_peer(id: int): void;

  // connect<T extends SignalsOf<NetworkedMultiplayerPeer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<NetworkedMultiplayerPeerSignals>>(signal: T, method: SignalFunction<NetworkedMultiplayerPeerSignals[T]>): number;



/**
 * Packets are not acknowledged, no resend attempts are made for lost packets. Packets may arrive in any order. Potentially faster than [constant TRANSFER_MODE_UNRELIABLE_ORDERED]. Use for non-critical data, and always consider whether the order matters.
 *
*/
static TRANSFER_MODE_UNRELIABLE: any;

/**
 * Packets are not acknowledged, no resend attempts are made for lost packets. Packets are received in the order they were sent in. Potentially faster than [constant TRANSFER_MODE_RELIABLE]. Use for non-critical data or data that would be outdated if received late due to resend attempt(s) anyway, for example movement and positional data.
 *
*/
static TRANSFER_MODE_UNRELIABLE_ORDERED: any;

/**
 * Packets must be received and resend attempts should be made until the packets are acknowledged. Packets must be received in the order they were sent in. Most reliable transfer mode, but potentially the slowest due to the overhead. Use for critical data that must be transmitted and arrive in order, for example an ability being triggered or a chat message. Consider carefully if the information really is critical, and use sparingly.
 *
*/
static TRANSFER_MODE_RELIABLE: any;

/**
 * The ongoing connection disconnected.
 *
*/
static CONNECTION_DISCONNECTED: any;

/**
 * A connection attempt is ongoing.
 *
*/
static CONNECTION_CONNECTING: any;

/**
 * The connection attempt succeeded.
 *
*/
static CONNECTION_CONNECTED: any;

/**
 * Packets are sent to the server and then redistributed to other peers.
 *
*/
static TARGET_PEER_BROADCAST: any;

/**
 * Packets are sent to the server alone.
 *
*/
static TARGET_PEER_SERVER: any;

}

declare class NetworkedMultiplayerPeerSignals extends PacketPeerSignals {
  /**
 * Emitted when a connection attempt fails.
 *
*/
connection_failed: Signal<() => void>

/**
 * Emitted when a connection attempt succeeds.
 *
*/
connection_succeeded: Signal<() => void>

/**
 * Emitted by the server when a client connects.
 *
*/
peer_connected: Signal<(id: int) => void>

/**
 * Emitted by the server when a client disconnects.
 *
*/
peer_disconnected: Signal<(id: int) => void>

/**
 * Emitted by clients when the server disconnects.
 *
*/
server_disconnected: Signal<() => void>

}
