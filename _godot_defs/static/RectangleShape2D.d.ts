
/**
 * Rectangle shape for 2D collisions. This shape is useful for modeling box-like 2D objects.
 *
*/
declare class RectangleShape2D extends Shape2D {

  
/**
 * Rectangle shape for 2D collisions. This shape is useful for modeling box-like 2D objects.
 *
*/
  "new"(): RectangleShape2D;
  static "new"(): RectangleShape2D;



/** The rectangle's half extents. The width and height of this shape is twice the half extents. */
extents: Vector2;



  // connect<T extends SignalsOf<RectangleShape2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<RectangleShape2DSignals>>(signal: T, method: SignalFunction<RectangleShape2DSignals[T]>): number;




}

declare class RectangleShape2DSignals extends Shape2DSignals {
  
}
