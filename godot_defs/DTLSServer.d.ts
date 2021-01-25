
/**
 * This class is used to store the state of a DTLS server. Upon [method setup] it converts connected [PacketPeerUDP] to [PacketPeerDTLS] accepting them via [method take_connection] as DTLS clients. Under the hood, this class is used to store the DTLS state and cookies of the server. The reason of why the state and cookies are needed is outside of the scope of this documentation.
 *
 * Below a small example of how to use it:
 *
 * @example 
 * 
 * # server.gd
 * extends Node
 * var dtls := DTLSServer.new()
 * var server := UDPServer.new()
 * var peers = []
 * func _ready():
 *     server.listen(4242)
 *     var key = load("key.key") # Your private key.
 *     var cert = load("cert.crt") # Your X509 certificate.
 *     dtls.setup(key, cert)
 * func _process(delta):
 *     while server.is_connection_available():
 *         var peer : PacketPeerUDP = server.take_connection()
 *         var dtls_peer : PacketPeerDTLS = dtls.take_connection(peer)
 *         if dtls_peer.get_status() != PacketPeerDTLS.STATUS_HANDSHAKING:
 *             continue # It is normal that 50% of the connections fails due to cookie exchange.
 *         print("Peer connected!")
 *         peers.append(dtls_peer)
 *     for p in peers:
 *         p.poll() # Must poll to update the state.
 *         if p.get_status() == PacketPeerDTLS.STATUS_CONNECTED:
 *             while p.get_available_packet_count() > 0:
 *                 print("Received message from client: %s" % p.get_packet().get_string_from_utf8())
 *                 p.put_packet("Hello DTLS client".to_utf8())
 * @summary 
 * 
 *
 * @example 
 * 
 * # client.gd
 * extends Node
 * var dtls := PacketPeerDTLS.new()
 * var udp := PacketPeerUDP.new()
 * var connected = false
 * func _ready():
 *     udp.connect_to_host("127.0.0.1", 4242)
 *     dtls.connect_to_peer(udp, false) # Use true in production for certificate validation!
 * func _process(delta):
 *     dtls.poll()
 *     if dtls.get_status() == PacketPeerDTLS.STATUS_CONNECTED:
 *         if !connected:
 *             # Try to contact server
 *             dtls.put_packet("The answer is... 42!".to_utf8())
 *         while dtls.get_available_packet_count() > 0:
 *             print("Connected: %s" % dtls.get_packet().get_string_from_utf8())
 *             connected = true
 * @summary 
 * 
 *
*/
declare class DTLSServer extends Reference {

  
/**
 * This class is used to store the state of a DTLS server. Upon [method setup] it converts connected [PacketPeerUDP] to [PacketPeerDTLS] accepting them via [method take_connection] as DTLS clients. Under the hood, this class is used to store the DTLS state and cookies of the server. The reason of why the state and cookies are needed is outside of the scope of this documentation.
 *
 * Below a small example of how to use it:
 *
 * @example 
 * 
 * # server.gd
 * extends Node
 * var dtls := DTLSServer.new()
 * var server := UDPServer.new()
 * var peers = []
 * func _ready():
 *     server.listen(4242)
 *     var key = load("key.key") # Your private key.
 *     var cert = load("cert.crt") # Your X509 certificate.
 *     dtls.setup(key, cert)
 * func _process(delta):
 *     while server.is_connection_available():
 *         var peer : PacketPeerUDP = server.take_connection()
 *         var dtls_peer : PacketPeerDTLS = dtls.take_connection(peer)
 *         if dtls_peer.get_status() != PacketPeerDTLS.STATUS_HANDSHAKING:
 *             continue # It is normal that 50% of the connections fails due to cookie exchange.
 *         print("Peer connected!")
 *         peers.append(dtls_peer)
 *     for p in peers:
 *         p.poll() # Must poll to update the state.
 *         if p.get_status() == PacketPeerDTLS.STATUS_CONNECTED:
 *             while p.get_available_packet_count() > 0:
 *                 print("Received message from client: %s" % p.get_packet().get_string_from_utf8())
 *                 p.put_packet("Hello DTLS client".to_utf8())
 * @summary 
 * 
 *
 * @example 
 * 
 * # client.gd
 * extends Node
 * var dtls := PacketPeerDTLS.new()
 * var udp := PacketPeerUDP.new()
 * var connected = false
 * func _ready():
 *     udp.connect_to_host("127.0.0.1", 4242)
 *     dtls.connect_to_peer(udp, false) # Use true in production for certificate validation!
 * func _process(delta):
 *     dtls.poll()
 *     if dtls.get_status() == PacketPeerDTLS.STATUS_CONNECTED:
 *         if !connected:
 *             # Try to contact server
 *             dtls.put_packet("The answer is... 42!".to_utf8())
 *         while dtls.get_available_packet_count() > 0:
 *             print("Connected: %s" % dtls.get_packet().get_string_from_utf8())
 *             connected = true
 * @summary 
 * 
 *
*/
  "new"(): DTLSServer;
  static "new"(): DTLSServer;




/** Setup the DTLS server to use the given [code]private_key[/code] and provide the given [code]certificate[/code] to clients. You can pass the optional [code]chain[/code] parameter to provide additional CA chain information along with the certificate. */
setup(key: CryptoKey, certificate: X509Certificate, chain?: X509Certificate): int;

/**
 * Try to initiate the DTLS handshake with the given `udp_peer` which must be already connected (see [method PacketPeerUDP.connect_to_host]).
 *
 * **Note**: You must check that the state of the return PacketPeerUDP is [constant PacketPeerDTLS.STATUS_HANDSHAKING], as it is normal that 50% of the new connections will be invalid due to cookie exchange.
 *
*/
take_connection(udp_peer: PacketPeerUDP): PacketPeerDTLS;

  connect<T extends SignalsOf<DTLSServer>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
