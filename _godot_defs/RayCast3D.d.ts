
/**
 * A RayCast represents a line from its origin to its destination position, [member target_position]. It is used to query the 3D space in order to find the closest object along the path of the ray.
 *
 * RayCast3D can ignore some objects by adding them to the exception list via [method add_exception] or by setting proper filtering with collision layers and masks.
 *
 * RayCast3D can be configured to report collisions with [Area3D]s ([member collide_with_areas]) and/or [PhysicsBody3D]s ([member collide_with_bodies]).
 *
 * Only enabled raycasts will be able to query the space and report collisions.
 *
 * RayCast3D calculates intersection every physics frame (see [Node]), and the result is cached so it can be used later until the next frame. If multiple queries are required between physics frames (or during the same frame), use [method force_raycast_update] after adjusting the raycast.
 *
*/
declare class RayCast3D extends Node3D {

  
/**
 * A RayCast represents a line from its origin to its destination position, [member target_position]. It is used to query the 3D space in order to find the closest object along the path of the ray.
 *
 * RayCast3D can ignore some objects by adding them to the exception list via [method add_exception] or by setting proper filtering with collision layers and masks.
 *
 * RayCast3D can be configured to report collisions with [Area3D]s ([member collide_with_areas]) and/or [PhysicsBody3D]s ([member collide_with_bodies]).
 *
 * Only enabled raycasts will be able to query the space and report collisions.
 *
 * RayCast3D calculates intersection every physics frame (see [Node]), and the result is cached so it can be used later until the next frame. If multiple queries are required between physics frames (or during the same frame), use [method force_raycast_update] after adjusting the raycast.
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code], collision with [Area3D]s will be reported. */
collide_with_areas: boolean;

/** If [code]true[/code], collision with [PhysicsBody3D]s will be reported. */
collide_with_bodies: boolean;

/** The ray's collision mask. Only objects in at least one collision layer enabled in the mask will be detected. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/** If [code]true[/code], collisions will be reported. */
enabled: boolean;

/** If [code]true[/code], collisions will be ignored for this RayCast3D's immediate parent. */
exclude_parent: boolean;

/** The ray's destination point, relative to the RayCast's [code]position[/code]. */
target_position: Vector3;

/** Adds a collision exception so the ray does not report collisions with the specified node. */
add_exception(node: Object): void;

/** Adds a collision exception so the ray does not report collisions with the specified [RID]. */
add_exception_rid(rid: RID): void;

/** Removes all collision exceptions for this ray. */
clear_exceptions(): void;

/**
 * Updates the collision information for the ray.
 *
 * Use this method to update the collision information immediately instead of waiting for the next `_physics_process` call, for example if the ray or its parent has changed state.
 *
 * **Note:** [member enabled] does not need to be `true` for this to work.
 *
*/
force_raycast_update(): void;

/** Returns the first object that the ray intersects, or [code]null[/code] if no object is intersecting the ray (i.e. [method is_colliding] returns [code]false[/code]). */
get_collider(): Object;

/** Returns the shape ID of the first object that the ray intersects, or [code]0[/code] if no object is intersecting the ray (i.e. [method is_colliding] returns [code]false[/code]). */
get_collider_shape(): int;

/**
 * Returns `true` if the bit index passed is turned on.
 *
 * **Note:** Bit indices range from 0-19.
 *
*/
get_collision_mask_bit(bit: int): boolean;

/** Returns the normal of the intersecting object's shape at the collision point. */
get_collision_normal(): Vector3;

/**
 * Returns the collision point at which the ray intersects the closest object.
 *
 * **Note:** This point is in the **global** coordinate system.
 *
*/
get_collision_point(): Vector3;

/** Returns whether any object is intersecting with the ray's vector (considering the vector length). */
is_colliding(): boolean;

/** Removes a collision exception so the ray does report collisions with the specified node. */
remove_exception(node: Object): void;

/** Removes a collision exception so the ray does report collisions with the specified [RID]. */
remove_exception_rid(rid: RID): void;

/**
 * Sets the bit index passed to the `value` passed.
 *
 * **Note:** Bit indexes range from 0-19.
 *
*/
set_collision_mask_bit(bit: int, value: boolean): void;

  connect<T extends SignalsOf<RayCast3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
