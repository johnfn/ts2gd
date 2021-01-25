
/**
 * Cylinder shape for collisions.
 *
*/
declare class CylinderShape3D extends Shape3D {

  
/**
 * Cylinder shape for collisions.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The cylinder's height. */
height: float;

/** The cylinder's radius. */
radius: float;



  connect<T extends SignalsOf<CylinderShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
