
/**
 * Vertical version of [Separator]. Even though it looks vertical, it is used to separate objects horizontally.
 *
*/
declare class VSeparator extends Separator {

  
/**
 * Vertical version of [Separator]. Even though it looks vertical, it is used to separate objects horizontally.
 *
*/
  "new"(): VSeparator;
  static "new"(): VSeparator;






  // connect<T extends SignalsOf<VSeparator>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VSeparatorSignals>>(signal: T, method: SignalFunction<VSeparatorSignals[T]>): number;




}

declare class VSeparatorSignals extends SeparatorSignals {
  
}
