
/**
 * Concave polygon 2D shape resource for physics. It is made out of segments and is optimal for complex polygonal concave collisions. However, it is not advised to use for [RigidBody2D] nodes. A CollisionPolygon2D in convex decomposition mode (solids) or several convex objects are advised for that instead. Otherwise, a concave polygon 2D shape is better for static collisions.
 *
 * The main difference between a [ConvexPolygonShape2D] and a [ConcavePolygonShape2D] is that a concave polygon assumes it is concave and uses a more complex method of collision detection, and a convex one forces itself to be convex in order to speed up collision detection.
 *
*/
declare class ConcavePolygonShape2D extends Shape2D  {

  
/**
 * Concave polygon 2D shape resource for physics. It is made out of segments and is optimal for complex polygonal concave collisions. However, it is not advised to use for [RigidBody2D] nodes. A CollisionPolygon2D in convex decomposition mode (solids) or several convex objects are advised for that instead. Otherwise, a concave polygon 2D shape is better for static collisions.
 *
 * The main difference between a [ConvexPolygonShape2D] and a [ConcavePolygonShape2D] is that a concave polygon assumes it is concave and uses a more complex method of collision detection, and a convex one forces itself to be convex in order to speed up collision detection.
 *
*/
  new(): ConcavePolygonShape2D; 
  static "new"(): ConcavePolygonShape2D 


/** The array of points that make up the [ConcavePolygonShape2D]'s line segments. */
segments: PoolVector2Array;



  connect<T extends SignalsOf<ConcavePolygonShape2D>>(signal: T, method: SignalFunction<ConcavePolygonShape2D[T]>): number;






}

