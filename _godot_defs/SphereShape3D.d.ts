
/**
 * Sphere shape for 3D collisions, which can be set into a [PhysicsBody3D] or [Area3D]. This shape is useful for modeling sphere-like 3D objects.
 *
*/
declare class SphereShape3D extends Shape3D {

  
/**
 * Sphere shape for 3D collisions, which can be set into a [PhysicsBody3D] or [Area3D]. This shape is useful for modeling sphere-like 3D objects.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The sphere's radius. The shape's diameter is double the radius. */
radius: float;



  connect<T extends SignalsOf<SphereShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
