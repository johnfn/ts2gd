
/**
 * Allows editing a collision polygon's vertices on a selected plane. Can also set a depth perpendicular to that plane. This class is only available in the editor. It will not appear in the scene tree at run-time. Creates a [Shape3D] for gameplay. Properties modified during gameplay will have no effect.
 *
*/
declare class CollisionPolygon3D extends Node3D {

  
/**
 * Allows editing a collision polygon's vertices on a selected plane. Can also set a depth perpendicular to that plane. This class is only available in the editor. It will not appear in the scene tree at run-time. Creates a [Shape3D] for gameplay. Properties modified during gameplay will have no effect.
 *
*/
  "new"(): this;
  static "new"(): this;



/** Length that the resulting collision extends in either direction perpendicular to its polygon. */
depth: float;

/** If [code]true[/code], no collision will be produced. */
disabled: boolean;

/**
 * Array of vertices which define the polygon.
 *
 * **Note:** The returned value is a copy of the original. Methods which mutate the size or properties of the return value will not impact the original polygon. To change properties of the polygon, assign it to a temporary variable and make changes before reassigning the `polygon` member.
 *
*/
polygon: PackedVector2Array;



  connect<T extends SignalsOf<CollisionPolygon3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
