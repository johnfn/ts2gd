
/**
 * Horizontal separator. See [Separator]. Even though it looks horizontal, it is used to separate objects vertically.
 *
*/
declare class HSeparator extends Separator {

  
/**
 * Horizontal separator. See [Separator]. Even though it looks horizontal, it is used to separate objects vertically.
 *
*/
  "new"(): HSeparator;
  static "new"(): HSeparator;






  // connect<T extends SignalsOf<HSeparator>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<HSeparatorSignals>>(signal: T, method: SignalFunction<HSeparatorSignals[T]>): number;




}

declare class HSeparatorSignals extends SeparatorSignals {
  
}
