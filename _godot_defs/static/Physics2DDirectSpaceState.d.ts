
/**
 * Direct access object to a space in the [Physics2DServer]. It's used mainly to do queries against objects and areas residing in a given space.
 *
*/
declare class Physics2DDirectSpaceState extends Object {

  
/**
 * Direct access object to a space in the [Physics2DServer]. It's used mainly to do queries against objects and areas residing in a given space.
 *
*/
  "new"(): Physics2DDirectSpaceState;
  static "new"(): Physics2DDirectSpaceState;




/**
 * Checks how far a [Shape2D] can move without colliding. All the parameters for the query, including the shape and the motion, are supplied through a [Physics2DShapeQueryParameters] object.
 *
 * Returns an array with the safe and unsafe proportions (between 0 and 1) of the motion. The safe proportion is the maximum fraction of the motion that can be made without a collision. The unsafe proportion is the minimum fraction of the distance that must be moved for a collision. If no collision is detected a result of `[1.0, 1.0]` will be returned.
 *
 * **Note:** Any [Shape2D]s that the shape is already colliding with e.g. inside of, will be ignored. Use [method collide_shape] to determine the [Shape2D]s that the shape is already colliding with.
 *
*/
cast_motion(shape: Physics2DShapeQueryParameters): any[];

/** Checks the intersections of a shape, given through a [Physics2DShapeQueryParameters] object, against the space. The resulting array contains a list of points where the shape intersects another. Like with [method intersect_shape], the number of returned results can be limited to save processing time. */
collide_shape(shape: Physics2DShapeQueryParameters, max_results?: int): any[];

/**
 * Checks the intersections of a shape, given through a [Physics2DShapeQueryParameters] object, against the space. If it collides with more than one shape, the nearest one is selected. If the shape did not intersect anything, then an empty dictionary is returned instead.
 *
 * **Note:** This method does not take into account the `motion` property of the object. The returned object is a dictionary containing the following fields:
 *
 * `collider_id`: The colliding object's ID.
 *
 * `linear_velocity`: The colliding object's velocity [Vector2]. If the object is an [Area2D], the result is `(0, 0)`.
 *
 * `metadata`: The intersecting shape's metadata. This metadata is different from [method Object.get_meta], and is set with [method Physics2DServer.shape_set_data].
 *
 * `normal`: The object's surface normal at the intersection point.
 *
 * `point`: The intersection point.
 *
 * `rid`: The intersecting object's [RID].
 *
 * `shape`: The shape index of the colliding shape.
 *
*/
get_rest_info(shape: Physics2DShapeQueryParameters): Dictionary<any, any>;

/**
 * Checks whether a point is inside any solid shape. The shapes the point is inside of are returned in an array containing dictionaries with the following fields:
 *
 * `collider`: The colliding object.
 *
 * `collider_id`: The colliding object's ID.
 *
 * `metadata`: The intersecting shape's metadata. This metadata is different from [method Object.get_meta], and is set with [method Physics2DServer.shape_set_data].
 *
 * `rid`: The intersecting object's [RID].
 *
 * `shape`: The shape index of the colliding shape.
 *
 * Additionally, the method can take an `exclude` array of objects or [RID]s that are to be excluded from collisions, a `collision_mask` bitmask representing the physics layers to check in, or booleans to determine if the ray should collide with [PhysicsBody]s or [Area]s, respectively.
 *
 * **Note:** [ConcavePolygonShape2D]s and [CollisionPolygon2D]s in `Segments` build mode are not solid shapes. Therefore, they will not be detected.
 *
*/
intersect_point(point: Vector2, max_results?: int, exclude?: any[], collision_layer?: int, collide_with_bodies?: boolean, collide_with_areas?: boolean): any[];

/** No documentation provided. */
intersect_point_on_canvas(point: Vector2, canvas_instance_id: int, max_results?: int, exclude?: any[], collision_layer?: int, collide_with_bodies?: boolean, collide_with_areas?: boolean): any[];

/**
 * Intersects a ray in a given space. The returned object is a dictionary with the following fields:
 *
 * `collider`: The colliding object.
 *
 * `collider_id`: The colliding object's ID.
 *
 * `metadata`: The intersecting shape's metadata. This metadata is different from [method Object.get_meta], and is set with [method Physics2DServer.shape_set_data].
 *
 * `normal`: The object's surface normal at the intersection point.
 *
 * `position`: The intersection point.
 *
 * `rid`: The intersecting object's [RID].
 *
 * `shape`: The shape index of the colliding shape.
 *
 * If the ray did not intersect anything, then an empty dictionary is returned instead.
 *
 * Additionally, the method can take an `exclude` array of objects or [RID]s that are to be excluded from collisions, a `collision_mask` bitmask representing the physics layers to check in, or booleans to determine if the ray should collide with [PhysicsBody]s or [Area]s, respectively.
 *
*/
intersect_ray(from: Vector2, to: Vector2, exclude?: any[], collision_layer?: int, collide_with_bodies?: boolean, collide_with_areas?: boolean): Dictionary<any, any>;

/**
 * Checks the intersections of a shape, given through a [Physics2DShapeQueryParameters] object, against the space.
 *
 * **Note:** This method does not take into account the `motion` property of the object. The intersected shapes are returned in an array containing dictionaries with the following fields:
 *
 * `collider`: The colliding object.
 *
 * `collider_id`: The colliding object's ID.
 *
 * `metadata`: The intersecting shape's metadata. This metadata is different from [method Object.get_meta], and is set with [method Physics2DServer.shape_set_data].
 *
 * `rid`: The intersecting object's [RID].
 *
 * `shape`: The shape index of the colliding shape.
 *
 * The number of intersections can be limited with the `max_results` parameter, to reduce the processing time.
 *
*/
intersect_shape(shape: Physics2DShapeQueryParameters, max_results?: int): any[];

  // connect<T extends SignalsOf<Physics2DDirectSpaceState>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Physics2DDirectSpaceStateSignals>>(signal: T, method: SignalFunction<Physics2DDirectSpaceStateSignals[T]>): number;




}

declare class Physics2DDirectSpaceStateSignals extends ObjectSignals {
  
}
