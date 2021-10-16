
/**
 * Segment shape for 2D collisions. Consists of two points, `a` and `b`.
 *
*/
declare class SegmentShape2D extends Shape2D {

  
/**
 * Segment shape for 2D collisions. Consists of two points, `a` and `b`.
 *
*/
  "new"(): SegmentShape2D;
  static "new"(): SegmentShape2D;



/** The segment's first point position. */
a: Vector2;

/** The segment's second point position. */
b: Vector2;



  // connect<T extends SignalsOf<SegmentShape2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<SegmentShape2DSignals>>(signal: T, method: SignalFunction<SegmentShape2DSignals[T]>): number;




}

declare class SegmentShape2DSignals extends Shape2DSignals {
  
}
