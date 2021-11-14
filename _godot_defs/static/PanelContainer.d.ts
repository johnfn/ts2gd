
/**
 * Panel container type. This container fits controls inside of the delimited area of a stylebox. It's useful for giving controls an outline.
 *
*/
declare class PanelContainer extends Container  {

  
/**
 * Panel container type. This container fits controls inside of the delimited area of a stylebox. It's useful for giving controls an outline.
 *
*/
  new(): PanelContainer; 
  static "new"(): PanelContainer 





  connect<T extends SignalsOf<PanelContainer>>(signal: T, method: SignalFunction<PanelContainer[T]>): number;






}

