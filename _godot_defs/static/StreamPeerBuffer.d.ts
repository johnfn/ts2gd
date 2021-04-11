
/**
*/
declare class StreamPeerBuffer extends StreamPeer {

  
/**
*/
  "new"(): StreamPeerBuffer;
  static "new"(): StreamPeerBuffer;




/** No documentation provided. */
clear(): void;

/** No documentation provided. */
duplicate(): StreamPeerBuffer;

/** No documentation provided. */
get_position(): int;

/** No documentation provided. */
get_size(): int;

/** No documentation provided. */
resize(size: int): void;

/** No documentation provided. */
seek(position: int): void;

  connect<T extends SignalsOf<StreamPeerBuffer>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
