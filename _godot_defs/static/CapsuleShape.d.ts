
/**
 * Capsule shape for collisions.
 *
*/
declare class CapsuleShape extends Shape  {

  
/**
 * Capsule shape for collisions.
 *
*/
  new(): CapsuleShape; 
  static "new"(): CapsuleShape 


/** The capsule's height. */
height: float;

/** The capsule's radius. */
radius: float;



  connect<T extends SignalsOf<CapsuleShape>>(signal: T, method: SignalFunction<CapsuleShape[T]>): number;






}

