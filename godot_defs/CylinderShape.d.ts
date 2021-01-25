
/**
 * Cylinder shape for collisions.
 *
*/
declare class CylinderShape extends Shape {

  
/**
 * Cylinder shape for collisions.
 *
*/
  "new"(): CylinderShape;
  static "new"(): CylinderShape;



/** The cylinder's height. */
height: float;

/** The cylinder's radius. */
radius: float;



  connect<T extends SignalsOf<CylinderShape>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
