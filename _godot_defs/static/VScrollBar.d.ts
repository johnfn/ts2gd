
/**
 * Vertical version of [ScrollBar], which goes from top (min) to bottom (max).
 *
*/
declare class VScrollBar extends ScrollBar {

  
/**
 * Vertical version of [ScrollBar], which goes from top (min) to bottom (max).
 *
*/
  "new"(): VScrollBar;
  static "new"(): VScrollBar;







  // connect<T extends SignalsOf<VScrollBar>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VScrollBarSignals>>(signal: T, method: SignalFunction<VScrollBarSignals[T]>): number;




}

declare class VScrollBarSignals extends ScrollBarSignals {
  
}
