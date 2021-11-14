
/**
 * Cylinder shape for collisions.
 *
*/
declare class CylinderShape extends Shape  {

  
/**
 * Cylinder shape for collisions.
 *
*/
  new(): CylinderShape; 
  static "new"(): CylinderShape 


/** The cylinder's height. */
height: float;

/** The cylinder's radius. */
radius: float;



  connect<T extends SignalsOf<CylinderShape>>(signal: T, method: SignalFunction<CylinderShape[T]>): number;






}

