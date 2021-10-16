
/**
 * Provides a 2D collision polygon to a [CollisionObject2D] parent. Polygons can be drawn in the editor or specified by a list of vertices.
 *
*/
declare class CollisionPolygon2D extends Node2D {

  
/**
 * Provides a 2D collision polygon to a [CollisionObject2D] parent. Polygons can be drawn in the editor or specified by a list of vertices.
 *
*/
  "new"(): CollisionPolygon2D;
  static "new"(): CollisionPolygon2D;



/** Collision build mode. Use one of the [enum BuildMode] constants. */
build_mode: int;

/** If [code]true[/code], no collisions will be detected. */
disabled: boolean;

/** If [code]true[/code], only edges that face up, relative to [CollisionPolygon2D]'s rotation, will collide with other objects. */
one_way_collision: boolean;

/** The margin used for one-way collision (in pixels). Higher values will make the shape thicker, and work better for colliders that enter the polygon at a high velocity. */
one_way_collision_margin: float;

/** The polygon's list of vertices. The final point will be connected to the first. The returned value is a clone of the [PoolVector2Array], not a reference. */
polygon: PoolVector2Array;



  // connect<T extends SignalsOf<CollisionPolygon2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CollisionPolygon2DSignals>>(signal: T, method: SignalFunction<CollisionPolygon2DSignals[T]>): number;



/**
 * Collisions will include the polygon and its contained area.
 *
*/
static BUILD_SOLIDS: any;

/**
 * Collisions will only include the polygon edges.
 *
*/
static BUILD_SEGMENTS: any;

}

declare class CollisionPolygon2DSignals extends Node2DSignals {
  
}
