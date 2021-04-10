
/**
 * PacketStreamPeer provides a wrapper for working using packets over a stream. This allows for using packet based code with StreamPeers. PacketPeerStream implements a custom protocol over the StreamPeer, so the user should not read or write to the wrapped StreamPeer directly.
 *
*/
declare class PacketPeerStream extends PacketPeer {

  
/**
 * PacketStreamPeer provides a wrapper for working using packets over a stream. This allows for using packet based code with StreamPeers. PacketPeerStream implements a custom protocol over the StreamPeer, so the user should not read or write to the wrapped StreamPeer directly.
 *
*/
  "new"(): PacketPeerStream;
  static "new"(): PacketPeerStream;





/** The wrapped [StreamPeer] object. */
stream_peer: StreamPeer;



  connect<T extends SignalsOf<PacketPeerStream>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
