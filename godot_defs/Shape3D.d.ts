
/**
 * Base class for all 3D shape resources. Nodes that inherit from this can be used as shapes for a [PhysicsBody3D] or [Area3D] objects.
 *
*/
declare class Shape3D extends Resource {

  
/**
 * Base class for all 3D shape resources. Nodes that inherit from this can be used as shapes for a [PhysicsBody3D] or [Area3D] objects.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The collision margin for the shape. */
margin: float;



  connect<T extends SignalsOf<Shape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
