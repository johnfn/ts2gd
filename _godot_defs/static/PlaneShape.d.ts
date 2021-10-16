
/**
 * An infinite plane shape for 3D collisions. Note that the [Plane]'s normal matters; anything "below" the plane will collide with it. If the [PlaneShape] is used in a [PhysicsBody], it will cause colliding objects placed "below" it to teleport "above" the plane.
 *
*/
declare class PlaneShape extends Shape {

  
/**
 * An infinite plane shape for 3D collisions. Note that the [Plane]'s normal matters; anything "below" the plane will collide with it. If the [PlaneShape] is used in a [PhysicsBody], it will cause colliding objects placed "below" it to teleport "above" the plane.
 *
*/
  "new"(): PlaneShape;
  static "new"(): PlaneShape;



/** The [Plane] used by the [PlaneShape] for collision. */
plane: Plane;



  // connect<T extends SignalsOf<PlaneShape>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PlaneShapeSignals>>(signal: T, method: SignalFunction<PlaneShapeSignals[T]>): number;




}

declare class PlaneShapeSignals extends ShapeSignals {
  
}
