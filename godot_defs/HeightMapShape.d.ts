
/**
 * Height map shape resource, which can be added to a [PhysicsBody] or [Area].
 *
*/
declare class HeightMapShape extends Shape {

  
/**
 * Height map shape resource, which can be added to a [PhysicsBody] or [Area].
 *
*/
  "new"(): HeightMapShape;
  static "new"(): HeightMapShape;



/** Height map data, pool array must be of [member map_width] * [member map_depth] size. */
map_data: PoolRealArray;

/** Depth of the height map data. Changing this will resize the [member map_data]. */
map_depth: int;

/** Width of the height map data. Changing this will resize the [member map_data]. */
map_width: int;



  connect<T extends SignalsOf<HeightMapShape>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
