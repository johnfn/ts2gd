
/**
 * Empty stylebox (really does not display anything).
 *
*/
declare class StyleBoxEmpty extends StyleBox {

  
/**
 * Empty stylebox (really does not display anything).
 *
*/
  "new"(): StyleBoxEmpty;
  static "new"(): StyleBoxEmpty;






  // connect<T extends SignalsOf<StyleBoxEmpty>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<StyleBoxEmptySignals>>(signal: T, method: SignalFunction<StyleBoxEmptySignals[T]>): number;




}

declare class StyleBoxEmptySignals extends StyleBoxSignals {
  
}
