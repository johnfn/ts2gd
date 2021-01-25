
/**
 * Direct access object to a space in the [PhysicsServer3D]. It's used mainly to do queries against objects and areas residing in a given space.
 *
*/
declare class PhysicsDirectSpaceState3D extends Object {

  
/**
 * Direct access object to a space in the [PhysicsServer3D]. It's used mainly to do queries against objects and areas residing in a given space.
 *
*/
  "new"(): this;
  static "new"(): this;




/**
 * Checks whether the shape can travel to a point. The method will return an array with two floats between 0 and 1, both representing a fraction of `motion`. The first is how far the shape can move without triggering a collision, and the second is the point at which a collision will occur. If no collision is detected, the returned array will be `[1, 1]`.
 *
 * If the shape can not move, the returned array will be `[0, 0]` under Bullet, and empty under GodotPhysics3D.
 *
*/
cast_motion(shape: PhysicsShapeQueryParameters3D, motion: Vector3): any[];

/** Checks the intersections of a shape, given through a [PhysicsShapeQueryParameters3D] object, against the space. The resulting array contains a list of points where the shape intersects another. Like with [method intersect_shape], the number of returned results can be limited to save processing time. */
collide_shape(shape: PhysicsShapeQueryParameters3D, max_results?: int): any[];

/**
 * Checks the intersections of a shape, given through a [PhysicsShapeQueryParameters3D] object, against the space. If it collides with more than one shape, the nearest one is selected. The returned object is a dictionary containing the following fields:
 *
 * `collider_id`: The colliding object's ID.
 *
 * `linear_velocity`: The colliding object's velocity [Vector3]. If the object is an [Area3D], the result is `(0, 0, 0)`.
 *
 * `normal`: The object's surface normal at the intersection point.
 *
 * `point`: The intersection point.
 *
 * `rid`: The intersecting object's [RID].
 *
 * `shape`: The shape index of the colliding shape.
 *
 * If the shape did not intersect anything, then an empty dictionary is returned instead.
 *
*/
get_rest_info(shape: PhysicsShapeQueryParameters3D): Dictionary;

/**
 * Intersects a ray in a given space. The returned object is a dictionary with the following fields:
 *
 * `collider`: The colliding object.
 *
 * `collider_id`: The colliding object's ID.
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
 * Additionally, the method can take an `exclude` array of objects or [RID]s that are to be excluded from collisions, a `collision_mask` bitmask representing the physics layers to check in, or booleans to determine if the ray should collide with [PhysicsBody3D]s or [Area3D]s, respectively.
 *
*/
intersect_ray(from: Vector3, to: Vector3, exclude?: any[], collision_mask?: int, collide_with_bodies?: boolean, collide_with_areas?: boolean): Dictionary;

/**
 * Checks the intersections of a shape, given through a [PhysicsShapeQueryParameters3D] object, against the space. The intersected shapes are returned in an array containing dictionaries with the following fields:
 *
 * `collider`: The colliding object.
 *
 * `collider_id`: The colliding object's ID.
 *
 * `rid`: The intersecting object's [RID].
 *
 * `shape`: The shape index of the colliding shape.
 *
 * The number of intersections can be limited with the `max_results` parameter, to reduce the processing time.
 *
*/
intersect_shape(shape: PhysicsShapeQueryParameters3D, max_results?: int): any[];

  connect<T extends SignalsOf<PhysicsDirectSpaceState3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
