
/**
 * Convex polygon shape resource, which can be added to a [PhysicsBody] or area.
 *
*/
declare class ConvexPolygonShape extends Shape {

  
/**
 * Convex polygon shape resource, which can be added to a [PhysicsBody] or area.
 *
*/
  "new"(): ConvexPolygonShape;
  static "new"(): ConvexPolygonShape;



/** The list of 3D points forming the convex polygon shape. */
points: PoolVector3Array;



  // connect<T extends SignalsOf<ConvexPolygonShape>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ConvexPolygonShapeSignals>>(signal: T, method: SignalFunction<ConvexPolygonShapeSignals[T]>): number;




}

declare class ConvexPolygonShapeSignals extends ShapeSignals {
  
}
