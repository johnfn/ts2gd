
/**
 * Panel is a [Control] that displays an opaque background. It's commonly used as a parent and container for other types of [Control] nodes.
 *
*/
declare class Panel extends Control {

  
/**
 * Panel is a [Control] that displays an opaque background. It's commonly used as a parent and container for other types of [Control] nodes.
 *
*/
  "new"(): Panel;
  static "new"(): Panel;






  connect<T extends SignalsOf<Panel>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
