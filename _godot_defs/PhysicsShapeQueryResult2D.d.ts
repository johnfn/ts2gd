
/**
 * The result of a 2D shape query in [PhysicsServer2D]. See also [PhysicsShapeQueryParameters2D].
 *
*/
declare class PhysicsShapeQueryResult2D extends Reference {

  
/**
 * The result of a 2D shape query in [PhysicsServer2D]. See also [PhysicsShapeQueryParameters2D].
 *
*/
  "new"(): this;
  static "new"(): this;




/** Returns the number of objects that intersected with the shape. */
get_result_count(): int;

/** Returns the [Object] that intersected with the shape at index [code]idx[/code]. */
get_result_object(idx: int): Object;

/** Returns the instance ID of the [Object] that intersected with the shape at index [code]idx[/code]. */
get_result_object_id(idx: int): int;

/** Returns the child index of the object's [Shape2D] that intersected with the shape at index [code]idx[/code]. */
get_result_object_shape(idx: int): int;

/** Returns the [RID] of the object that intersected with the shape at index [code]idx[/code]. */
get_result_rid(idx: int): RID;

  connect<T extends SignalsOf<PhysicsShapeQueryResult2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
