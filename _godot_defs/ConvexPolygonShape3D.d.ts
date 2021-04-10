
/**
 * Convex polygon shape resource, which can be added to a [PhysicsBody3D] or area.
 *
*/
declare class ConvexPolygonShape3D extends Shape3D {

  
/**
 * Convex polygon shape resource, which can be added to a [PhysicsBody3D] or area.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The list of 3D points forming the convex polygon shape. */
points: PackedVector3Array;



  connect<T extends SignalsOf<ConvexPolygonShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
