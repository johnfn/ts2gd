
/**
 * 3D box shape that can be a child of a [PhysicsBody3D] or [Area3D].
 *
*/
declare class BoxShape3D extends Shape3D {

  
/**
 * 3D box shape that can be a child of a [PhysicsBody3D] or [Area3D].
 *
*/
  "new"(): this;
  static "new"(): this;



/** The box's half extents. The width, height and depth of this shape is twice the half extents. */
extents: Vector3;



  connect<T extends SignalsOf<BoxShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
