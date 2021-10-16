
/**
 * Capsule shape for collisions.
 *
*/
declare class CapsuleShape extends Shape {

  
/**
 * Capsule shape for collisions.
 *
*/
  "new"(): CapsuleShape;
  static "new"(): CapsuleShape;



/** The capsule's height. */
height: float;

/** The capsule's radius. */
radius: float;



  // connect<T extends SignalsOf<CapsuleShape>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CapsuleShapeSignals>>(signal: T, method: SignalFunction<CapsuleShapeSignals[T]>): number;




}

declare class CapsuleShapeSignals extends ShapeSignals {
  
}
