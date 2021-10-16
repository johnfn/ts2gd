
/**
 * Vertical box container. See [BoxContainer].
 *
*/
declare class VBoxContainer extends BoxContainer {

  
/**
 * Vertical box container. See [BoxContainer].
 *
*/
  "new"(): VBoxContainer;
  static "new"(): VBoxContainer;






  // connect<T extends SignalsOf<VBoxContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VBoxContainerSignals>>(signal: T, method: SignalFunction<VBoxContainerSignals[T]>): number;




}

declare class VBoxContainerSignals extends BoxContainerSignals {
  
}
