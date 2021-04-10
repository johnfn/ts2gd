
/**
 * Ray shape for 3D collisions, which can be set into a [PhysicsBody3D] or [Area3D]. A ray is not really a collision body; instead, it tries to separate itself from whatever is touching its far endpoint. It's often useful for characters.
 *
*/
declare class RayShape3D extends Shape3D {

  
/**
 * Ray shape for 3D collisions, which can be set into a [PhysicsBody3D] or [Area3D]. A ray is not really a collision body; instead, it tries to separate itself from whatever is touching its far endpoint. It's often useful for characters.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The ray's length. */
length: float;

/** If [code]true[/code], allow the shape to return the correct normal. */
slips_on_slope: boolean;



  connect<T extends SignalsOf<RayShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
