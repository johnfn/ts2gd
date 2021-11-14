
/**
*/
declare class PackedDataContainer extends Resource  {

  
/**
*/
  new(): PackedDataContainer; 
  static "new"(): PackedDataContainer 



/** No documentation provided. */
pack(value: any): int;

/** No documentation provided. */
size(): int;

  connect<T extends SignalsOf<PackedDataContainer>>(signal: T, method: SignalFunction<PackedDataContainer[T]>): number;






}

