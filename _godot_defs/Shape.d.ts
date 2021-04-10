
/**
 * Base class for all 3D shape resources. Nodes that inherit from this can be used as shapes for a [PhysicsBody] or [Area] objects.
 *
*/
declare class Shape extends Resource {

  
/**
 * Base class for all 3D shape resources. Nodes that inherit from this can be used as shapes for a [PhysicsBody] or [Area] objects.
 *
*/
  "new"(): Shape;
  static "new"(): Shape;



/** The collision margin for the shape. */
margin: float;



  connect<T extends SignalsOf<Shape>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
