
/**
 * This class implements most of the logic behind the high-level multiplayer API. See also [NetworkedMultiplayerPeer].
 *
 * By default, [SceneTree] has a reference to this class that is used to provide multiplayer capabilities (i.e. RPC/RSET) across the whole scene.
 *
 * It is possible to override the MultiplayerAPI instance used by specific Nodes by setting the [member Node.custom_multiplayer] property, effectively allowing to run both client and server in the same scene.
 *
 * **Note:** The high-level multiplayer API protocol is an implementation detail and isn't meant to be used by non-Godot servers. It may change without notice.
 *
*/
declare class MultiplayerAPI extends Reference  {

  
/**
 * This class implements most of the logic behind the high-level multiplayer API. See also [NetworkedMultiplayerPeer].
 *
 * By default, [SceneTree] has a reference to this class that is used to provide multiplayer capabilities (i.e. RPC/RSET) across the whole scene.
 *
 * It is possible to override the MultiplayerAPI instance used by specific Nodes by setting the [member Node.custom_multiplayer] property, effectively allowing to run both client and server in the same scene.
 *
 * **Note:** The high-level multiplayer API protocol is an implementation detail and isn't meant to be used by non-Godot servers. It may change without notice.
 *
*/
  new(): MultiplayerAPI; 
  static "new"(): MultiplayerAPI 


/**
 * If `true` (or if the [member network_peer] has [member PacketPeer.allow_object_decoding] set to `true`), the MultiplayerAPI will allow encoding and decoding of object during RPCs/RSETs.
 *
 * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
 *
*/
allow_object_decoding: boolean;

/** The peer object to handle the RPC system (effectively enabling networking when set). Depending on the peer itself, the MultiplayerAPI will become a network server (check with [method is_network_server]) and will set root node's network mode to master, or it will become a regular peer with root node set to puppet. All child nodes are set to inherit the network mode by default. Handling of networking-related events (connection, disconnection, new clients) is done by connecting to MultiplayerAPI's signals. */
network_peer: NetworkedMultiplayerPeer;

/** If [code]true[/code], the MultiplayerAPI's [member network_peer] refuses new incoming connections. */
refuse_new_network_connections: boolean;

/**
 * The root node to use for RPCs. Instead of an absolute path, a relative path will be used to find the node upon which the RPC should be executed.
 *
 * This effectively allows to have different branches of the scene tree to be managed by different MultiplayerAPI, allowing for example to run both client and server in the same scene.
 *
*/
root_node: Node;

/** Clears the current MultiplayerAPI network state (you shouldn't call this unless you know what you are doing). */
clear(): void;

/** Returns the peer IDs of all connected peers of this MultiplayerAPI's [member network_peer]. */
get_network_connected_peers(): PoolIntArray;

/** Returns the unique peer ID of this MultiplayerAPI's [member network_peer]. */
get_network_unique_id(): int;

/**
 * Returns the sender's peer ID for the RPC currently being executed.
 *
 * **Note:** If not inside an RPC this method will return 0.
 *
*/
get_rpc_sender_id(): int;

/** Returns [code]true[/code] if there is a [member network_peer] set. */
has_network_peer(): boolean;

/** Returns [code]true[/code] if this MultiplayerAPI's [member network_peer] is in server mode (listening for connections). */
is_network_server(): boolean;

/**
 * Method used for polling the MultiplayerAPI. You only need to worry about this if you are using [member Node.custom_multiplayer] override or you set [member SceneTree.multiplayer_poll] to `false`. By default, [SceneTree] will poll its MultiplayerAPI for you.
 *
 * **Note:** This method results in RPCs and RSETs being called, so they will be executed in the same context of this function (e.g. `_process`, `physics`, [Thread]).
 *
*/
poll(): void;

/** Sends the given raw [code]bytes[/code] to a specific peer identified by [code]id[/code] (see [method NetworkedMultiplayerPeer.set_target_peer]). Default ID is [code]0[/code], i.e. broadcast to all peers. */
send_bytes(bytes: PoolByteArray, id?: int, mode?: int): int;

  connect<T extends SignalsOf<MultiplayerAPI>>(signal: T, method: SignalFunction<MultiplayerAPI[T]>): number;



/**
 * Used with [method Node.rpc_config] or [method Node.rset_config] to disable a method or property for all RPC calls, making it unavailable. Default for all methods.
 *
*/
static RPC_MODE_DISABLED: any;

/**
 * Used with [method Node.rpc_config] or [method Node.rset_config] to set a method to be called or a property to be changed only on the remote end, not locally. Analogous to the `remote` keyword. Calls and property changes are accepted from all remote peers, no matter if they are node's master or puppets.
 *
*/
static RPC_MODE_REMOTE: any;

/**
 * Used with [method Node.rpc_config] or [method Node.rset_config] to set a method to be called or a property to be changed only on the network master for this node. Analogous to the `master` keyword. Only accepts calls or property changes from the node's network puppets, see [method Node.set_network_master].
 *
*/
static RPC_MODE_MASTER: any;

/**
 * Used with [method Node.rpc_config] or [method Node.rset_config] to set a method to be called or a property to be changed only on puppets for this node. Analogous to the `puppet` keyword. Only accepts calls or property changes from the node's network master, see [method Node.set_network_master].
 *
*/
static RPC_MODE_PUPPET: any;

/**
 * **Deprecated.** Use [constant RPC_MODE_PUPPET] instead. Analogous to the `slave` keyword.
 *
*/
static RPC_MODE_SLAVE: any;

/**
 * Behave like [constant RPC_MODE_REMOTE] but also make the call or property change locally. Analogous to the `remotesync` keyword.
 *
*/
static RPC_MODE_REMOTESYNC: any;

/**
 * **Deprecated.** Use [constant RPC_MODE_REMOTESYNC] instead. Analogous to the `sync` keyword.
 *
*/
static RPC_MODE_SYNC: any;

/**
 * Behave like [constant RPC_MODE_MASTER] but also make the call or property change locally. Analogous to the `mastersync` keyword.
 *
*/
static RPC_MODE_MASTERSYNC: any;

/**
 * Behave like [constant RPC_MODE_PUPPET] but also make the call or property change locally. Analogous to the `puppetsync` keyword.
 *
*/
static RPC_MODE_PUPPETSYNC: any;


/**
 * Emitted when this MultiplayerAPI's [member network_peer] successfully connected to a server. Only emitted on clients.
 *
*/
$connected_to_server: Signal<() => void>

/**
 * Emitted when this MultiplayerAPI's [member network_peer] fails to establish a connection to a server. Only emitted on clients.
 *
*/
$connection_failed: Signal<() => void>

/**
 * Emitted when this MultiplayerAPI's [member network_peer] connects with a new peer. ID is the peer ID of the new peer. Clients get notified when other clients connect to the same server. Upon connecting to a server, a client also receives this signal for the server (with ID being 1).
 *
*/
$network_peer_connected: Signal<(id: int) => void>

/**
 * Emitted when this MultiplayerAPI's [member network_peer] disconnects from a peer. Clients get notified when other clients disconnect from the same server.
 *
*/
$network_peer_disconnected: Signal<(id: int) => void>

/**
 * Emitted when this MultiplayerAPI's [member network_peer] receive a `packet` with custom data (see [method send_bytes]). ID is the peer ID of the peer that sent the packet.
 *
*/
$network_peer_packet: Signal<(id: int, packet: PoolByteArray) => void>

/**
 * Emitted when this MultiplayerAPI's [member network_peer] disconnects from server. Only emitted on clients.
 *
*/
$server_disconnected: Signal<() => void>

}

