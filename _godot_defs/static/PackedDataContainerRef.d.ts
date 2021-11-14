
/**
*/
declare class PackedDataContainerRef extends Reference  {

  
/**
*/
  new(): PackedDataContainerRef; 
  static "new"(): PackedDataContainerRef 



/** No documentation provided. */
size(): int;

  connect<T extends SignalsOf<PackedDataContainerRef>>(signal: T, method: SignalFunction<PackedDataContainerRef[T]>): number;






}

