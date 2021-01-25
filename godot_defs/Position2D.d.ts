
/**
 * Generic 2D position hint for editing. It's just like a plain [Node2D], but it displays as a cross in the 2D editor at all times. You can set cross' visual size by using the gizmo in the 2D editor while the node is selected.
 *
*/
declare class Position2D extends Node2D {

  
/**
 * Generic 2D position hint for editing. It's just like a plain [Node2D], but it displays as a cross in the 2D editor at all times. You can set cross' visual size by using the gizmo in the 2D editor while the node is selected.
 *
*/
  "new"(): Position2D;
  static "new"(): Position2D;






  connect<T extends SignalsOf<Position2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
