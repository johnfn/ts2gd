
/**
 * SSL stream peer. This object can be used to connect to an SSL server or accept a single SSL client connection.
 *
*/
declare class StreamPeerSSL extends StreamPeer {

  
/**
 * SSL stream peer. This object can be used to connect to an SSL server or accept a single SSL client connection.
 *
*/
  "new"(): StreamPeerSSL;
  static "new"(): StreamPeerSSL;




/** Accepts a peer connection as a server using the given [code]private_key[/code] and providing the given [code]certificate[/code] to the client. You can pass the optional [code]chain[/code] parameter to provide additional CA chain information along with the certificate. */
accept_stream(stream: StreamPeer, private_key: CryptoKey, certificate: X509Certificate, chain?: X509Certificate): int;

/**
 * Connects to a peer using an underlying [StreamPeer] `stream`. If `validate_certs` is `true`, [StreamPeerSSL] will validate that the certificate presented by the peer matches the `for_hostname`.
 *
 * **Note:** Specifying a custom `valid_certificate` is not supported in HTML5 exports due to browsers restrictions.
 *
*/
connect_to_stream(stream: StreamPeer, validate_certs?: boolean, for_hostname?: string, valid_certificate?: X509Certificate): int;

/** Disconnects from host. */
disconnect_from_stream(): void;

/** Returns the status of the connection. See [enum Status] for values. */
get_status(): int;

/** Poll the connection to check for incoming bytes. Call this right before [method StreamPeer.get_available_bytes] for it to work properly. */
poll(): void;

  connect<T extends SignalsOf<StreamPeerSSL>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * A status representing a [StreamPeerSSL] that is disconnected.
 *
*/
static STATUS_DISCONNECTED: 0;

/**
 * A status representing a [StreamPeerSSL] during handshaking.
 *
*/
static STATUS_HANDSHAKING: 1;

/**
 * A status representing a [StreamPeerSSL] that is connected to a host.
 *
*/
static STATUS_CONNECTED: 2;

/**
 * A status representing a [StreamPeerSSL] in error state.
 *
*/
static STATUS_ERROR: 3;

/**
 * An error status that shows a mismatch in the SSL certificate domain presented by the host and the domain requested for validation.
 *
*/
static STATUS_ERROR_HOSTNAME_MISMATCH: 4;


  
}
