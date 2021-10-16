
/**
 * Vertical split container. See [SplitContainer]. This goes from top to bottom.
 *
*/
declare class VSplitContainer extends SplitContainer {

  
/**
 * Vertical split container. See [SplitContainer]. This goes from top to bottom.
 *
*/
  "new"(): VSplitContainer;
  static "new"(): VSplitContainer;






  // connect<T extends SignalsOf<VSplitContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VSplitContainerSignals>>(signal: T, method: SignalFunction<VSplitContainerSignals[T]>): number;




}

declare class VSplitContainerSignals extends SplitContainerSignals {
  
}
