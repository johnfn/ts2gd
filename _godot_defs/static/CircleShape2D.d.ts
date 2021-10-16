
/**
 * Circular shape for 2D collisions. This shape is useful for modeling balls or small characters and its collision detection with everything else is very fast.
 *
*/
declare class CircleShape2D extends Shape2D {

  
/**
 * Circular shape for 2D collisions. This shape is useful for modeling balls or small characters and its collision detection with everything else is very fast.
 *
*/
  "new"(): CircleShape2D;
  static "new"(): CircleShape2D;



/** The circle's radius. */
radius: float;



  // connect<T extends SignalsOf<CircleShape2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CircleShape2DSignals>>(signal: T, method: SignalFunction<CircleShape2DSignals[T]>): number;




}

declare class CircleShape2DSignals extends Shape2DSignals {
  
}
