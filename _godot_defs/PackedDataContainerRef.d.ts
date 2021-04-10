
/**
*/
declare class PackedDataContainerRef extends Reference {

  
/**
*/
  "new"(): PackedDataContainerRef;
  static "new"(): PackedDataContainerRef;




/** No documentation provided. */
size(): int;

  connect<T extends SignalsOf<PackedDataContainerRef>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
