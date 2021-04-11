
/**
 * A simple server that opens a UDP socket and returns connected [PacketPeerUDP] upon receiving new packets. See also [method PacketPeerUDP.connect_to_host].
 *
 * After starting the server ([method listen]), you will need to [method poll] it at regular intervals (e.g. inside [method Node._process]) for it to process new packets, delivering them to the appropriate [PacketPeerUDP], and taking new connections.
 *
 * Below a small example of how it can be used:
 *
 * @example 
 * 
 * # server.gd
 * extends Node
 * var server := UDPServer.new()
 * var peers = []
 * func _ready():
 *     server.listen(4242)
 * func _process(delta):
 *     server.poll() # Important!
 *     if server.is_connection_available():
 *         var peer : PacketPeerUDP = server.take_connection()
 *         var pkt = peer.get_packet()
 *         print("Accepted peer: %s:%s" % [peer.get_packet_ip(), peer.get_packet_port()])
 *         print("Received data: %s" % [pkt.get_string_from_utf8()])
 *         # Reply so it knows we received the message.
 *         peer.put_packet(pkt)
 *         # Keep a reference so we can keep contacting the remote peer.
 *         peers.append(peer)
 *     for i in range(0, peers.size()):
 *         pass # Do something with the connected peers.
 * @summary 
 * 
 *
 * @example 
 * 
 * # client.gd
 * extends Node
 * var udp := PacketPeerUDP.new()
 * var connected = false
 * func _ready():
 *     udp.connect_to_host("127.0.0.1", 4242)
 * func _process(delta):
 *     if !connected:
 *         # Try to contact server
 *         udp.put_packet("The answer is... 42!".to_utf8())
 *     if udp.get_available_packet_count() > 0:
 *         print("Connected: %s" % udp.get_packet().get_string_from_utf8())
 *         connected = true
 * @summary 
 * 
 *
*/
declare class UDPServer extends Reference {

  
/**
 * A simple server that opens a UDP socket and returns connected [PacketPeerUDP] upon receiving new packets. See also [method PacketPeerUDP.connect_to_host].
 *
 * After starting the server ([method listen]), you will need to [method poll] it at regular intervals (e.g. inside [method Node._process]) for it to process new packets, delivering them to the appropriate [PacketPeerUDP], and taking new connections.
 *
 * Below a small example of how it can be used:
 *
 * @example 
 * 
 * # server.gd
 * extends Node
 * var server := UDPServer.new()
 * var peers = []
 * func _ready():
 *     server.listen(4242)
 * func _process(delta):
 *     server.poll() # Important!
 *     if server.is_connection_available():
 *         var peer : PacketPeerUDP = server.take_connection()
 *         var pkt = peer.get_packet()
 *         print("Accepted peer: %s:%s" % [peer.get_packet_ip(), peer.get_packet_port()])
 *         print("Received data: %s" % [pkt.get_string_from_utf8()])
 *         # Reply so it knows we received the message.
 *         peer.put_packet(pkt)
 *         # Keep a reference so we can keep contacting the remote peer.
 *         peers.append(peer)
 *     for i in range(0, peers.size()):
 *         pass # Do something with the connected peers.
 * @summary 
 * 
 *
 * @example 
 * 
 * # client.gd
 * extends Node
 * var udp := PacketPeerUDP.new()
 * var connected = false
 * func _ready():
 *     udp.connect_to_host("127.0.0.1", 4242)
 * func _process(delta):
 *     if !connected:
 *         # Try to contact server
 *         udp.put_packet("The answer is... 42!".to_utf8())
 *     if udp.get_available_packet_count() > 0:
 *         print("Connected: %s" % udp.get_packet().get_string_from_utf8())
 *         connected = true
 * @summary 
 * 
 *
*/
  "new"(): UDPServer;
  static "new"(): UDPServer;



/** Define the maximum number of pending connections, during [method poll], any new pending connection exceeding that value will be automatically dropped. Setting this value to [code]0[/code] effectively prevents any new pending connection to be accepted (e.g. when all your players have connected). */
max_pending_connections: int;

/** Returns [code]true[/code] if a packet with a new address/port combination was received on the socket. */
is_connection_available(): boolean;

/** Returns [code]true[/code] if the socket is open and listening on a port. */
is_listening(): boolean;

/** Starts the server by opening a UDP socket listening on the given port. You can optionally specify a [code]bind_address[/code] to only listen for packets sent to that address. See also [method PacketPeerUDP.listen]. */
listen(port: int, bind_address?: string): int;

/** Call this method at regular intervals (e.g. inside [method Node._process]) to process new packets. And packet from known address/port pair will be delivered to the appropriate [PacketPeerUDP], any packet received from an unknown address/port pair will be added as a pending connection (see [method is_connection_available], [method take_connection]). The maximum number of pending connection is defined via [member max_pending_connections]. */
poll(): int;

/** Stops the server, closing the UDP socket if open. Will close all connected [PacketPeerUDP] accepted via [method take_connection] (remote peers will not be notified). */
stop(): void;

/** Returns the first pending connection (connected to the appropriate address/port). Will return [code]null[/code] if no new connection is available. See also [method is_connection_available], [method PacketPeerUDP.connect_to_host]. */
take_connection(): PacketPeerUDP;

  connect<T extends SignalsOf<UDPServer>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
