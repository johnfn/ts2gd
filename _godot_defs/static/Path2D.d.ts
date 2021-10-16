
/**
 * Can have [PathFollow2D] child nodes moving along the [Curve2D]. See [PathFollow2D] for more information on usage.
 *
 * **Note:** The path is considered as relative to the moved nodes (children of [PathFollow2D]). As such, the curve should usually start with a zero vector (`(0, 0)`).
 *
*/
declare class Path2D extends Node2D {

  
/**
 * Can have [PathFollow2D] child nodes moving along the [Curve2D]. See [PathFollow2D] for more information on usage.
 *
 * **Note:** The path is considered as relative to the moved nodes (children of [PathFollow2D]). As such, the curve should usually start with a zero vector (`(0, 0)`).
 *
*/
  "new"(): Path2D;
  static "new"(): Path2D;



/** A [Curve2D] describing the path. */
curve: Curve2D;




  // connect<T extends SignalsOf<Path2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Path2DSignals>>(signal: T, method: SignalFunction<Path2DSignals[T]>): number;




}

declare class Path2DSignals extends Node2DSignals {
  
}
