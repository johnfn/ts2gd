
/**
 * 3D box shape that can be a child of a [PhysicsBody] or [Area].
 *
*/
declare class BoxShape extends Shape {

  
/**
 * 3D box shape that can be a child of a [PhysicsBody] or [Area].
 *
*/
  "new"(): BoxShape;
  static "new"(): BoxShape;



/** The box's half extents. The width, height and depth of this shape is twice the half extents. */
extents: Vector3;



  // connect<T extends SignalsOf<BoxShape>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<BoxShapeSignals>>(signal: T, method: SignalFunction<BoxShapeSignals[T]>): number;




}

declare class BoxShapeSignals extends ShapeSignals {
  
}
