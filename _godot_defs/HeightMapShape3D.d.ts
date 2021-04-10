
/**
 * Height map shape resource, which can be added to a [PhysicsBody3D] or [Area3D].
 *
*/
declare class HeightMapShape3D extends Shape3D {

  
/**
 * Height map shape resource, which can be added to a [PhysicsBody3D] or [Area3D].
 *
*/
  "new"(): this;
  static "new"(): this;



/** Height map data, pool array must be of [member map_width] * [member map_depth] size. */
map_data: PackedFloat32Array;

/** Depth of the height map data. Changing this will resize the [member map_data]. */
map_depth: int;

/** Width of the height map data. Changing this will resize the [member map_data]. */
map_width: int;



  connect<T extends SignalsOf<HeightMapShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
