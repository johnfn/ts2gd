
/**
 * Editor facility that helps you draw a 2D polygon used as resource for [LightOccluder2D].
 *
*/
declare class OccluderPolygon2D extends Resource {

  
/**
 * Editor facility that helps you draw a 2D polygon used as resource for [LightOccluder2D].
 *
*/
  "new"(): OccluderPolygon2D;
  static "new"(): OccluderPolygon2D;



/** If [code]true[/code], closes the polygon. A closed OccluderPolygon2D occludes the light coming from any direction. An opened OccluderPolygon2D occludes the light only at its outline's direction. */
closed: boolean;

/** The culling mode to use. */
cull_mode: int;

/**
 * A [Vector2] array with the index for polygon's vertices positions.
 *
 * **Note:** The returned value is a copy of the underlying array, rather than a reference.
 *
*/
polygon: PoolVector2Array;



  connect<T extends SignalsOf<OccluderPolygon2D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Culling is disabled. See [member cull_mode].
 *
*/
static CULL_DISABLED: 0;

/**
 * Culling is performed in the clockwise direction. See [member cull_mode].
 *
*/
static CULL_CLOCKWISE: 1;

/**
 * Culling is performed in the counterclockwise direction. See [member cull_mode].
 *
*/
static CULL_COUNTER_CLOCKWISE: 2;


  
}
