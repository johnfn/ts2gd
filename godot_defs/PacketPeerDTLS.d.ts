
/**
 * This class represents a DTLS peer connection. It can be used to connect to a DTLS server, and is returned by [method DTLSServer.take_connection].
 *
*/
declare class PacketPeerDTLS extends PacketPeer {

  
/**
 * This class represents a DTLS peer connection. It can be used to connect to a DTLS server, and is returned by [method DTLSServer.take_connection].
 *
*/
  "new"(): PacketPeerDTLS;
  static "new"(): PacketPeerDTLS;




/** Connects a [code]peer[/code] beginning the DTLS handshake using the underlying [PacketPeerUDP] which must be connected (see [method PacketPeerUDP.connect_to_host]). If [code]validate_certs[/code] is [code]true[/code], [PacketPeerDTLS] will validate that the certificate presented by the remote peer and match it with the [code]for_hostname[/code] argument. You can specify a custom [X509Certificate] to use for validation via the [code]valid_certificate[/code] argument. */
connect_to_peer(packet_peer: PacketPeerUDP, validate_certs?: boolean, for_hostname?: string, valid_certificate?: X509Certificate): int;

/** Disconnects this peer, terminating the DTLS session. */
disconnect_from_peer(): void;

/** Returns the status of the connection. See [enum Status] for values. */
get_status(): int;

/** Poll the connection to check for incoming packets. Call this frequently to update the status and keep the connection working. */
poll(): void;

  connect<T extends SignalsOf<PacketPeerDTLS>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * A status representing a [PacketPeerDTLS] that is disconnected.
 *
*/
static STATUS_DISCONNECTED: 0;

/**
 * A status representing a [PacketPeerDTLS] that is currently performing the handshake with a remote peer.
 *
*/
static STATUS_HANDSHAKING: 1;

/**
 * A status representing a [PacketPeerDTLS] that is connected to a remote peer.
 *
*/
static STATUS_CONNECTED: 2;

/**
 * A status representing a [PacketPeerDTLS] in a generic error state.
 *
*/
static STATUS_ERROR: 3;

/**
 * An error status that shows a mismatch in the DTLS certificate domain presented by the host and the domain requested for validation.
 *
*/
static STATUS_ERROR_HOSTNAME_MISMATCH: 4;


  
}
