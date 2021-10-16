
/**
 * Panel container type. This container fits controls inside of the delimited area of a stylebox. It's useful for giving controls an outline.
 *
*/
declare class PanelContainer extends Container {

  
/**
 * Panel container type. This container fits controls inside of the delimited area of a stylebox. It's useful for giving controls an outline.
 *
*/
  "new"(): PanelContainer;
  static "new"(): PanelContainer;






  // connect<T extends SignalsOf<PanelContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PanelContainerSignals>>(signal: T, method: SignalFunction<PanelContainerSignals[T]>): number;




}

declare class PanelContainerSignals extends ContainerSignals {
  
}
