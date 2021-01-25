
/**
 * Capsule shape for collisions.
 *
*/
declare class CapsuleShape3D extends Shape3D {

  
/**
 * Capsule shape for collisions.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The capsule's height. */
height: float;

/** The capsule's radius. */
radius: float;



  connect<T extends SignalsOf<CapsuleShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
