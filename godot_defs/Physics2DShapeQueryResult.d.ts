
/**
 * The result of a 2D shape query in [Physics2DServer]. See also [Physics2DShapeQueryParameters].
 *
*/
declare class Physics2DShapeQueryResult extends Reference {

  
/**
 * The result of a 2D shape query in [Physics2DServer]. See also [Physics2DShapeQueryParameters].
 *
*/
  "new"(): Physics2DShapeQueryResult;
  static "new"(): Physics2DShapeQueryResult;




/** Returns the number of objects that intersected with the shape. */
get_result_count(): int;

/** Returns the [Object] that intersected with the shape at index [code]idx[/code]. */
get_result_object(idx: int): Object;

/** Returns the instance ID of the [Object] that intersected with the shape at index [code]idx[/code]. */
get_result_object_id(idx: int): int;

/** Returns the child index of the object's [Shape] that intersected with the shape at index [code]idx[/code]. */
get_result_object_shape(idx: int): int;

/** Returns the [RID] of the object that intersected with the shape at index [code]idx[/code]. */
get_result_rid(idx: int): RID;

  connect<T extends SignalsOf<Physics2DShapeQueryResult>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
