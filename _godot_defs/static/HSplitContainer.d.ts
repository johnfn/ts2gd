
/**
 * Horizontal split container. See [SplitContainer]. This goes from left to right.
 *
*/
declare class HSplitContainer extends SplitContainer {

  
/**
 * Horizontal split container. See [SplitContainer]. This goes from left to right.
 *
*/
  "new"(): HSplitContainer;
  static "new"(): HSplitContainer;






  // connect<T extends SignalsOf<HSplitContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<HSplitContainerSignals>>(signal: T, method: SignalFunction<HSplitContainerSignals[T]>): number;




}

declare class HSplitContainerSignals extends SplitContainerSignals {
  
}
