
/**
 * Convex polygon shape for 2D physics. A convex polygon, whatever its shape, is internally decomposed into as many convex polygons as needed to ensure all collision checks against it are always done on convex polygons (which are faster to check).
 *
 * The main difference between a [ConvexPolygonShape2D] and a [ConcavePolygonShape2D] is that a concave polygon assumes it is concave and uses a more complex method of collision detection, and a convex one forces itself to be convex in order to speed up collision detection.
 *
*/
declare class ConvexPolygonShape2D extends Shape2D {

  
/**
 * Convex polygon shape for 2D physics. A convex polygon, whatever its shape, is internally decomposed into as many convex polygons as needed to ensure all collision checks against it are always done on convex polygons (which are faster to check).
 *
 * The main difference between a [ConvexPolygonShape2D] and a [ConcavePolygonShape2D] is that a concave polygon assumes it is concave and uses a more complex method of collision detection, and a convex one forces itself to be convex in order to speed up collision detection.
 *
*/
  "new"(): ConvexPolygonShape2D;
  static "new"(): ConvexPolygonShape2D;



/** The polygon's list of vertices. Can be in either clockwise or counterclockwise order. */
points: PoolVector2Array;

/** Based on the set of points provided, this creates and assigns the [member points] property using the convex hull algorithm. Removing all unneeded points. See [method Geometry.convex_hull_2d] for details. */
set_point_cloud(point_cloud: PoolVector2Array): void;

  connect<T extends SignalsOf<ConvexPolygonShape2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
