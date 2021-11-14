
/**
 * Panel is a [Control] that displays an opaque background. It's commonly used as a parent and container for other types of [Control] nodes.
 *
*/
declare class Panel extends Control  {

  
/**
 * Panel is a [Control] that displays an opaque background. It's commonly used as a parent and container for other types of [Control] nodes.
 *
*/
  new(): Panel; 
  static "new"(): Panel 





  connect<T extends SignalsOf<Panel>>(signal: T, method: SignalFunction<Panel[T]>): number;






}

