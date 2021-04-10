
/**
 * A RayCast represents a line from its origin to its destination position, `cast_to`. It is used to query the 2D space in order to find the closest object along the path of the ray.
 *
 * RayCast2D can ignore some objects by adding them to the exception list via `add_exception`, by setting proper filtering with collision layers, or by filtering object types with type masks.
 *
 * RayCast2D can be configured to report collisions with [Area2D]s ([member collide_with_areas]) and/or [PhysicsBody2D]s ([member collide_with_bodies]).
 *
 * Only enabled raycasts will be able to query the space and report collisions.
 *
 * RayCast2D calculates intersection every physics frame (see [Node]), and the result is cached so it can be used later until the next frame. If multiple queries are required between physics frames (or during the same frame) use [method force_raycast_update] after adjusting the raycast.
 *
*/
declare class RayCast2D extends Node2D {

  
/**
 * A RayCast represents a line from its origin to its destination position, `cast_to`. It is used to query the 2D space in order to find the closest object along the path of the ray.
 *
 * RayCast2D can ignore some objects by adding them to the exception list via `add_exception`, by setting proper filtering with collision layers, or by filtering object types with type masks.
 *
 * RayCast2D can be configured to report collisions with [Area2D]s ([member collide_with_areas]) and/or [PhysicsBody2D]s ([member collide_with_bodies]).
 *
 * Only enabled raycasts will be able to query the space and report collisions.
 *
 * RayCast2D calculates intersection every physics frame (see [Node]), and the result is cached so it can be used later until the next frame. If multiple queries are required between physics frames (or during the same frame) use [method force_raycast_update] after adjusting the raycast.
 *
*/
  "new"(): RayCast2D;
  static "new"(): RayCast2D;



/** The ray's destination point, relative to the RayCast's [code]position[/code]. */
cast_to: Vector2;

/** If [code]true[/code], collision with [Area2D]s will be reported. */
collide_with_areas: boolean;

/** If [code]true[/code], collision with [PhysicsBody2D]s will be reported. */
collide_with_bodies: boolean;

/** The ray's collision mask. Only objects in at least one collision layer enabled in the mask will be detected. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/** If [code]true[/code], collisions will be reported. */
enabled: boolean;

/** If [code]true[/code], the parent node will be excluded from collision detection. */
exclude_parent: boolean;

/** Adds a collision exception so the ray does not report collisions with the specified node. */
add_exception(node: Object): void;

/** Adds a collision exception so the ray does not report collisions with the specified [RID]. */
add_exception_rid(rid: RID): void;

/** Removes all collision exceptions for this ray. */
clear_exceptions(): void;

/**
 * Updates the collision information for the ray. Use this method to update the collision information immediately instead of waiting for the next `_physics_process` call, for example if the ray or its parent has changed state.
 *
 * **Note:** `enabled` is not required for this to work.
 *
*/
force_raycast_update(): void;

/** Returns the first object that the ray intersects, or [code]null[/code] if no object is intersecting the ray (i.e. [method is_colliding] returns [code]false[/code]). */
get_collider(): Object;

/** Returns the shape ID of the first object that the ray intersects, or [code]0[/code] if no object is intersecting the ray (i.e. [method is_colliding] returns [code]false[/code]). */
get_collider_shape(): int;

/** Returns an individual bit on the collision mask. */
get_collision_mask_bit(bit: int): boolean;

/** Returns the normal of the intersecting object's shape at the collision point. */
get_collision_normal(): Vector2;

/**
 * Returns the collision point at which the ray intersects the closest object.
 *
 * **Note:** this point is in the **global** coordinate system.
 *
*/
get_collision_point(): Vector2;

/** Returns whether any object is intersecting with the ray's vector (considering the vector length). */
is_colliding(): boolean;

/** Removes a collision exception so the ray does report collisions with the specified node. */
remove_exception(node: Object): void;

/** Removes a collision exception so the ray does report collisions with the specified [RID]. */
remove_exception_rid(rid: RID): void;

/** Sets or clears individual bits on the collision mask. This makes selecting the areas scanned easier. */
set_collision_mask_bit(bit: int, value: boolean): void;

  connect<T extends SignalsOf<RayCast2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
