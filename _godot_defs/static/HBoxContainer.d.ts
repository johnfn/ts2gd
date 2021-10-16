
/**
 * Horizontal box container. See [BoxContainer].
 *
*/
declare class HBoxContainer extends BoxContainer {

  
/**
 * Horizontal box container. See [BoxContainer].
 *
*/
  "new"(): HBoxContainer;
  static "new"(): HBoxContainer;






  // connect<T extends SignalsOf<HBoxContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<HBoxContainerSignals>>(signal: T, method: SignalFunction<HBoxContainerSignals[T]>): number;




}

declare class HBoxContainerSignals extends BoxContainerSignals {
  
}
