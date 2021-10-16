
/**
*/
declare class PackedDataContainer extends Resource {

  
/**
*/
  "new"(): PackedDataContainer;
  static "new"(): PackedDataContainer;




/** No documentation provided. */
pack(value: any): int;

/** No documentation provided. */
size(): int;

  // connect<T extends SignalsOf<PackedDataContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PackedDataContainerSignals>>(signal: T, method: SignalFunction<PackedDataContainerSignals[T]>): number;




}

declare class PackedDataContainerSignals extends ResourceSignals {
  
}
